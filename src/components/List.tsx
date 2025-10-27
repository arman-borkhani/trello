"use client";

import { useContext, useState } from "react";
import { List as ListType } from "@/types/board";
import BoardContext from "@/contexts/boardContext";

export default function List({ list }: { list: ListType }) {
  const { dispatch } = useContext(BoardContext);
  const [title, setTitle] = useState(list.title);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (title.trim() === "") {
      setTitle(list.title);
      setEditing(false);
      return;
    }
    dispatch({ type: "SET_LIST_TITLE", payload: { id: list.id, title } });
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
            placeholder="Enter List Title..."
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
