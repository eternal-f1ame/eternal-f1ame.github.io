import { publications } from "@/app/resources/content";
import { Glass } from "@/components/Glass";
import { Column, Flex, Tag, Text } from "@/once-ui/components";
import styles from "./Papers.module.scss";

interface PapersProps {
  featured?: boolean;
}

/* the name before a paper's subtitle: "PHOEBI: An Open-World ..." gives "PHOEBI" */
function shortTitle(title: string) {
  return title.split(/: | \u2014 /)[0];
}

/*
  Papers as picture cards. A card opens the paper's project page when it has one (the
  page links on to the paper), otherwise the paper itself. A paper without an image
  gets the name before its subtitle set as type, so the grid keeps its rhythm.
*/
export function Papers({ featured = false }: PapersProps) {
  // featured is a rank, so the landing page order is set in content.js rather
  // than inherited from the order of the publications page
  const papers = featured
    ? publications.papers
        .filter((paper) => paper.featured)
        .sort((a, b) => Number(a.featured) - Number(b.featured))
    : publications.papers;

  return (
    <div className={featured ? `${styles.grid} ${styles.featured}` : styles.grid}>
      {papers.map((paper, index) => (
        <a
          key={`${paper.title}-${index}`}
          className={styles.link}
          href={paper.page ?? paper.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Glass interactive className={`glass-clip ${styles.card}`}>
            <div className={styles.visual}>
              {paper.image ? (
                <img src={paper.image} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className={styles.type}>{shortTitle(paper.title)}</span>
              )}
            </div>
            <Column fillWidth flex={1} gap="4" padding="m" horizontal="center">
              <Text
                variant="heading-strong-s"
                onBackground="neutral-strong"
                align="center"
                wrap="balance"
              >
                {paper.title}
              </Text>
              {paper.authors && (
                <Text
                  variant="body-default-s"
                  onBackground="neutral-medium"
                  align="center"
                  wrap="balance"
                >
                  {paper.authors}
                </Text>
              )}
              <Flex
                className={styles.meta}
                gap="8"
                vertical="center"
                horizontal="center"
                paddingTop="8"
                wrap
              >
                <Text variant="body-default-s" onBackground="neutral-weak" align="center">
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
          </Glass>
        </a>
      ))}
    </div>
  );
}
