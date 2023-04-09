import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TodoTemplate from '../../components/Todos/TodoTemplate';
import TodoInsert from '../../components/Todos/TodoInsert';
import TodoList from '../../components/Todos/TodoList';
import type { TodoItem } from '../../components/types/Todo.type';

function Todo() {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);

  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  const checkToken = () => {
    !token && navigate('/');
  };

  const getDatas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/todos', {
        withCredentials: true,
      });
      const { data } = response;
      setTodos(data);
      return;
    } catch (e) {
      alert('데이터를 불러오는데 실패했습니다.');
      return console.log(e);
    }
  };

  useEffect(() => {
    checkToken();
    getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
}

export default Todo;
