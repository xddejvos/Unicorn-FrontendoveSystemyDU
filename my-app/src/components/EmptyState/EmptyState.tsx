import React from "react";
import styles from "./EmptyState.module.css";

const EmptyState: React.FC = () => {
  return (
    <div className={styles.empty}>
      <p className={styles.title}>No items yet</p>
      <p className={styles.desc}>Add a new item with the form above to start your list.</p>
    </div>
  );
};

export default EmptyState;
