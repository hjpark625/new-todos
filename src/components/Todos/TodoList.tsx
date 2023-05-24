import TodoListItem from '@/components/Todos/TodoListItem';
import * as S from '@/components/Todos/styles/TodoList.styled';
import type { TodoListProps } from '@/components/types/Todo.type';

function TodoList({ todos }: TodoListProps) {
  return (
    <S.TodoListWrapper>
      {todos === null || todos.length === 0 ? (
        <S.EmptyTodos>해야 할 일 들을 채워주세요!</S.EmptyTodos>
      ) : (
        todos.map(todo => <TodoListItem items={todo} key={todo._id} />)
      )}
    </S.TodoListWrapper>
  );
}

export default TodoList;
