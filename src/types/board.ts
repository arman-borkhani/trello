export interface Board {
  title: string;
  lists: List[];
}

export interface List {
  id: number;
  title: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}
