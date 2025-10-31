import KanbanBoard from "@/components/KanbanBoard";
import styles from "./page.module.css";

export default function Home() {
  
  return (
      <main className={styles.main}>
        <KanbanBoard />
      </main>
  );
}
