import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoTemplate from '../../components/Todos/TodoTemplate';
import TodoInsert from '../../components/Todos/TodoInsert';
import TodoList from '../../components/Todos/TodoList';

function Todo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  const checkToken = () => {
    !token && navigate('/');
  };

  useEffect(() => {
    // axios
    //   .get(API.CREATE_GET_TODO, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then(res => {
    //     setTodos(res.data);
    //   })
    //   .catch(err => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </TodoTemplate>
  );
}

export default Todo;
