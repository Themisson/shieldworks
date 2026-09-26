import { getArticles } from "@/lib/editorial";
import { buildFeed } from "@/lib/feed";

export const dynamic="force-static";
export function GET() { return new Response(buildFeed(getArticles("pt")),{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600"}}); }
