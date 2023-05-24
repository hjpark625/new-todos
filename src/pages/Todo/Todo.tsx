import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TodoTemplate from '@/components/Todos/TodoTemplate';
import TodoInsert from '@/components/Todos/TodoInsert';
import TodoList from '@/components/Todos/TodoList';
import { getTodos } from '@/modules/todos';
import { useAppDispatch } from '@/modules';
import type { RootState } from '@/modules';

function Todo() {
  const dispatch = useAppDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  const checkToken = () => {
    !token && navigate('/');
  };

  const getDatas = async () => {
    try {
      return dispatch(getTodos());
    } catch (e) {
      return e;
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
