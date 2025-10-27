"use client";

import { useState } from "react";
import List from "./List";
import { Board as BoardType } from "@/types/board";

export default function Board() {
  const [board, setBoard] = useState<BoardType>({
    title: "Demo Board",
    lists: [
      { id: 1, title: "Todo" },
      { id: 2, title: "In Progress" },
      { id: 3, title: "Done" },
    ],
  });
  const [title, setTitle] = useState(board.title);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setBoard({ ...board, title });
    setEditing(false);
  };

  return (
    <div className="board">
      <header className="board__header">
        <div className="board__title">
          {editing ? (
            <input
              className="board__title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          ) : (
            <h1 className="board__title-text" onClick={() => setEditing(true)}>
              {board.title}
            </h1>
          )}
        </div>
      </header>
      <div className="board__lists">
        {board.lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
