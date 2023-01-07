import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { set, ref } from 'firebase/database';
import { db } from '../../firebase';
import { changeInput } from '../../modules/todos';
import * as S from './styles/TodoInsert.styled';
import type { TodoInsertProps } from '../types/Todo.type';
import type { RootState, AppDispatch } from '../../modules/index';

function TodoInsert({ setTodoId, todoId }: TodoInsertProps) {
  const dispatch = useDispatch<AppDispatch>();
  const todoValue = useSelector((state: RootState) => state.todos.input);

  const token = localStorage.getItem('uid');

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeInput(value));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const postDB = ref(db, `/todos/${token}/${todoId}`);
      e.preventDefault();
      setTodoId(prev => prev + 1);
      if (todoValue.length === 0) return alert('내용을 입력해주세요');
      await set(postDB, {
        id: todoId,
        text: todoValue,
        isCompleted: false,
      });
      localStorage.setItem('todoId', `${todoId}`);
    } catch (err) {
      alert(`작성에 실패하였습니다.. ${err}`);
    } finally {
      dispatch(changeInput(''));
    }
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
