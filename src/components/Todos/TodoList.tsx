import TodoListItem from './TodoListItem';
import * as S from './styles/TodoList.styled';
import type { TodoListProps } from '../types/Todo.type';

function TodoList({ todos }: TodoListProps) {
  return (
    <S.TodoListWrapper>
      {todos === null || todos.length === 0 ? (
        <S.EmptyTodos>해야 할 일 들을 채워주세요!</S.EmptyTodos>
      ) : (
        todos.map(todo => <TodoListItem items={todo} key={todo.id} />)
      )}
    </S.TodoListWrapper>
  );
}

export default TodoList;
