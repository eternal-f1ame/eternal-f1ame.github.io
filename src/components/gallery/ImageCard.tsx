"use client";

import { useState } from 'react';
import { SmartImage } from '@/once-ui/components';
import styles from './Gallery.module.scss';

interface ImageCardProps {
  src: string;
  alt: string;
  orientation: 'horizontal' | 'vertical' | string; // Allow string for flexibility if other values exist
  priority?: boolean;
}

export default function ImageCard({ src, alt, orientation, priority }: ImageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const aspectRatio = orientation === 'horizontal' ? '16 / 9' : '9 / 16';

  return (
    <div
      className={`${styles.gridItem} ${isExpanded ? styles.expanded : ''}`}
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }} // Add pointer cursor to indicate interactivity
    >
      <SmartImage
        priority={priority}
        sizes={isExpanded ? "100vw" : "(max-width: 30em) 100vw, (max-width: 64em) 50vw, 33vw"}
        key={src} // Use src for key as it's unique per image
        radius="m"
        aspectRatio={aspectRatio} // Keep original aspect ratio for image fidelity
        src={src}
        alt={alt}
        // className={styles.gridImage} // Potentially a new class for specific image styling within the card
        style={{
          width: '100%',
          height: isExpanded ? 'auto' : '100%', // Allow image to define height when expanded
          objectFit: isExpanded ? 'contain' : 'cover', // Show full image when expanded, cover when collapsed
        }}
      />
    </div>
  );
} 