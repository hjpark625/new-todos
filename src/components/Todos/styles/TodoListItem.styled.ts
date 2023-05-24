import styled from 'styled-components';
import palette from '@/styles/palette';
import type { StyleProps } from '@/components/types/Todo.type';

export const TodoListItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;
  &:nth-child(even) {
    background: #f8f9fa;
  }

  & + & {
    border-top: 1px solid ${palette.gray[3]};
  }
`;

export const CheckBox = styled.div<StyleProps>`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    color: ${({ isCompleted }) => (!isCompleted ? 'inherit' : '#22b8cf')};
  }
`;

export const Text = styled.div<StyleProps>`
  margin-left: 0.5rem;
  flex: 1;

  color: ${({ isCompleted }) => (!isCompleted ? 'inherit' : '#adb5bd')};
  text-decoration: ${({ isCompleted }) => (!isCompleted ? 'none' : 'line-through')};
`;

export const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

export const Edit = styled.div<StyleProps>`
  display: ${({ isCompleted }) => (isCompleted ? 'none' : 'flex')};
  margin-right: 1.5rem;
  align-items: center;
  font-size: 1.2rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  &:hover {
    color: ${palette.gray[4]};
  }
`;

export const EditForm = styled.form`
  position: absolute;
  left: 9%;
`;

export const EditInput = styled.input`
  width: 24rem;
  height: 2rem;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${palette.gray[5]};
  padding: 0.5rem;
  padding-left: 0;
  font-size: 1rem;
  color: ${palette.gray[6]};
  &:focus {
    outline: none;
  }
`;
