"use client";

import { useEffect, useRef, useState } from "react";

interface CopyBibtexProps {
  /* the .bib file under public/papers/ */
  href: string;
  /* the paper's short name, for the accessible label */
  name: string;
  className?: string;
}

/*
  Copies a paper's BibTeX in one click. It is a link to the .bib file underneath, so
  without JavaScript, or where the clipboard is refused, it opens the file instead.
*/
export function CopyBibtex({ href, name, className }: CopyBibtexProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(href);
      await navigator.clipboard.writeText(await response.text());
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.open(href, "_blank", "noopener");
    }
  };

  return (
    <a href={href} onClick={copy} className={className} aria-label={`Copy BibTeX for ${name}`}>
      <span aria-live="polite">{copied ? "Copied" : "BibTeX"}</span>
    </a>
  );
}
