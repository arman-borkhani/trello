"use client";

import { BsX } from "react-icons/bs";
import { Card as CardType } from "@/types/board";
import { useState, useContext } from "react";
import BoardContext from "@/contexts/boardContext";

export default function CardModal({
  card,
  listId,
  onClose,
}: {
  card: CardType;
  listId: number;
  onClose: () => void;
}) {
  const [newComment, setNewComment] = useState("");
  const { dispatch } = useContext(BoardContext);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!text) return;
    dispatch({
      type: "ADD_COMMENT",
      payload: { listId, cardId: card.id, text },
    });
    setNewComment("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal__header">
          <h2 className="modal__title">Comments for "{card.title}"</h2>
          <BsX className="cursor-pointer" size={24} onClick={onClose} />
        </header>

        <div className="modal__content">
          {card.comments.length > 0 ? (
            <div className="comments-list">
              {card.comments.map((c) => (
                <div className="comments-list__item" key={c.id}>
                  <div className="comments-list__item-meta">
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                  {c.text}
                </div>
              ))}
            </div>
          ) : (
            <p className="comments-list-empty-msg">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        <form action="" className="comment-form" onSubmit={handleAddComment}>
          <textarea
            className="comment-form__textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="button button--primary comment-form__submit"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}
