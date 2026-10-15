import { Column } from "@/once-ui/components";
import { pageMetadata } from "@/app/utils/share";
import { Papers } from "@/components/publications/Papers";
import { PageHeader } from "@/components/PageHeader";
import { baseURL } from "@/app/resources";
import { publications, person } from "@/app/resources/content";

export async function generateMetadata() {
  return pageMetadata({
    title: `${publications.title} ${publications.label}`,
    description: publications.description,
    path: "/publications",
    card: "publications",
    shareTitle: `${publications.label} · ${person.name}`,
  });
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
      <PageHeader title={publications.heading} intro={publications.intro} />
      <Papers />
    </Column>
  );
}
