import React, { useState } from "react";
import styles from "./ItemForm.module.css";

type Props = { onAdd: (name: string, qty: number) => void };

const ItemForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState<number>(1);

  const submit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, qty > 0 ? qty : 1);
    setName("");
    setQty(1);
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        className={styles.input}
        placeholder="Nový položka (např. Jablka)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        min={1}
        className={styles.qty}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <button type="submit" className={styles.addBtn}>
        Add
      </button>
    </form>
  );
};

export default ItemForm;
