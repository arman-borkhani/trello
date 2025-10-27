import { BoardAction } from "@/reducers/boardReducer";
import { Board } from "@/types/board";
import { createContext, Dispatch } from "react";

type boardContextType = {
  board: Board;
  dispatch: Dispatch<BoardAction>;
};

const BoardContext = createContext<boardContextType>({} as boardContextType);

export default BoardContext;
