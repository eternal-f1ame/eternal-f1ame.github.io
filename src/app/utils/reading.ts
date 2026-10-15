/* minutes to read a post at an unhurried 220 words a minute, markup aside */
export function readingTime(text: string) {
  const words = text
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
