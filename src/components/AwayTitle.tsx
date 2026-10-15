"use client";

import { site } from "@/app/resources/content";
import { useEffect } from "react";

/*
  While the tab is in the background, its title asks you to come back; the page's own
  title returns the moment you do.
*/
export function AwayTitle() {
  useEffect(() => {
    let title = document.title;

    const swap = () => {
      if (document.visibilityState === "hidden") {
        title = document.title;
        document.title = site.awayTitle;
      } else if (document.title === site.awayTitle) {
        document.title = title;
      }
    };

    document.addEventListener("visibilitychange", swap);
    return () => document.removeEventListener("visibilitychange", swap);
  }, []);

  return null;
}
