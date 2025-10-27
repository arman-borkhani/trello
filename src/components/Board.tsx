"use client";

import { useState } from "react";
import { Board as BoardType } from "@/types/board";

export default function Board() {
  const [board, setBoard] = useState<BoardType>({
    title: "Demo Board",
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
    </div>
  );
}
