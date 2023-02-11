export interface TodoItem {
  id: string;
  uid: string;
  text: string;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
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
