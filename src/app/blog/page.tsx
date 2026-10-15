import { Column } from "@/once-ui/components";
import { PageHeader } from "@/components/PageHeader";
import { pageMetadata, shareImage } from "@/app/utils/share";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources";
import { blog, person, newsletter } from "@/app/resources/content";

export async function generateMetadata() {
  return pageMetadata({
    title: `${blog.title} ${blog.label}`,
    description: blog.description,
    path: "/blog",
    card: "blog",
    shareTitle: `${blog.label} · ${person.name}`,
  });
}

export default function Blog() {
  const pageTitle = blog.title;
  
  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: pageTitle,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: shareImage("blog"),
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
      <PageHeader title={blog.heading} intro={blog.intro} />
      <Column fillWidth flex={1}>
        <Posts thumbnail />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
