export interface TodoItem {
  id: number;
  text: string;
  isCompleted: boolean;
}
export interface TodoListProps {
  todos: TodoItem[] | null;
}

export interface TodoListItemProps {
  items: TodoItem;
}

export interface StyleProps {
  isCompleted: boolean | null;
}

export interface TodoInsertProps {
  setTodoId: React.Dispatch<React.SetStateAction<number>>;
  todoId: number;
}
