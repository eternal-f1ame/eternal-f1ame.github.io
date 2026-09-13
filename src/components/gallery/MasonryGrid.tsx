"use client";

import Masonry from "react-masonry-css";
import { SmartImage } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";
import PoemCard from "./PoemCard";
import ImageCard from "./ImageCard";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 3,
    1440: 3,
    1024: 2,
    560: 1,
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
            <PoemCard
              key={`${item.filePath}-${index}`}
              filePath={item.filePath}
              title={item.title}
              imageSrc={item.imageSrc}
            />
          );
        }
        return null;
      })}
    </Masonry>
  );
}
