import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPen, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import palette from '../../styles/palette';
import { TodoProps, StyleProps } from '../types/Todo.type';

function TodoListItem({ items, setTodos }: TodoProps) {
  const { todo, isCompleted, id } = items;
  const [isDone, setIsDone] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);

  const [editTodo, setEditTodo] = useState(todo);

  const token = localStorage.getItem('access_token');

  const getDoneTodo = async () => {
    setIsDone(prev => !prev);
  };

  const deleteTodo = async () => {};

  const saveEditTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <TodoListItemWrapper>
      <CheckBox
        isCompleted={isCompleted}
        onClick={() => {
          getDoneTodo();
        }}
      >
        {isCompleted ? (
          <FontAwesomeIcon icon={faSquareCheck} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
        {isEdit || <Text isCompleted={isCompleted}>{todo}</Text>}
      </CheckBox>
      {isEdit && (
        <EditForm
          onSubmit={e => {
            editSubmit(e);
          }}
        >
          <EditInput
            type="text"
            value={editTodo}
            onChange={e => {
              saveEditTodoText(e);
            }}
          />
        </EditForm>
      )}
      <Edit
        isCompleted={isCompleted}
        onClick={() => {
          setIsEdit(prev => !prev);
        }}
      >
        <FontAwesomeIcon icon={faPen} />
      </Edit>
      <Remove
        onClick={() => {
          deleteTodo();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Remove>
    </TodoListItemWrapper>
  );
}

export default TodoListItem;

const TodoListItemWrapper = styled.div`
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

const CheckBox = styled.div<StyleProps>`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
    color: ${({ isCompleted }) => (!isCompleted ? 'inherit' : '#22b8cf')};
  }
`;

const Text = styled.div<StyleProps>`
  margin-left: 0.5rem;
  flex: 1;

  color: ${({ isCompleted }) => (!isCompleted ? 'inherit' : '#adb5bd')};
  text-decoration: ${({ isCompleted }) =>
    !isCompleted ? 'none' : 'line-through'};
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  &:hover {
    color: #ff8787;
  }
`;

const Edit = styled.div<StyleProps>`
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

const EditForm = styled.form`
  position: absolute;
  left: 9%;
`;

const EditInput = styled.input`
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
