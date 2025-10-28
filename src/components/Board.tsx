"use client";

import { useContext, useState } from "react";
import { BsX } from "react-icons/bs";
import List from "./List";
import BoardContext from "@/contexts/boardContext";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

export default function Board() {
  const { board, dispatch } = useContext(BoardContext);
  const [title, setTitle] = useState(board.title);
  const [editing, setEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const listItems = board.lists.map((list) => list.id);

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
      <SortableContext items={listItems} strategy={rectSortingStrategy}>
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
              <h1
                className="board__title-text"
                onClick={() => setEditing(true)}
              >
                {board.title}
              </h1>
            )}
          </div>
        </header>
        <div className="board__lists">
          {board.lists.map((list) => (
            <List key={list.id} list={list} />
          ))}

          <div>
            <div className="board__add-list">
              {isFormVisible ? (
                <form
                  action=""
                  className="board__add-list-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const title = newListTitle.trim();
                    if (!title) return;
                    dispatch({ type: "ADD_LIST", payload: { title } });
                    setNewListTitle("");
                    setIsFormVisible(false);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter a list title"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                  />
                  <div className="board__add-list-form-actions">
                    <button type="submit" className="button button--primary">
                      Add List
                    </button>
                    <BsX
                      className="cursor-pointer"
                      size={24}
                      onClick={() => setIsFormVisible(!isFormVisible)}
                    />
                  </div>
                </form>
              ) : (
                <button
                  className="button board__add-list-button"
                  onClick={() => setIsFormVisible(!isFormVisible)}
                >
                  + Add another list
                </button>
              )}
            </div>
          </div>
        </div>
      </SortableContext>
    </div>
  );
}
