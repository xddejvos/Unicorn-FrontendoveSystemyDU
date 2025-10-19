import React from "react";
import type { ListItem } from "../../types";
import ItemRow from "../ItemRow/ItemRow";
import EmptyState from "../EmptyState/EmptyState";
import styles from "./ItemsList.module.css";

type Props = {
  items: ListItem[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

const ItemsList: React.FC<Props> = ({ items, onToggle, onRemove }) => {
  if (!items || items.length === 0) {
    return (
      <div className={styles.wrapper}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <ItemRow key={item.id} item={item} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default ItemsList;
