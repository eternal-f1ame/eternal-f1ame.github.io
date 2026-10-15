import { baseURL } from "@/app/resources";
import { blog, person } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";

/* the blog as an RSS feed, written once at build time to out/rss.xml */
export const dynamic = "force-static";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  const items = posts
    .map((post) => {
      const url = `https://${baseURL}/blog/${post.slug}/`;
      return `    <item>
      <title>${escape(post.metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.metadata.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(post.metadata.summary)}</description>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${blog.heading} · ${person.name}`)}</title>
    <link>https://${baseURL}/blog/</link>
    <atom:link href="https://${baseURL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(blog.description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
