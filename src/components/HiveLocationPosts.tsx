import { useQuery } from "@tanstack/react-query";
import { Calendar, ExternalLink, Loader2 } from "lucide-react";

type HivePost = {
  title: string;
  permlink: string;
  author: string;
  created: string;
  body: string;
  url: string;
  json_metadata: {
    tags?: string[];
    description?: string;
    image?: string[];
  };
};

type RawHivePost = Omit<HivePost, "json_metadata"> & {
  json_metadata: string | HivePost["json_metadata"];
};

async function fetchTagPage(
  tag: string,
  startAuthor?: string,
  startPermlink?: string,
): Promise<RawHivePost[]> {
  const query: Record<string, unknown> = { tag, limit: 20 };
  if (startAuthor && startPermlink) {
    query.start_author = startAuthor;
    query.start_permlink = startPermlink;
  }
  const res = await fetch("https://api.hive.blog", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "condenser_api.get_discussions_by_created",
      params: [query],
      id: 1,
    }),
  });
  if (!res.ok) throw new Error("Hive API Fehler");
  const data = (await res.json()) as { result?: RawHivePost[]; error?: { message: string } };
  if (data.error) throw new Error(data.error.message);
  return data.result ?? [];
}

function parsePost(p: RawHivePost): HivePost {
  let meta: HivePost["json_metadata"] = {};
  try {
    meta =
      typeof p.json_metadata === "string"
        ? JSON.parse(p.json_metadata || "{}")
        : p.json_metadata ?? {};
  } catch {
    meta = {};
  }
  return { ...p, json_metadata: meta };
}

async function fetchLocationPosts(): Promise<HivePost[]> {
  const collected: HivePost[] = [];
  const seen = new Set<string>();
  const tags = ["eifel", "einruhr"];
  const MAX_PAGES_PER_TAG = 20;
  for (const tag of tags) {
    let startAuthor: string | undefined;
    let startPermlink: string | undefined;
    for (let i = 0; i < MAX_PAGES_PER_TAG; i++) {
      const page = await fetchTagPage(tag, startAuthor, startPermlink);
      if (page.length === 0) break;
      const fresh = i === 0 ? page : page.slice(1);
      for (const raw of fresh) {
        const key = `${raw.author}/${raw.permlink}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const post = parsePost(raw);
        if (post.author === "achimmertens") {
          collected.push(post);
        }
      }
      const last = page[page.length - 1];
      if (!last || page.length < 20) break;
      startAuthor = last.author;
      startPermlink = last.permlink;
    }
  }
  return collected.sort((a, b) => (a.created > b.created ? -1 : 1));
}

function formatDate(iso: string) {
  const d = new Date(iso + "Z");
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}

function excerptFrom(post: HivePost) {
  const desc = post.json_metadata?.description;
  if (desc && desc.length > 10) return desc;
  const text = post.body
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "Keine Beschreibung verfügbar.";
  return text.slice(0, 180) + (text.length > 180 ? "…" : "");
}

function extractCoverImage(post: HivePost) {
  const metaImage = post.json_metadata?.image?.[0];
  if (metaImage) return metaImage;
  const match = post.body.match(/!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
  return match ? match[1] : undefined;
}

const HiveLocationPosts = () => {
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ["hive-location-posts"],
    queryFn: fetchLocationPosts,
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-serif font-bold text-forest-700 mb-4">
        Blogbeiträge aus der Hive Blockchain
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Beiträge von Achim Mertens mit den Tags #eifel und #einruhr – 
        direkt aus der dezentralen Hive Blockchain geladen.
      </p>

      {isLoading && (
        <div className="flex items-center justify-center gap-3 text-gray-500 py-8">
          <Loader2 size={20} className="animate-spin" />
          <span>Beiträge werden geladen…</span>
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-600">Die Blogeinträge konnten nicht geladen werden.</p>
      )}

      {posts && posts.length > 0 && (
        <div className="grid gap-6">
          {posts.map((post) => {
            const img = extractCoverImage(post);
            const href = `https://peakd.com${post.url}`;
            const tags = post.json_metadata?.tags ?? [];
            const isEinruhr = tags.includes("einruhr");
            const isHaveYouBeenHere = tags.includes("haveyoubeenhere");
            return (
              <article
                key={post.permlink}
                className="group overflow-hidden border border-gray-200 rounded-xl bg-white hover:border-forest-500 transition-colors shadow-sm"
              >
                <a href={href} target="_blank" rel="noopener noreferrer" className="grid md:grid-cols-[220px_1fr] gap-0">
                  {img && (
                    <div className="aspect-video md:aspect-auto md:h-full bg-gray-100 overflow-hidden">
                      <img
                        src={img}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={14} /> {formatDate(post.created)}
                      </span>
                      {isHaveYouBeenHere && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] uppercase tracking-widest">
                          #haveyoubeenhere
                        </span>
                      )}
                      {isEinruhr && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] uppercase tracking-widest">
                          #einruhr
                        </span>
                      )}
                    </div>
                    <h4 className="mt-3 text-xl font-semibold text-gray-900 group-hover:text-forest-700 transition-colors">
                      {post.title}
                    </h4>
                    <p className="mt-2 text-gray-600 line-clamp-3">{excerptFrom(post)}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-forest-600 font-semibold">
                      Auf PeakD lesen <ExternalLink size={16} />
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      )}

      {posts && posts.length === 0 && !isLoading && (
        <p className="text-sm text-gray-500">Derzeit keine passenden Blogbeiträge gefunden.</p>
      )}

      <div className="mt-6 text-center">
        <a
          href="https://peakd.com/@achimmertens/posts"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-forest-600 font-semibold hover:underline"
        >
          Alle Beiträge auf PeakD ansehen <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
};

export default HiveLocationPosts;