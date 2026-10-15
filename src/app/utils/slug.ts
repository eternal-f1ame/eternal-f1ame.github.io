/* "LORD OF BEASTS..." becomes "lord-of-beasts", a poem's address under /gallery */
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
