import TodoListItem from './TodoListItem';
import { TodosProps } from '../types/Todo.type';
import * as S from './styles/TodoList.styled';

function TodoList({ todos }: TodosProps) {
  return (
    <S.TodoListWrapper>
      {todos === null ? (
        <S.EmptyTodos>해야 할 일 들을 채워주세요!</S.EmptyTodos>
      ) : (
        todos.map(todo => <TodoListItem items={todo} key={todo.id} />)
      )}
    </S.TodoListWrapper>
  );
}

export default TodoList;
