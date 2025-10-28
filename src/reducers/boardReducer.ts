import { Board as BoardType } from "@/types/board";

type BoardState = BoardType;

export type BoardAction =
  | { type: "SET_BOARD_TITLE"; payload: string }
  | { type: "SET_LIST_TITLE"; payload: { id: number; title: string } }
  | { type: "DELETE_LIST"; payload: number }
  | { type: "ADD_LIST"; payload: { title: string } }
  | { type: "ADD_CARD"; payload: { listId: number; title: string } }
  | { type: "CLEAR_LIST_CARDS"; payload: number }
  | {
      type: "ADD_COMMENT";
      payload: { listId: number; cardId: string; text: string };
    }
  | { type: "REORDER_LISTS"; payload: { fromIndex: number; toIndex: number } };

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
    case "DELETE_LIST":
      return {
        ...state,
        lists: state.lists.filter((list) => list.id !== action.payload),
      };
    case "ADD_LIST": {
      const nextId = state.lists.length
        ? Math.max(...state.lists.map((l) => l.id)) + 1
        : 1;
      const newList = { id: nextId, title: action.payload.title, cards: [] };
      return { ...state, lists: [...state.lists, newList] };
    }
    case "ADD_CARD": {
      const { listId, title } = action.payload;
      const newCard = { id: Date.now().toString(), title, comments: [] };
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === listId
            ? { ...list, cards: [...list.cards, newCard] }
            : list
        ),
      };
    }
    case "CLEAR_LIST_CARDS":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload ? { ...list, cards: [] } : list
        ),
      };
    case "ADD_COMMENT": {
      const { listId, cardId, text } = action.payload;
      const newComment = {
        id: Date.now().toString(),
        text,
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === cardId
                    ? { ...card, comments: [...card.comments, newComment] }
                    : card
                ),
              }
            : list
        ),
      };
    }
    case "REORDER_LISTS": {
      const { fromIndex, toIndex } = action.payload;
      const newLists = [...state.lists];
      const [moved] = newLists.splice(fromIndex, 1);
      newLists.splice(toIndex, 0, moved);
      return { ...state, lists: newLists };
    }
    default:
      return state;
  }
}

export default boardReducer;
