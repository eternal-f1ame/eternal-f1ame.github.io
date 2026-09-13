import { Column, Flex, Tag, Text } from "@/once-ui/components";
import { publications } from "@/app/resources/content";

interface PapersProps {
  featured?: boolean;
}

export function Papers({ featured = false }: PapersProps) {
  const papers = featured
    ? publications.papers.filter((paper) => paper.featured)
    : publications.papers;

  return (
    <Column fillWidth gap="l">
      {papers.map((paper, index) => (
        <Column key={`${paper.title}-${index}`} fillWidth gap="4">
          <Text variant="heading-strong-s" onBackground="neutral-strong">
            {paper.link ? (
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {paper.title}
              </a>
            ) : (
              paper.title
            )}
          </Text>
          {paper.authors && (
            <Text variant="body-default-s" onBackground="neutral-medium">
              {paper.authors}
            </Text>
          )}
          <Flex gap="8" vertical="center" wrap>
            <Text variant="body-default-s" onBackground="neutral-weak">
              <em>{paper.venue}</em>
              {", "}
              {paper.year}
            </Text>
            {paper.award && (
              <Tag size="s" variant="brand">
                {paper.award}
              </Tag>
            )}
          </Flex>
        </Column>
      ))}
    </Column>
  );
}
