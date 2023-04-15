import api from '..';
import type { AxiosResponse } from 'axios';
import type { TodoCreateResponseType, TodoGetResponseType } from './todoAPI.type';

export const createTodo = async ({
  text,
  createdAt,
  isCompleted,
}: {
  text: string;
  createdAt: string;
  isCompleted: boolean;
}) => {
  const { data } = await api.post<AxiosResponse<TodoCreateResponseType>>('/todos', { text, createdAt, isCompleted });
  return data;
};

export const getTodos = async () => {
  const { data } = await api.get<AxiosResponse<TodoGetResponseType[]>>('/todos');
  return data;
};

export const updateCheckTodo = async ({ _id, isCompleted }: { _id: string; isCompleted: boolean }) => {
  await api.patch(`/todos/${_id}`, { isCompleted });
};
export const updateTextTodo = async ({ _id, text }: { _id: string; text: string }) => {
  await api.patch(`/todos/${_id}`, { text });
};

export const deleteTodo = async ({ _id }: { _id: string }) => {
  await api.delete(`/todos/${_id}`);
};
