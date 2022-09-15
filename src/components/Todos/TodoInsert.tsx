import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { set, ref } from 'firebase/database';
import { db } from '../../firebase';
import * as S from './styles/TodoInsert.styled';

function TodoInsert({
  setTodoId,
  todoId,
}: {
  setTodoId: React.Dispatch<React.SetStateAction<number>>;
  todoId: number;
}) {
  const [todoValue, setTodoValue] = useState('');

  const token = localStorage.getItem('uid');

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const postDB = ref(db, `/todos/${token}/${todoId}`);
    e.preventDefault();
    setTodoId(prev => prev + 1);
    await set(postDB, {
      id: todoId,
      text: todoValue,
      isCompleted: false,
    });
    setTodoValue('');
  };

  return (
    <S.TodoInsertForm
      onSubmit={e => {
        onSubmit(e);
      }}
    >
      <S.TodoInput
        placeholder="할 일을 입력하세요"
        value={todoValue}
        onChange={e => {
          getInputValue(e);
        }}
      />
      <S.AddButton type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </S.AddButton>
    </S.TodoInsertForm>
  );
}

export default TodoInsert;
