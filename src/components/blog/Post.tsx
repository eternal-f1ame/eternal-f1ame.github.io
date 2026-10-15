import { formatDate } from "@/app/utils/formatDate";
import { readingTime } from "@/app/utils/reading";
import { Glass } from "@/components/Glass";
import { Column, Heading, SmartImage, SmartLink, Text } from "@/once-ui/components";
import styles from "./Post.module.scss";

interface PostProps {
  post: any;
  thumbnail: boolean;
}

/*
  A post card: the title in the serif (posts are the site's writing voice), the
  summary, and one quiet line of facts: date, reading time, tags. A server component,
  so a post's full text never travels to the browser just to draw its card.
*/
export default function Post({ post, thumbnail }: PostProps) {
  const tags: string[] =
    post.metadata.tag && typeof post.metadata.tag === "string"
      ? post.metadata.tag
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      : [];
  const facts = [
    post.metadata.publishedAt && formatDate(post.metadata.publishedAt, false),
    `${readingTime(post.content)} min read`,
    ...tags.slice(0, 3),
  ].filter(Boolean);

  return (
    <SmartLink fillWidth unstyled key={post.slug} href={`/blog/${post.slug}`}>
      <Glass interactive className="glass-clip">
        <Column fillWidth gap="12" className={styles.card}>
          {post.metadata.image && thumbnail && (
            <SmartImage
              priority
              sizes="40em"
              border="neutral-alpha-weak"
              radius="m"
              src={post.metadata.image}
              alt={`Thumbnail of ${post.metadata.title}`}
              aspectRatio="16 / 9"
            />
          )}
          <Heading as="h2" variant="display-default-xs" wrap="balance">
            {post.metadata.title}
          </Heading>
          {post.metadata.summary && (
            <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
              {post.metadata.summary}
            </Text>
          )}
          <Text variant="label-default-s" onBackground="neutral-weak">
            {facts.join(" · ")}
          </Text>
        </Column>
      </Glass>
    </SmartLink>
  );
}
