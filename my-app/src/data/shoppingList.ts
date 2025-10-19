import type { ShoppingList } from "../types";

/**
 * This file represents the initial constant required by the assignment.
 * The app uses this constant as the initial state at the route level.
 * Reloading the page resets state to this constant (expected behavior).
 */
export const initialShoppingList: ShoppingList = {
  id: "list-1",
  name: "Víkendový nákup",
  owner: "user-1",
  members: ["user-1", "user-2"],
  items: [
    { id: "item-1", name: "Chléb", qty: 2, done: false },
    { id: "item-2", name: "Mléko", qty: 1, done: true },
    { id: "item-3", name: "Máslo", qty: 1, done: false },
  ],
};
