"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@/once-ui/components";
import { Glass } from "@/components/Glass";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  // one link: the project itself when it lives somewhere, otherwise its write-up here
  const target = link || (content?.trim() ? href : "");

  return (
    <Glass interactive className="glass-clip">
      <Column fillWidth gap="m">
        {images.length > 0 && (
          <Carousel
            sizes="(max-width: 60em) 100vw, 60em"
            images={images.map((image) => ({
              src: image,
              alt: title,
            }))}
          />
        )}
        <Flex
          mobileDirection="column"
          fillWidth
          paddingX="s"
          paddingTop="12"
          paddingBottom="24"
          gap="l"
        >
          {title && (
            <Flex flex={5}>
              <Heading as="h2" wrap="balance" variant="heading-strong-xl">
                {title}
              </Heading>
            </Flex>
          )}
          {(avatars?.length > 0 || description?.trim() || target) && (
            <Column flex={7} gap="16">
              {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
              {description?.trim() && (
                <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                  {description}
                </Text>
              )}
              {target && (
                <SmartLink
                  suffixIcon={link ? "arrowUpRightFromSquare" : "arrowRight"}
                  style={{ margin: "0", width: "fit-content" }}
                  href={target}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Column>
          )}
        </Flex>
      </Column>
    </Glass>
  );
};
