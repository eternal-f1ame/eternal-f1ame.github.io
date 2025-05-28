"use client";

import { useEffect, useState } from 'react';
import { Column, Text, Heading } from '@/once-ui/components';
import styles from './Gallery.module.scss'; // Assuming you might want to reuse some styles

interface PoemCardProps {
  filePath: string;
  title: string;
}

export default function PoemCard({ filePath, title }: PoemCardProps) {
  const [poemContent, setPoemContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchPoem = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch poem: ${response.statusText} (status: ${response.status}) from ${filePath}`);
        }
        const text = await response.text();
        setPoemContent(text);
      } catch (e: any) {
        console.error("Error fetching poem:", e);
        setError(e.message || 'Could not load poem.');
      }
      setIsLoading(false);
    };

    if (filePath) {
      fetchPoem();
    }
  }, [filePath]);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  if (isLoading) {
    return (
      <Column 
        className={`${styles.gridItem} ${isExpanded ? styles.expanded : ''}`}
        padding="m" 
        border="neutral-medium" 
        radius="m"
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <Heading variant="heading-strong-s">{title}</Heading>
        <Text>Loading poem...</Text>
      </Column>
    );
  }

  if (error) {
    return (
      <Column 
        className={`${styles.gridItem} ${isExpanded ? styles.expanded : ''}`}
        padding="m" 
        border="danger-medium" 
        radius="m"
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer' }}
      >
        <Heading variant="heading-strong-s">{title}</Heading>
        <Text onBackground='danger-strong'>Error: {error}</Text>
      </Column>
    );
  }

  return (
    <Column 
      className={`${styles.gridItem} ${isExpanded ? styles.expanded : ''}`}
      padding="m" 
      border="neutral-medium" 
      radius="m" 
      gap="m"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <Heading variant="heading-strong-s">{title}</Heading>
      <Text 
        style={{
          whiteSpace: 'pre-wrap',
          overflow: isExpanded ? 'visible' : 'hidden',
          maxHeight: isExpanded ? 'none' : '200px',
          textOverflow: isExpanded ? 'clip' : 'ellipsis',
        }}
      >
        {poemContent}
      </Text>
    </Column>
  );
} 