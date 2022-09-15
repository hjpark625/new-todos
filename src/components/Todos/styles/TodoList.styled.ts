import styled from 'styled-components';
import palette from '../../../styles/palette';

export const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

export const EmptyTodos = styled.div`
  text-align: center;
  margin-top: 8rem;
  color: ${palette.gray[5]};
  font-size: 2rem;
`;
