"use client";

import { useReducer } from "react";
import Board from "@/components/Board";
import boardReducer from "@/reducers/boardReducer";
import BoardContext from "@/contexts/boardContext";

export default function Home() {
  const [board, dispatch] = useReducer(boardReducer, {
    title: "Demo Board",
    lists: [
      {
        id: 1,
        title: "Todo",
        cards: [
          { id: "1", title: "Create interview Kanban", comments: [] },
          { id: "2", title: "Review Drag & Drop", comments: [] },
        ],
      },
      {
        id: 2,
        title: "In Progress",
        cards: [{ id: "3", title: "Set up Next.js project", comments: [] }],
      },
      { id: 3, title: "Done", cards: [] },
    ],
  });

  return (
    <BoardContext.Provider value={{ board, dispatch }}>
      <Board />
    </BoardContext.Provider>
  );
}
