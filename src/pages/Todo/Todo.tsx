import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoTemplate from '../../components/Todos/TodoTemplate';
import TodoInsert from '../../components/Todos/TodoInsert';
import TodoList from '../../components/Todos/TodoList';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import type { TodoItem } from '../../components/types/Todo.type';

function Todo() {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);
  const [todoId, setTodoId] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem('uid');
  const storageTodoId = localStorage.getItem('todoId');

  const checkToken = () => {
    !token && navigate('/');
  };

  useEffect(() => {
    const todoRef = ref(db, `/todos/${token}`);
    onValue(todoRef, res => {
      setTodos(res.val());
      if (!res.val()) localStorage.removeItem('todoId');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkToken();
    if (storageTodoId) setTodoId(Math.round(parseInt(storageTodoId) + 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, storageTodoId]);

  return (
    <TodoTemplate>
      <TodoInsert setTodoId={setTodoId} todoId={todoId} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
}

export default Todo;
