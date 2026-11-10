// Renders a single route in a fresh Node process.
// Called by scripts/prerender.mjs (once per route) so that react-helmet-async
// state cannot leak between renders.
//
// Usage: node scripts/render-one.mjs <url> <outJsonFile>

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [url, outFile] = process.argv.slice(2);
if (!url || !outFile) {
  console.error("usage: node scripts/render-one.mjs <url> <outJsonFile>");
  process.exit(2);
}

const serverEntry = path.join(process.cwd(), "dist-ssr", "entry-server.js");
const { render } = await import(pathToFileURL(serverEntry).href);
const result = render(url);
fs.writeFileSync(outFile, JSON.stringify(result));
