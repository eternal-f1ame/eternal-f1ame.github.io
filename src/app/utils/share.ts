import { baseURL } from "@/app/resources";

/* a share image drawn at build time by src/app/og/[card]/route.tsx */
export function shareImage(card: string) {
  return `https://${baseURL}/og/${card}.png`;
}

interface PageMetadataInput {
  /* the tab title; the layout appends the name */
  title: string;
  description: string;
  path: string;
  card: string;
  /* the title link previews show, when the tab title is a kaomoji */
  shareTitle?: string;
  type?: "website" | "article";
  publishedTime?: string;
}

/* title, description and the link preview every page shares */
export function pageMetadata({
  title,
  description,
  path,
  card,
  shareTitle = title,
  type = "website",
  publishedTime,
}: PageMetadataInput) {
  const image = shareImage(card);
  const url = `https://${baseURL}${path}`;

  return {
    title,
    description,
    openGraph: {
      title: shareTitle,
      description,
      type,
      url,
      ...(publishedTime && { publishedTime }),
      images: [{ url: image, width: 1200, height: 630, alt: shareTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
