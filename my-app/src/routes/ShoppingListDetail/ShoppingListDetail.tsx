import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { initialShoppingList } from "../../data/shoppingList";
import type { ShoppingList, ListItem } from "../../types";
import ListHeader from "../../components/ListHeader/ListHeader";
import ItemForm from "../../components/ItemForm/ItemForm";
import ItemsList from "../../components/ItemsList/ItemsList";
import styles from "./ShoppingListDetail.module.css";

const ShoppingListDetail: React.FC = () => {
  const params = useParams();
  const id = params.id ?? "";

  // Start with the constant initialShoppingList (assignment requirement)
  const [list, setList] = useState<ShoppingList>(initialShoppingList);

  // If route id doesn't match the initialShoppingList id, show not found.
  if (id !== initialShoppingList.id) {
    return (
      <main className={styles.container}>
        <h2>List not found</h2>
        <p>The requested list was not found.</p>
        <p>
          <Link to="/">Back to home</Link>
        </p>
      </main>
    );
  }

  // Handler: rename the list
  const renameList = (newName: string) => {
    // simple local update
    setList((prev) => ({ ...prev, name: newName }));
  };

  // Handler: add a new item
  const addItem = (name: string, qty: number) => {
    const id = (crypto as any).randomUUID?.() ?? String(Date.now());
    const newItem: ListItem = { id, name, qty, done: false };
    setList((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  // Handler: toggle done
  const toggleItem = (itemId: string) => {
    setList((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === itemId ? { ...it, done: !it.done } : it)),
    }));
  };

  // Handler: remove item
  const removeItem = (itemId: string) => {
    setList((prev) => ({ ...prev, items: prev.items.filter((it) => it.id !== itemId) }));
  };

  return (
    <main className={styles.container}>
      <ListHeader name={list.name} onRename={renameList} />
      <section className={styles.controls}>
        <ItemForm onAdd={addItem} />
      </section>
      <section className={styles.items}>
        <ItemsList items={list.items} onToggle={toggleItem} onRemove={removeItem} />
      </section>
      <p className={styles.resetNote}>
        Note: This page uses local state initialized from a constant. Reloading resets data to the
        initial constant.
      </p>
    </main>
  );
};

export default ShoppingListDetail;
