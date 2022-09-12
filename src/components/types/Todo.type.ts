export interface ITodos {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
export interface TodosProps {
  todos: ITodos[];
  setTodos: React.Dispatch<React.SetStateAction<never[]>>;
}

export interface TodoProps {
  items: ITodos;
  setTodos: React.Dispatch<React.SetStateAction<never[]>>;
}

export interface StyleProps {
  isCompleted: boolean | null;
}
