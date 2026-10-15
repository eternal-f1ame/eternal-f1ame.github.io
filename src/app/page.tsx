import { baseURL, routes } from "@/app/resources";
import { pageMetadata, shareImage } from "@/app/utils/share";
import { about, gallery, home, newsletter, person, social } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";
import { Mailchimp } from "@/components";
import { Glass } from "@/components/Glass";
import { Posts } from "@/components/blog/Posts";
import { Papers } from "@/components/publications/Papers";
import { Projects } from "@/components/work/Projects";
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
import type { ReactNode } from "react";

export async function generateMetadata() {
  // the layout's title template skips its own page, so the name is added here
  return pageMetadata({
    title: `${home.title} · ${person.name}`,
    description: home.description,
    path: "",
    card: "home",
    shareTitle: person.name,
  });
}

interface SectionProps {
  title: string;
  href: string;
  cta: string;
  children: ReactNode;
}

/*
  Every section sits on the page's center axis: a short rule, the title, the content,
  then the "see all" link at the foot, where the reader arrives having seen the sample.
*/
function Section({ title, href, cta, children }: SectionProps) {
  return (
    <Column fillWidth gap="l" horizontal="center">
      <Line background="neutral-alpha-medium" style={{ maxWidth: "3em" }} />
      <Heading as="h2" variant="heading-strong-l" align="center">
        {title}
      </Heading>
      {children}
      <SmartLink href={href} suffixIcon="arrowRight" className="glide-link">
        <Text variant="body-default-s">{cta}</Text>
      </SmartLink>
    </Column>
  );
}

interface EntryProps {
  title: ReactNode;
  meta: ReactNode;
  href?: string;
}

/* a strong line over a quiet one, the shape of every list on this page */
function Entry({ title, meta, href }: EntryProps) {
  const entry = (
    <Column horizontal="center" gap="4">
      <Text
        variant="body-strong-m"
        onBackground={href ? undefined : "neutral-strong"}
        align="center"
        wrap="balance"
      >
        {title}
      </Text>
      <Text variant="body-default-s" onBackground="neutral-weak" align="center">
        {meta}
      </Text>
    </Column>
  );

  return href ? (
    <SmartLink href={href} unstyled className="glide-link">
      {entry}
    </SmartLink>
  ) : (
    entry
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
    <Column maxWidth="m" gap="xl" horizontal="center">
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
            image: shareImage("home"),
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
        <Column fillWidth horizontal="center" gap="12" paddingY="16">
          <Avatar src={person.avatar} size="xl" />
          <RevealFx translateY="4" fillWidth horizontal="center" paddingTop="8">
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {person.name}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.1} fillWidth horizontal="center">
            <Text variant="heading-default-m" onBackground="neutral-weak" align="center">
              {person.role} · {person.location}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.2} fillWidth horizontal="center" paddingTop="8">
            <Text
              wrap="balance"
              variant="body-default-l"
              onBackground="neutral-medium"
              align="center"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="16" delay={0.3} fillWidth horizontal="center" paddingTop="12">
            <Flex gap="8" wrap horizontal="center">
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
      </Glass>

      {routes["/publications"] && (
        <Section {...home.sections.papers}>
          <Papers featured />
        </Section>
      )}

      <Section {...home.sections.experience}>
        <Column fillWidth gap="16" horizontal="center">
          {roles.map((experience, index) => (
            <Entry
              key={`${experience.company}-${index}`}
              title={
                <>
                  {experience.role}, {experience.company}
                </>
              }
              meta={experience.timeframe}
            />
          ))}
        </Column>
      </Section>

      {routes["/work"] && (
        <Section {...home.sections.projects}>
          <Projects range={[1, 1]} flush />
          {olderProjects.length > 0 && (
            <Column fillWidth gap="16" horizontal="center">
              {olderProjects.map((project) => (
                <Entry
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  title={project.metadata.title}
                  meta={new Date(project.metadata.publishedAt).getFullYear()}
                />
              ))}
            </Column>
          )}
        </Section>
      )}

      {routes["/gallery"] && (
        <Section
          title={home.sections.life.title}
          href={home.sections.life.href}
          cta={home.sections.life.cta}
        >
          <Text
            wrap="balance"
            variant="body-default-l"
            onBackground="neutral-medium"
            align="center"
          >
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
          <Column fillWidth gap="16" horizontal="center">
            {community.map((item, index) => (
              <Entry key={`${item.name}-${index}`} title={item.name} meta={item.description} />
            ))}
          </Column>
        </Section>
      )}

      {routes["/blog"] && (
        <Section {...home.sections.writing}>
          <Posts range={[1, 2]} columns="2" />
        </Section>
      )}

      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
