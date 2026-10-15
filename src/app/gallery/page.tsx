import { Column } from "@/once-ui/components";
import { PageHeader } from "@/components/PageHeader";
import { pageMetadata } from "@/app/utils/share";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL } from "@/app/resources";
import { gallery, person } from "@/app/resources/content";

export async function generateMetadata() {
  return pageMetadata({
    title: `${gallery.title} ${gallery.label}`,
    description: gallery.description,
    path: "/gallery",
    card: "gallery",
    shareTitle: `${gallery.label} · ${person.name}`,
  });
}

export default function Gallery() {
  return (
    <Column fillWidth>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: gallery.title,
            description: gallery.description,
            url: `https://${baseURL}/gallery`,
            image: gallery.items
              .filter((item) => item.type === "picture")
              .map((image) => ({
              "@type": "ImageObject",
              url: `https://${baseURL}${image.src}`,
              description: image.alt,
            })),
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `https://${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <PageHeader title={gallery.heading} />
      <MasonryGrid />
    </Column>
  );
}
