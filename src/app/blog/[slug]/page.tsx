import { notFound } from "next/navigation";
import { pageMetadata, shareImage } from "@/app/utils/share";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Button, Column, Heading, Row, SmartLink, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { blog, person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";
import styles from "@/components/blog/Post.module.scss";
import { readingTime } from "@/app/utils/reading";
import type { ReactNode } from "react";

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: BlogParams) {
  const post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  return pageMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    path: `/blog/${post.slug}`,
    card: `post-${post.slug}`,
    type: "article",
    publishedTime: post.metadata.publishedAt,
  });
}

/* the post's own paragraphs: plain <p>, so the reading type is set in one place */
function Paragraph({ children }: { children?: ReactNode }) {
  return <p className={styles.paragraph}>{children}</p>;
}

/*
  A post set for reading: one narrow column at about 66 characters a line, the body in
  the serif, the date, reading time and tags under the title, and the posts either side
  of it at the foot. A hairline at the top of the window fills as you read, where the
  browser can tie an animation to scrolling.
*/
export default function Blog({ params }: BlogParams) {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  const index = posts.findIndex((post) => post.slug === params.slug);

  if (index === -1) {
    notFound();
  }

  const post = posts[index];
  const newer = posts[index - 1];
  const older = posts[index + 1];
  const tags = post.metadata.tag
    ? post.metadata.tag
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];
  const avatars = post.metadata.team?.map((member) => ({ src: member.avatar })) || [];
  const meta = [
    post.metadata.publishedAt && formatDate(post.metadata.publishedAt),
    `${readingTime(post.content)} min read`,
    ...tags,
  ].filter(Boolean);

  return (
    <Column as="section" fillWidth horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: shareImage(`post-${post.slug}`),
            url: `https://${baseURL}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <div className={styles.progress} aria-hidden="true" />
      <Column className={styles.column} gap="20">
        <Button href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
          {blog.heading}
        </Button>
        <Heading as="h1" variant="display-strong-m" wrap="balance">
          {post.metadata.title}
        </Heading>
        <Row gap="12" vertical="center">
          {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {meta.join(" · ")}
          </Text>
        </Row>
        <article className={`serif ${styles.prose}`}>
          <CustomMDX source={post.content} components={{ p: Paragraph }} />
        </article>
        {(newer || older) && (
          <nav aria-label="More posts" className={styles.more}>
            {/* empty slots keep older on the left and newer on the right */}
            {older ? (
              <SmartLink href={`/blog/${older.slug}`} prefixIcon="chevronLeft" className="glide-link">
                <Text variant="body-default-s">{older.metadata.title}</Text>
              </SmartLink>
            ) : (
              <span />
            )}
            {newer ? (
              <SmartLink href={`/blog/${newer.slug}`} suffixIcon="chevronRight" className="glide-link">
                <Text variant="body-default-s">{newer.metadata.title}</Text>
              </SmartLink>
            ) : (
              <span />
            )}
          </nav>
        )}
      </Column>
      <ScrollToHash />
    </Column>
  );
}
