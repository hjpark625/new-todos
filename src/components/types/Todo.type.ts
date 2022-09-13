export interface ITodos {
  id: number;
  text: string;
  isCompleted: boolean;
}
export interface TodosProps {
  todos: ITodos[] | null;
}

export interface TodoProps {
  items: ITodos;
}

export interface StyleProps {
  isCompleted: boolean | null;
}
