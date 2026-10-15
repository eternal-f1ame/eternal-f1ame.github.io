import { Column, Heading, Text } from "@/once-ui/components";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  intro?: ReactNode;
}

/* an index page's title on the centre axis, with an optional line of intro under it */
export function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <Column fillWidth horizontal="center" gap="12" paddingBottom="40">
      <Heading as="h1" variant="display-strong-s" align="center" wrap="balance">
        {title}
      </Heading>
      {intro && (
        <Text variant="body-default-l" onBackground="neutral-weak" align="center" wrap="balance">
          {intro}
        </Text>
      )}
    </Column>
  );
}
