"use client";

import Masonry from "react-masonry-css";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";
import PoemCard from "./PoemCard";
import ImageCard from "./ImageCard";

export default function MasonryGrid() {
  // matches --m (2 columns) and --xs (1 column) in src/app/resources/breakpoints.scss;
  // react-masonry-css compares window.innerWidth, so these stay as numbers
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    480: 1,
  };

  // Simple fallback if no items
  if (!gallery.items || gallery.items.length === 0) {
    return <div>No gallery items found.</div>;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.items.map((item, index) => {
        if (item.type === "picture") {
          return (
            <ImageCard
              key={`${item.src}-${index}`}
              src={item.src}
              alt={item.alt}
              orientation={item.orientation}
              priority={index < 10}
            />
          );
        } else if (item.type === "poem") {
          return (
            <PoemCard key={`${item.filePath}-${index}`} title={item.title} imageSrc={item.imageSrc} />
          );
        }
        return null;
      })}
    </Masonry>
  );
}
