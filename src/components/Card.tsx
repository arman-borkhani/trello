"use client";

import { Card as CardType } from "@/types/board";
import { useState } from "react";
import CardModal from "./CardModal";

export default function Card({
  card,
  listId,
}: {
  card: CardType;
  listId: number;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="card">
        <div className="card__title">{card.title}</div>
        <button className="card__comments" onClick={() => setIsModalOpen(true)}>
          Comments ({card.comments.length})
        </button>
      </div>

      {isModalOpen && (
        <CardModal
          card={card}
          listId={listId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
