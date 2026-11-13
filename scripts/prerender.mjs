// Build-time prerender (static site generation) for fewo.amertens.me
//
// Renders every route of the React app to a static HTML file so that
// search engines and AI crawlers receive real content and inner pages
// answer with HTTP 200 on GitHub Pages (which has no SPA fallback).
//
// Usage (after both builds have run):
//   node scripts/prerender.mjs
//
// Expects:
//   dist/index.html          client build (Vite) as template
//   dist-ssr/entry-server.js server bundle exporting render(url)
//
// Each route is rendered in its own child process (scripts/render-one.mjs)
// because react-helmet-async state would otherwise leak between renders.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");
const renderOne = path.join(root, "scripts", "render-one.mjs");

const routes = [
  "/",
  "/apartment",
  "/location",
  "/activities",
  "/info",
  "/insidertipps",
  "/calculator",
  "/contact",
  "/arrival",
  "/impressum",
  "/en",
  "/en/apartment",
  "/en/location",
  "/en/activities",
  "/en/info",
  "/en/insidertipps",
  "/en/calculator",
  "/en/contact",
  "/en/arrival",
  "/en/impressum",
];

if (!fs.existsSync(templatePath)) {
  console.error(`[prerender] Missing ${templatePath}. Run the client build first.`);
  process.exit(1);
}
if (!fs.existsSync(serverEntry)) {
  console.error(`[prerender] Missing ${serverEntry}. Run the SSR build first.`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");

// Guard: the client build must produce a clean dist/index.html. If it already
// contains SSR markers (data-rh) it is a previously prerendered page, and using
// it as template would stack titles/content on every rerun.
if (template.includes("data-rh")) {
  console.error(
    "[prerender] dist/index.html looks already prerendered (contains data-rh).\n" +
      "            Run the client build first (npm run build:client) to reset it."
  );
  process.exit(1);
}

// Strip the template's own SEO tags; Helmet supplies per-page tags.
function stripSeoTags(html) {
  return html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(
      /<meta\b[^>]*\b(?:name|property)="(?:description|robots|keywords|og:[^"]*|twitter:[^"]*)"[^>]*>/gi,
      ""
    )
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>/gi, "");
}

function buildPage(route) {
  const tmpFile = path.join(
    os.tmpdir(),
    `fewo-prerender-${process.pid}-${route.replace(/[^a-z0-9]/gi, "_") || "root"}.json`
  );
  const res = spawnSync(process.execPath, [renderOne, route, tmpFile], {
    stdio: ["ignore", "ignore", "inherit"],
  });
  if (res.status !== 0) {
    console.error(`[prerender] render failed for ${route} (exit ${res.status})`);
    process.exit(1);
  }
  const { html, head, htmlAttributes, bodyAttributes } = JSON.parse(
    fs.readFileSync(tmpFile, "utf8")
  );
  fs.rmSync(tmpFile, { force: true });

  let page = stripSeoTags(template);
  page = page.replace(/<html\b[^>]*>/i, () => `<html ${htmlAttributes}>`);
  if (bodyAttributes) {
    page = page.replace(/<body\b[^>]*>/i, () => `<body ${bodyAttributes}>`);
  }
  page = page.replace(/<div id="root">\s*<\/div>/, `<div id="root">${html}</div>`);
  page = page.replace("</head>", `${head}\n  </head>`);
  // react-helmet serialises the prop as hrefLang; normalise to lowercase.
  page = page.replace(/hrefLang=/g, "hreflang=");
  return page;
}

let count = 0;
for (const route of routes) {
  const page = buildPage(route);
  const outDir = route === "/" ? distDir : path.join(distDir, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), page);
  count += 1;
  console.log(`[prerender] ${route} -> ${path.relative(root, path.join(outDir, "index.html"))}`);
}

console.log(`[prerender] done: ${count} pages`);
