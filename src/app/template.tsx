import type { ReactNode } from "react";

/*
  A template, unlike the layout, mounts afresh on every navigation, so each page plays
  its arrival (.page-enter in src/app/resources/glass.scss) whether it is the first
  load or a click from another page.
*/
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
