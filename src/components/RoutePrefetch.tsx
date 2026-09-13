"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/app/resources";
import { gallery } from "@/app/resources/content";

interface RoutePrefetchProps {
  /* Slug pages to warm, e.g. /blog/some-post. Top level routes are left out on
     purpose: the header nav links are next/link, so Next already prefetches
     those on load, and prefetching them again only refetches each payload
     under a second cache key. */
  paths?: string[];
}

/*
  Warms the rest of the site once the browser goes idle, so navigating away from
  the landing page is instant: every blog post and project payload, plus the
  gallery cover images, which are the only heavy assets here and which no link
  prefetch would fetch. Backs off on metered connections.
*/
export function RoutePrefetch({ paths = [] }: RoutePrefetchProps) {
  const router = useRouter();
  const pathKey = paths.join("|");

  useEffect(() => {
    const connection = (navigator as any).connection;
    const effectiveType: string = connection?.effectiveType ?? "";
    if (connection?.saveData || effectiveType.includes("2g")) {
      return;
    }

    const warm = () => {
      for (const path of pathKey ? pathKey.split("|") : []) {
        router.prefetch(path);
      }

      // images are the expensive part, so hold them back on slower connections
      if (routes["/gallery"] && !effectiveType.includes("3g")) {
        for (const item of gallery.items) {
          const src = item.type === "poem" ? item.imageSrc : item.src;
          if (!src) continue;
          const image = new Image();
          image.decoding = "async";
          image.src = src;
        }
      }
    };

    const idle = (window as any).requestIdleCallback;
    if (typeof idle === "function") {
      const handle = idle(warm, { timeout: 2000 });
      return () => (window as any).cancelIdleCallback?.(handle);
    }

    const timer = setTimeout(warm, 800);
    return () => clearTimeout(timer);
  }, [router, pathKey]);

  return null;
}
