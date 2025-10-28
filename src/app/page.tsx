"use client";

import { useReducer } from "react";
import Board from "@/components/Board";
import boardReducer from "@/reducers/boardReducer";
import BoardContext from "@/contexts/boardContext";
import {
  DndContext,
  useSensor,
  useSensors,
  closestCenter,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const fromIndex = board.lists.findIndex((t) => t.id === active.id);
      const toIndex = board.lists.findIndex((t) => t.id === over.id);
      dispatch({ type: "REORDER_LISTS", payload: { fromIndex, toIndex } });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <BoardContext.Provider value={{ board, dispatch }}>
        <Board />
      </BoardContext.Provider>
    </DndContext>
  );
}
