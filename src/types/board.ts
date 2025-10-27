export interface Board {
  title: string;
  lists: List[];
}

export interface List {
  id: number;
  title: string;
}
