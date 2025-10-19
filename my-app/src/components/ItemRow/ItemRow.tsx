import React from "react";
import type { ListItem } from "../../types";
import styles from "./ItemRow.module.css";

type Props = {
  item: ListItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

const ItemRow: React.FC<Props> = ({ item, onToggle, onRemove }) => {
  return (
    <div className={styles.row}>
      <label className={styles.left}>
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
          className={styles.checkbox}
        />
        <span className={item.done ? styles.doneText : undefined}>{item.name}</span>
      </label>
      <div className={styles.right}>
        <span className={styles.qty}>x{item.qty}</span>
        <button className={styles.delete} onClick={() => onRemove(item.id)} aria-label="Remove">
          ✕
        </button>
      </div>
    </div>
  );
};

export default ItemRow;
