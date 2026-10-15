"use client";

import { useEffect, useState } from 'react';
import { Column, Text, Heading, SmartImage, Flex, IconButton } from '@/once-ui/components';
import styles from './Gallery.module.scss';

interface PoemCardProps {
  filePath: string;
  title: string;
  imageSrc: string;
}

export default function PoemCard({ filePath, title, imageSrc }: PoemCardProps) {
  const [poemContent, setPoemContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPoem = async () => {
    if (poemContent) return; // Don't fetch if already loaded
    
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

  const handleImageClick = () => {
    setIsModalOpen(true);
    fetchPoem(); // Load poem content when opening modal
  };

  const handleModalClose = (e?: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the content (when event is provided)
    if (!e || e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  // Add keyboard support for closing modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Image Card */}
      <div 
        className={styles.gridItem}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={imageSrc}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Overlay with title */}
        <div className={styles.imageOverlay}>
          <Text variant="body-default-s" onBackground="neutral-strong" style={{ 
            textShadow: '0 0.0625em 0.1875em rgba(0,0,0,0.8)',
            fontWeight: 'bold',
            color: 'white'
          }}>
            {title}
          </Text>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} onClick={handleModalClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Flex horizontal="space-between" vertical="center" padding="xl" paddingBottom="m">
              <Heading variant="heading-strong-l">
                {title}
              </Heading>
              <IconButton 
                icon="close" 
                variant="ghost" 
                size="m"
                onClick={handleCloseClick}
                tooltip="Close"
              />
            </Flex>
            
            <Column gap="m" paddingX="xl" paddingBottom="xl">
              {isLoading && (
                <Text>Loading poem...</Text>
              )}
              
              {error && (
                <Text onBackground='danger-strong'>Error: {error}</Text>
              )}
              
              {poemContent && !isLoading && (
                <div className={styles.poemContent}>
                  <Text 
                    style={{
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6',
                    }}
                    variant="body-default-m"
                  >
                    {poemContent}
                  </Text>
                </div>
              )}
            </Column>
          </div>
        </div>
      )}
    </>
  );
} 