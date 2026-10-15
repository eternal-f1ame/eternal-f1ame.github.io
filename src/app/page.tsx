import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Line,
  RevealFx,
  SmartLink,
  Text,
} from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Glass } from "@/components/Glass";
import { Posts } from "@/components/blog/Posts";
import { Projects } from "@/components/work/Projects";
import { Papers } from "@/components/publications/Papers";
import { getPosts } from "@/app/utils/utils";
import { baseURL, routes } from "@/app/resources";
import { about, gallery, home, newsletter, person, social } from "@/app/resources/content";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

interface SectionHeadingProps {
  title: string;
  href: string;
  cta: string;
}

function SectionHeading({ title, href, cta }: SectionHeadingProps) {
  return (
    <Flex fillWidth horizontal="space-between" vertical="end" gap="16" wrap>
      <Heading as="h2" variant="heading-strong-l">
        {title}
      </Heading>
      <SmartLink href={href}>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {cta}
        </Text>
      </SmartLink>
    </Flex>
  );
}

export default function Home() {
  const projects = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  const olderProjects = projects.slice(1);
  const roles = about.work.experiences.slice(0, 3);
  const poems = gallery.items.filter((item) => item.type === "poem").slice(0, 3);
  const community = about.volunteering.items
    .filter((item) => item.featured)
    .sort((a, b) => Number(a.featured) - Number(b.featured));

  return (
    <Column maxWidth="m" gap="l" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `https://${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
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

      <Glass panel>
        <Flex
          fillWidth
          gap="40"
          horizontal="space-between"
          vertical="center"
          mobileDirection="column-reverse"
        >
          <Column flex={7} fillWidth gap="12">
            <RevealFx translateY="4" fillWidth horizontal="start">
              <Heading wrap="balance" variant="display-strong-l">
                {person.name}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.1} fillWidth horizontal="start">
              <Text variant="heading-default-m" onBackground="neutral-weak">
                {person.role} · {person.location}
              </Text>
            </RevealFx>
            <RevealFx translateY="12" delay={0.2} fillWidth horizontal="start" paddingTop="8">
              <Text wrap="balance" variant="body-default-l" onBackground="neutral-medium">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx translateY="16" delay={0.3} fillWidth horizontal="start" paddingTop="12">
              <Flex gap="8" wrap>
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="tertiary"
                      className="glass-button"
                      />
                    ),
                )}
              </Flex>
            </RevealFx>
          </Column>
          <Column flex={3} horizontal="end" vertical="center">
            <Avatar src={person.avatar} size="xl" />
          </Column>
        </Flex>
      </Glass>

      {routes["/publications"] && (
        <>
          <Line background="neutral-alpha-weak" />
          <Column fillWidth gap="l">
            <SectionHeading {...home.sections.papers} />
            <Papers featured />
          </Column>
        </>
      )}

      <Line background="neutral-alpha-weak" />
      <Column fillWidth gap="m">
        <SectionHeading {...home.sections.experience} />
        <Column fillWidth gap="4">
          {roles.map((experience, index) => (
            <Flex
              key={`${experience.company}-${index}`}
              fillWidth
              horizontal="space-between"
              gap="16"
              paddingY="4"
              wrap
            >
              <Text variant="body-strong-m" onBackground="neutral-strong">
                {experience.role}, {experience.company}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {experience.timeframe}
              </Text>
            </Flex>
          ))}
        </Column>
      </Column>

      {routes["/work"] && (
        <>
          <Line background="neutral-alpha-weak" />
          <Column fillWidth gap="l">
            <SectionHeading {...home.sections.projects} />
            <Projects range={[1, 1]} flush />
            {olderProjects.length > 0 && (
              <Column fillWidth>
                {olderProjects.map((project) => (
                  <SmartLink key={project.slug} href={`/work/${project.slug}`} unstyled fillWidth>
                    <Flex fillWidth horizontal="space-between" gap="16" paddingY="8" wrap>
                      <Text variant="body-strong-m" onBackground="neutral-medium">
                        {project.metadata.title}
                      </Text>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {new Date(project.metadata.publishedAt).getFullYear()}
                      </Text>
                    </Flex>
                  </SmartLink>
                ))}
              </Column>
            )}
          </Column>
        </>
      )}

      {routes["/gallery"] && (
        <>
          <Line background="neutral-alpha-weak" />
          <Column fillWidth gap="l">
            <SectionHeading
              title={home.sections.life.title}
              href={home.sections.life.href}
              cta={home.sections.life.cta}
            />
            <Text wrap="balance" variant="body-default-l" onBackground="neutral-medium">
              {home.sections.life.intro}
            </Text>
            <Flex fillWidth gap="16" mobileDirection="column">
              {poems.map((poem) => (
                <SmartLink key={poem.filePath} href="/gallery" unstyled fillWidth>
                  <Glass interactive className="glass-tile">
                    <img src={poem.imageSrc} alt="" loading="lazy" decoding="async" />
                    <span className="glass-tile-label">{poem.title}</span>
                  </Glass>
                </SmartLink>
              ))}
            </Flex>
            <Column fillWidth gap="4" paddingTop="8">
              {community.map((item, index) => (
                <Flex
                  key={`${item.name}-${index}`}
                  fillWidth
                  horizontal="space-between"
                  gap="16"
                  paddingY="4"
                  wrap
                >
                  <Text variant="body-strong-m" onBackground="neutral-strong">
                    {item.name}
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                </Flex>
              ))}
            </Column>
          </Column>
        </>
      )}

      {routes["/blog"] && (
        <>
          <Line background="neutral-alpha-weak" />
          <Column fillWidth gap="l">
            <SectionHeading {...home.sections.writing} />
            <Posts range={[1, 2]} columns="2" />
          </Column>
        </>
      )}

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
