"use client";

import { Column, Line, Text } from "@/once-ui/components";
import type React from "react";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

/*
  The page index. It sits under the portrait in the sticky left column, so it travels
  with the content instead of being pinned to the window edge, and it is hidden once
  that column stacks above the content on small screens.
*/
const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string, offset: number) => {
    const element = document.getElementById(id);
    if (!element) return;
    event.preventDefault();
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Column as="nav" aria-label="On this page" horizontal="center" gap="12" paddingTop="m" hide="s">
      <Line background="neutral-alpha-medium" style={{ maxWidth: "3em" }} marginBottom="8" />
      {structure
        .filter((section) => section.display)
        .map((section) => (
          <Column key={section.title} horizontal="center" gap="8">
            <a
              href={`#${section.title}`}
              className="glide-link"
              onClick={(event) => scrollTo(event, section.title, 80)}
            >
              <Text variant="body-default-s">{section.title}</Text>
            </a>
            {about.tableOfContent.subItems &&
              section.items.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="glide-link"
                  onClick={(event) => scrollTo(event, item, 80)}
                >
                  <Text variant="body-default-xs">{item}</Text>
                </a>
              ))}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;
