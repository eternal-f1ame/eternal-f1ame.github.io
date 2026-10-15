import { Glass } from "@/components/Glass";
import styles from "@/components/work/Projects.module.scss";
import { Column, Icon, Text } from "@/once-ui/components";
import Link from "next/link";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  link: string;
}

/*
  A project as a picture card: its first image beside the words, stacked on a phone.
  The whole card is the one link, "View project": the project itself when it lives
  somewhere, otherwise its write-up here. A project without an image gets its title
  set as type, like a paper without one.
*/
export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  priority = false,
  images = [],
  title,
  content,
  description,
  link,
}) => {
  const target = link || (content?.trim() ? href : "");

  const card = (
    <Glass interactive={Boolean(target)} className={`glass-clip ${styles.card}`}>
      <div className={styles.visual}>
        {images.length > 0 ? (
          <img src={images[0]} alt="" loading={priority ? "eager" : "lazy"} decoding="async" />
        ) : (
          <span className={styles.type}>{title.split(/ - | — /)[0]}</span>
        )}
      </div>
      <Column gap="12" padding="l" className={styles.words}>
        <Text as="h2" variant="heading-strong-l" wrap="balance">
          {title}
        </Text>
        {description?.trim() && (
          <Text variant="body-default-m" onBackground="neutral-weak" wrap="balance">
            {description}
          </Text>
        )}
        {target && (
          <span className={styles.cta}>
            <Text variant="body-default-s">View project</Text>
            <Icon name={link ? "arrowUpRightFromSquare" : "arrowRight"} size="xs" />
          </span>
        )}
      </Column>
    </Glass>
  );

  if (!target) {
    return card;
  }

  return link ? (
    <a className={styles.link} href={link} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    <Link className={styles.link} href={href}>
      {card}
    </Link>
  );
};
