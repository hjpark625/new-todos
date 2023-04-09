import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { changeInput } from '../../modules/todos';
import * as S from './styles/TodoInsert.styled';
import type { RootState, AppDispatch } from '../../modules/index';

function TodoInsert() {
  const dispatch = useDispatch<AppDispatch>();
  const todoValue = useSelector((state: RootState) => state.todos.input);

  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeInput(value));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (todoValue.length === 0) return alert('내용을 입력해주세요');
      await axios.post(
        'http://localhost:4000/api/todos',
        {
          text: todoValue,
          isCompleted: false,
          createdAt: new Date(),
        },
        { withCredentials: true }
      );
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
