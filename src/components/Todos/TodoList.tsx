import styled from 'styled-components';
import TodoListItem from './TodoListItem';
import palette from '../../styles/palette';
import { TodosProps } from '../types/Todo.type';

function TodoList({ todos, setTodos }: TodosProps) {
  return (
    <TodoListWrapper>
      {todos === null ? (
        <EmptyTodos>해야 할 일 들을 채워주세요!</EmptyTodos>
      ) : (
        todos.map(todo => <TodoListItem items={todo} key={todo.id} />)
      )}
    </TodoListWrapper>
  );
}

export default TodoList;

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const EmptyTodos = styled.div`
  text-align: center;
  margin-top: 8rem;
  color: ${palette.gray[5]};
  font-size: 2rem;
`;
