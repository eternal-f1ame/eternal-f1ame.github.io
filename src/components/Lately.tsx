import type { ReactNode } from "react";
import styles from "./Lately.module.scss";

interface LatelyProps {
  items: { date: string; text: ReactNode }[];
}

/* news, newest first: the month on the left, what happened beside it */
export function Lately({ items }: LatelyProps) {
  return (
    <ol className={styles.list}>
      {items.map((item, index) => (
        <li key={`${item.date}-${index}`} className={styles.item}>
          <span className={styles.date}>{item.date}</span>
          <span className={styles.text}>{item.text}</span>
        </li>
      ))}
    </ol>
  );
}
