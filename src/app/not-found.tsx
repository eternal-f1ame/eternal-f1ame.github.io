import { site } from "@/app/resources/content";
import { Column, Heading, SmartLink, Text } from "@/once-ui/components";

export const metadata = { title: site.notFound.title };

/* a flipped table, and the way back home */
export default function NotFound() {
  return (
    <Column as="section" fillWidth fitHeight horizontal="center" gap="20" paddingY="128">
      <Text variant="display-default-m" onBackground="neutral-strong" align="center">
        {site.notFound.face}
      </Text>
      <Heading as="h1" variant="heading-default-l" align="center" wrap="balance">
        {site.notFound.line}
      </Heading>
      <SmartLink href="/" className="glide-link">
        <Text variant="body-default-m">{site.notFound.back}</Text>
      </SmartLink>
    </Column>
  );
}
