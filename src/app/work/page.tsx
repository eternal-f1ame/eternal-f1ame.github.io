import { getPosts } from "@/app/utils/utils";
import { pageMetadata, shareImage } from "@/app/utils/share";
import { Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { PageHeader } from "@/components/PageHeader";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";

export async function generateMetadata() {
  return pageMetadata({
    title: `${work.title} ${work.label}`,
    description: work.description,
    path: "/work",
    card: "work",
    shareTitle: `${work.label} · ${person.name}`,
  });
}

export default function Work() {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/work`,
            image: shareImage("work"),
            author: {
              "@type": "Person",
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              "@type": "CreativeWork",
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/work/${project.slug}`,
              image: `https://${baseURL}${project.metadata.image}`,
            })),
          }),
        }}
      />
      <PageHeader title={work.heading} />
      <Projects />
    </Column>
  );
}
