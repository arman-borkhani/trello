"use client";

import { useReducer } from "react";
import Board from "@/components/Board";
import boardReducer from "@/reducers/boardReducer";
import BoardContext from "@/contexts/boardContext";

export default function Home() {
  const [board, dispatch] = useReducer(boardReducer, {
    title: "Demo Board",
    lists: [
      { id: 1, title: "Todo" },
      { id: 2, title: "In Progress" },
      { id: 3, title: "Done" },
    ],
  });

  return (
    <BoardContext.Provider value={{ board, dispatch }}>
      <Board />
    </BoardContext.Provider>
  );
}
