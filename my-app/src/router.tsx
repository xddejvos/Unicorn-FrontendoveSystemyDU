import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ShoppingListDetail from "./routes/ShoppingListDetail/ShoppingListDetail";

const Home: React.FC = () => {
  return (
    <main style={{ padding: 24 }}>
      <h1>Shopping Lists</h1>
      <p>This is a tiny demo. Click the link below to view the shopping list detail.</p>
      <p>
        <Link to="/lists/list-1">Open: Víkendový nákup</Link>
      </p>
    </main>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lists/:id" element={<ShoppingListDetail />} />
      <Route path="*" element={<main style={{ padding: 24 }}><h2>Not found</h2></main>} />
    </Routes>
  );
};

export default AppRouter;
