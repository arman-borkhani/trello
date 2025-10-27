"use client";

import { useContext, useState } from "react";
import List from "./List";
import BoardContext from "@/contexts/boardContext";

export default function Board() {
  const { board, dispatch } = useContext(BoardContext);
  const [title, setTitle] = useState(board.title);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (title.trim() === "") {
      setTitle(board.title);
      setEditing(false);
      return;
    }
    dispatch({ type: "SET_BOARD_TITLE", payload: title });
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
