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

  // For the purposes of this assignment we use a fixed current user id stub.
  // In a real app this would come from auth/context.
  const currentUserId = "user-1"; // change to user-2 to test member perspective
  const isOwner = currentUserId === list.owner;
  const [filter, setFilter] = useState<'all' | 'open' | 'done'>('all');

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

  // Handler: rename the list (only owner should be able to rename — we enforce in UI)
  const renameList = (newName: string) => {
    if (!isOwner) return; // guard: do nothing if not owner
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

  // MEMBER / OWNER HANDLERS
  const addMember = (memberId: string) => {
    if (!isOwner) return; // only owner can add
    const trimmed = memberId.trim();
    if (!trimmed) return;
    if (list.members.includes(trimmed)) return;
    setList((prev) => ({ ...prev, members: [...prev.members, trimmed] }));
  };

  const removeMember = (memberId: string) => {
    // owner can remove other members; cannot remove themselves via this action
    if (!isOwner) return;
    setList((prev) => ({ ...prev, members: prev.members.filter((m) => m !== memberId) }));
  };

  const leaveList = () => {
    // a member can leave; if owner leaves we simply remove the member (owner stays in this simple model)
    setList((prev) => ({ ...prev, members: prev.members.filter((m) => m !== currentUserId) }));
  };

  return (
    <main className={styles.container}>
      {/* Only show rename option to owner (ListHeader infers from onRename presence) */}
      <ListHeader name={list.name} onRename={isOwner ? renameList : () => {}} />

      <section className={styles.controls}>
        <ItemForm onAdd={addItem} />
        <div className={styles.filterRow}>
          <button onClick={() => setFilter('all')} aria-pressed={filter === 'all'}>All</button>
          <button onClick={() => setFilter('open')} aria-pressed={filter === 'open'}>Open</button>
          <button onClick={() => setFilter('done')} aria-pressed={filter === 'done'}>Done</button>
        </div>
      </section>

      <section className={styles.members}>
        <h3>Members</h3>
        <ul>
          {list.members.map((m) => (
            <li key={m}>
              {m} {isOwner && m !== list.owner ? <button onClick={() => removeMember(m)}>Remove</button> : null}
              {m === list.owner ? " (owner)" : null}
            </li>
          ))}
        </ul>
        {isOwner ? (
          <div>
            <input id="new-member" placeholder="member-id" />
            <button
              onClick={() => {
                const el = document.getElementById("new-member") as HTMLInputElement | null;
                if (!el) return;
                addMember(el.value);
                el.value = "";
              }}
            >
              Add member
            </button>
          </div>
        ) : list.members.includes(currentUserId) ? (
          <div>
            <button onClick={leaveList}>Leave list</button>
          </div>
        ) : null}
      </section>

      <section className={styles.items}>
        {/* filter items locally */}
        {(() => {
          const filtered = list.items.filter((it) => {
            if (filter === 'all') return true;
            if (filter === 'open') return !it.done;
            return it.done;
          });
          return <ItemsList items={filtered} onToggle={toggleItem} onRemove={removeItem} />;
        })()}
      </section>

      <p className={styles.resetNote}>
        Note: This page uses local state initialized from a constant. Reloading resets data to the
        initial constant.
      </p>
    </main>
  );
};

export default ShoppingListDetail;
