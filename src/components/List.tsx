"use client";

import { useState } from "react";
import { List as ListType } from "@/types/board";

export default function List({ list }: { list: ListType }) {
  const [title, setTitle] = useState(list.title);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="list">
      <header className="list__header">
        {editing ? (
          <input
            className="list__title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
          />
        ) : (
          <h3 className="list__title-text" onClick={() => setEditing(true)}>
            {list.title}
          </h3>
        )}
      </header>
      <div className="list__cards"></div>
      <footer className="list__footer"></footer>
    </div>
  );
}
