import { Column } from "@/once-ui/components";
import { Papers } from "@/components/publications/Papers";
import { baseURL } from "@/app/resources";
import { publications, person } from "@/app/resources/content";

export async function generateMetadata() {
  const pageTitle = publications.title;
  const description = publications.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(pageTitle)}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      url: `https://${baseURL}/publications`,
      images: [
        {
          url: ogImage,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [ogImage],
    },
  };
}

export default function Publications() {
  const pageTitle = publications.title;

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: pageTitle,
            description: publications.description,
            url: `https://${baseURL}/publications`,
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: publications.papers.map((paper) => ({
              "@type": "ScholarlyArticle",
              headline: paper.title,
              datePublished: paper.year,
              url: paper.link,
            })),
          }),
        }}
      />
      <Papers />
    </Column>
  );
}
