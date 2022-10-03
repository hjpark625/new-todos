import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { set, ref } from 'firebase/database';
import { db } from '../../firebase';
import * as S from './styles/TodoInsert.styled';
import { changeInput } from '../../modules/todos';

interface StateProps {
  todos: {
    input: string;
  };
}

function TodoInsert({
  setTodoId,
  todoId,
}: {
  setTodoId: React.Dispatch<React.SetStateAction<number>>;
  todoId: number;
}) {
  const dispatch = useDispatch();
  const todoValue = useSelector((state: StateProps) => state.todos.input);

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
      await set(postDB, {
        id: todoId,
        text: todoValue,
        isCompleted: false,
      });
    } catch (err) {
      alert('작성에 실패하였습니다..');
      console.error(err);
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
