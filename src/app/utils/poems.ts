import fs from "node:fs";
import path from "node:path";
import { gallery } from "@/app/resources/content";
import { slugify } from "./slug";

export interface Poem {
  slug: string;
  title: string;
  imageSrc: string;
  stanzas: string[];
  signature?: string;
}

/*
  The poems in gallery order. The text is read from public/ at build time, so each
  poem's page carries its words in the HTML rather than fetching them after load.
*/
export function getPoems(): Poem[] {
  return gallery.items
    .filter((item) => item.type === "poem")
    .map((item) => {
      const text = fs.readFileSync(path.join(process.cwd(), "public", item.filePath), "utf-8");
      const lines = text.trimEnd().split("\n");
      // the closing "~ Aaditya Baranwal" is a signature, not a line of the poem
      const signature = /^\s*~/.test(lines[lines.length - 1] ?? "")
        ? lines.pop()?.trim()
        : undefined;
      const stanzas = lines
        .join("\n")
        .split(/\n[ \t]*\n/)
        .map((stanza) => stanza.replace(/^\n+|\s+$/g, ""))
        .filter(Boolean);

      return {
        slug: slugify(item.title),
        title: item.title,
        imageSrc: item.imageSrc,
        stanzas,
        signature,
      };
    });
}
