import { slugify } from "@/app/utils/slug";
import Link from "next/link";
import styles from "./Gallery.module.scss";

interface PoemCardProps {
  title: string;
  imageSrc: string;
}

/* a poem's cover in the gallery; it opens the poem on its own page */
export default function PoemCard({ title, imageSrc }: PoemCardProps) {
  return (
    <Link href={`/gallery/${slugify(title)}`} className={styles.gridItem}>
      <img src={imageSrc} alt="" loading="lazy" decoding="async" />
      <span className={styles.imageOverlay}>
        <span className={styles.tileTitle}>{title}</span>
      </span>
    </Link>
  );
}
