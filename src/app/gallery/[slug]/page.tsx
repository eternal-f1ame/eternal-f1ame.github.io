import { baseURL } from "@/app/resources";
import { gallery, person } from "@/app/resources/content";
import { getPoems } from "@/app/utils/poems";
import { pageMetadata, shareImage } from "@/app/utils/share";
import styles from "@/components/gallery/Poem.module.scss";
import { PoemSpread } from "@/components/gallery/PoemSpread";
import { Button, Column, Flex, Heading, SmartLink, Text } from "@/once-ui/components";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";

interface PoemParams {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return getPoems().map((poem) => ({ slug: poem.slug }));
}

export function generateMetadata({ params: { slug } }: PoemParams) {
  const poem = getPoems().find((poem) => poem.slug === slug);

  if (!poem) {
    return;
  }

  return pageMetadata({
    title: poem.title,
    description: poem.stanzas[0].split("\n").slice(0, 2).join(" / "),
    path: `/gallery/${poem.slug}`,
    card: `poem-${poem.slug}`,
    type: "article",
  });
}

/*
  A poem beside the photograph it was paired with. The photograph develops from grey
  into colour as the page arrives, and the stanzas follow one another in; both settle
  at once under reduced motion. Previous and next run in gallery order and wrap around.
*/
export default function Poem({ params }: PoemParams) {
  const poems = getPoems();
  const index = poems.findIndex((poem) => poem.slug === params.slug);

  if (index === -1) {
    notFound();
  }

  const poem = poems[index];
  const previous = poems[(index - 1 + poems.length) % poems.length];
  const next = poems[(index + 1) % poems.length];

  return (
    <Column as="article" maxWidth="m" fillWidth gap="40">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            genre: "Poetry",
            name: poem.title,
            text: poem.stanzas.join("\n\n"),
            image: shareImage(`poem-${poem.slug}`),
            url: `https://${baseURL}/gallery/${poem.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Button href="/gallery" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
        {gallery.label}
      </Button>

      <PoemSpread className={styles.poem}>
        <figure className={styles.photo}>
          <img src={poem.imageSrc} alt="" decoding="async" />
        </figure>

        <div className={styles.text}>
          <Heading as="h1" variant="display-strong-s" className={styles.title}>
            {poem.title}
          </Heading>
          <div className={`serif ${styles.verse}`}>
            {poem.stanzas.map((stanza, line) => (
              <p
                key={`${poem.slug}-${line}`}
                className={styles.stanza}
                style={{ "--i": line } as CSSProperties}
              >
                {stanza}
              </p>
            ))}
          </div>
          {poem.signature && (
            <Text
              as="p"
              className={`serif ${styles.signature}`}
              style={{ "--i": poem.stanzas.length } as CSSProperties}
            >
              {poem.signature}
            </Text>
          )}
        </div>
      </PoemSpread>

      <Flex as="nav" aria-label="More poems" fillWidth horizontal="space-between" gap="24" wrap>
        <SmartLink
          href={`/gallery/${previous.slug}`}
          prefixIcon="chevronLeft"
          className="glide-link"
        >
          <Text variant="body-default-s">{previous.title}</Text>
        </SmartLink>
        <SmartLink href={`/gallery/${next.slug}`} suffixIcon="chevronRight" className="glide-link">
          <Text variant="body-default-s">{next.title}</Text>
        </SmartLink>
      </Flex>
    </Column>
  );
}
