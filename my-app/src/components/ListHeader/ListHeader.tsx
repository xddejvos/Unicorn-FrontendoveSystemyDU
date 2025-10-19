import React, { useState } from "react";
import styles from "./ListHeader.module.css";

type Props = {
  name: string;
  onRename: (newName: string) => void;
};

const ListHeader: React.FC<Props> = ({ name, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  const startEdit = () => {
    setValue(name);
    setEditing(true);
  };

  const save = () => {
    const trimmed = value.trim();
    if (trimmed.length === 0) return;
    onRename(trimmed);
    setEditing(false);
  };

  return (
    <header className={styles.header}>
      {!editing ? (
        <>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.actions}>
            <button className={styles.button} onClick={startEdit}>
              Rename
            </button>
          </div>
        </>
      ) : (
        <div className={styles.editRow}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={styles.input}
            aria-label="List name"
          />
          <button className={styles.buttonPrimary} onClick={save}>
            Save
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </header>
  );
};

export default ListHeader;
