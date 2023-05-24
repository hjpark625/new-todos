import type { TodoGetResponseType } from '@/api/todo/todoAPI.type';

export interface TodoListProps {
  todos: TodoGetResponseType[] | null;
}

export interface TodoListItemProps {
  items: TodoGetResponseType;
}

export interface StyleProps {
  isCompleted: boolean | null;
}
