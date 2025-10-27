import { Board as BoardType } from "@/types/board";

type BoardState = BoardType;

export type BoardAction =
  | { type: "SET_BOARD_TITLE"; payload: string }
  | { type: "SET_LIST_TITLE"; payload: { id: number; title: string } };

function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "SET_BOARD_TITLE":
      return { ...state, title: action.payload };
    case "SET_LIST_TITLE":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id
            ? { ...list, title: action.payload.title }
            : list
        ),
      };
    default:
      return state;
  }
}

export default boardReducer;
