import { Column, Flex, Heading } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/app/resources";
import { blog, person, newsletter } from "@/app/resources/content";

export async function generateMetadata() {
  const pageTitle = blog.title; // For browser tab: "(゜-゜)"
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(pageTitle)}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
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

export default function Blog() {
  const pageTitle = blog.title; // For browser tab: "(゜-゜)"
  const displayTitle = "scribbles"; // For page heading
  
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
            image: `https://${baseURL}/og?title=${encodeURIComponent(pageTitle)}`,
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
      <Heading marginBottom="l" variant="display-strong-s" align="center">
        {displayTitle}
      </Heading>
      <Column fillWidth flex={1}>
        <Posts thumbnail />
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
