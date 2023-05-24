import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '@/modules/index';
import { changeInput, createTodo } from '@/modules/todos';
import * as S from '@/components/Todos/styles/TodoInsert.styled';
import type { RootState } from '@/modules/index';

function TodoInsert() {
  const dispatch = useAppDispatch();
  const todoValue = useSelector((state: RootState) => state.todos.input);

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeInput(value));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (todoValue.length === 0) return alert('내용을 입력해주세요');
      dispatch(createTodo({ text: todoValue, isCompleted: false, createdAt: new Date().toISOString() }));
    } catch (err) {
      return err;
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
