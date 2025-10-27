import { Board as BoardType } from "@/types/board";

type BoardState = BoardType;

export type BoardAction = { type: "SET_BOARD_TITLE"; payload: string };

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "SET_BOARD_TITLE":
      return { ...state, title: action.payload };
    default:
      return state;
  }
}

export default boardReducer;
