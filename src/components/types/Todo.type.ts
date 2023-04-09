export interface TodoItem {
  _id: string;
  text: string;
  createdAt: Date;
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
