import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoTemplate from '../../components/Todos/TodoTemplate';
import TodoInsert from '../../components/Todos/TodoInsert';
import TodoList from '../../components/Todos/TodoList';
import { query, collection, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import type { TodoItem } from '../../components/types/Todo.type';

function Todo() {
  const [todos, setTodos] = useState<TodoItem[] | null>(null);

  const navigate = useNavigate();

  const token = localStorage.getItem('access_token');

  const checkToken = () => {
    !token && navigate('/');
  };

  const getDatas = async () => {
    const q = query(collection(db, 'todos'), where('uid', '==', `${token}`));

    onSnapshot(q, querySnapshot => {
      const datas: TodoItem[] = [];
      querySnapshot.forEach(document => {
        const results = document.data() as TodoItem;
        datas.push({ ...results, id: document.id });
        datas.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
      });
      if (datas.every(user => user.uid === `${token}`)) {
        setTodos(datas);
      } else {
        setTodos(null);
      }
    });
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
