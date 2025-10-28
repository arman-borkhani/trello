"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { List as ListType } from "@/types/board";
import BoardContext from "@/contexts/boardContext";
import { BsThreeDots, BsX } from "react-icons/bs";
import Card from "./Card";
import { useSortable } from "@dnd-kit/sortable";

export default function List({ list }: { list: ListType }) {
  const { dispatch } = useContext(BoardContext);
  const [title, setTitle] = useState(list.title);
  const [editing, setEditing] = useState(false);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: list.id, data: { type: "List", list } });

  const style = {
    transition,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  // ref that wraps the trigger + dropdown so we can detect outside clicks
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const handleSave = () => {
    if (title.trim() === "") {
      setTitle(list.title);
      setEditing(false);
      return;
    }
    dispatch({ type: "SET_LIST_TITLE", payload: { id: list.id, title } });
    setEditing(false);
  };

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const el = actionsRef.current;
      const target = event.target as Node | null;
      if (!el) return;
      // if click target is outside our actionsRef, close dropdown
      if (target && !el.contains(target)) {
        setActionDropdown(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div
      className="list"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
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

        <div className="list__actions" ref={actionsRef}>
          <BsThreeDots onClick={() => setActionDropdown((s) => !s)} />

          {actionDropdown && (
            <div className="list__actions-dropdown">
              <div className="list__actions-dropdown-header">
                <span className="list__actions-dropdown-header-text">
                  List Actions
                </span>
                <BsX size={20} onClick={() => setActionDropdown(false)} />
              </div>
              <ul className="list__actions-dropdown-list">
                <li
                  className="list__actions-dropdown-item"
                  onClick={() =>
                    dispatch({ type: "DELETE_LIST", payload: list.id })
                  }
                >
                  Delete List
                </li>
                <li
                  className="list__actions-dropdown-item"
                  onClick={() => {
                    dispatch({ type: "CLEAR_LIST_CARDS", payload: list.id });
                    setActionDropdown(false);
                  }}
                >
                  Delete All Cards
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <div className="list__cards">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} listId={list.id} />
        ))}
      </div>
      <footer className="list__footer">
        {isFormVisible ? (
          <form
            action=""
            className="list__add-card-form"
            onSubmit={(e) => {
              e.preventDefault();
              const title = newCardTitle.trim();
              if (!title) return;
              dispatch({
                type: "ADD_CARD",
                payload: { listId: list.id, title },
              });
              setNewCardTitle("");
              setIsFormVisible(false);
            }}
          >
            <textarea
              placeholder="Enter card title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              autoFocus
            />
            <div className="list__add-card-form-actions">
              <button type="submit" className="button button--primary">
                Create Card
              </button>
              <BsX
                className="cursor-pointer"
                size={24}
                onClick={() => setIsFormVisible(false)}
              />
            </div>
          </form>
        ) : (
          <button
            className="button list__add-card-button"
            onClick={() => setIsFormVisible(true)}
          >
            + Add another card
          </button>
        )}
      </footer>
    </div>
  );
}
