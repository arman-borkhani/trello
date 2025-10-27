"use client";

import { Card as CardType } from "@/types/board";
import { useState } from "react";

export default function Card({
  card,
  listId,
}: {
  card: CardType;
  listId: number;
}) {
  return (
    <>
      <div className="card">
        <div className="card__title">{card.title}</div>
        <button className="card__comments">
          Comments ({card.comments.length})
        </button>
      </div>
    </>
  );
}
