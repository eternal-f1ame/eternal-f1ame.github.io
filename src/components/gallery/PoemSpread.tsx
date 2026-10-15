"use client";

import { type ReactNode, useEffect, useRef } from "react";

interface PoemSpreadProps {
  className?: string;
  children: ReactNode;
}

/*
  The photograph and the poem side by side (the photograph first, the poem second).
  While the photograph is pinned, the page gets just enough room at its foot for the poem
  to rise until its last line, the signature, sits level with the photograph's lower
  edge. That depends on the window, the photograph and the visitor's text size, so it is
  measured, and measured again whenever one of them changes. The room is padding under
  the poem, written to --room; where the photograph is not pinned, there is none.
*/
export function PoemSpread({ className, children }: PoemSpreadProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spread = ref.current;
    const photo = spread?.firstElementChild as HTMLElement | null;
    const poem = spread?.lastElementChild as HTMLElement | null;
    const lines = poem?.querySelectorAll("p");
    const end = lines?.[lines.length - 1];
    if (!spread || !photo || !poem || !end) return;

    const fit = () => {
      const pinned = getComputedStyle(photo);
      let room = 0;

      if (pinned.position === "sticky") {
        const scroll = window.scrollY;
        const photoHeight = photo.getBoundingClientRect().height;
        const endBottom = end.getBoundingClientRect().bottom + scroll;

        // a poem that already ends beside the photograph needs no room
        if (endBottom > spread.getBoundingClientRect().top + scroll + photoHeight) {
          // measured against the page without the current room, which is never taken away
          // first: shrinking the page under a reader would jump their scroll
          const current = Number.parseFloat(getComputedStyle(poem).paddingBottom) || 0;
          const scrollable = document.documentElement.scrollHeight - current - window.innerHeight;
          room = endBottom - Number.parseFloat(pinned.top) - photoHeight - scrollable;
        }
      }

      const em = Number.parseFloat(getComputedStyle(poem).fontSize);
      spread.style.setProperty("--room", `${Math.max(0, room) / em}em`);
    };

    const image = photo.querySelector("img");
    fit();
    document.fonts?.ready.then(fit);
    image?.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    // the page's arrival and the stanzas' entrance move things until they end, so the
    // last of them to finish gives the exact measure
    window.addEventListener("animationend", fit);

    return () => {
      image?.removeEventListener("load", fit);
      window.removeEventListener("resize", fit);
      window.removeEventListener("animationend", fit);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
