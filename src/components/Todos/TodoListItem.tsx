import React, { useState, useRef, useLayoutEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPen, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import * as S from './styles/TodoListItem.styled';
import type { TodoListItemProps } from '../types/Todo.type';

function TodoListItem({ items }: TodoListItemProps) {
  const { text, isCompleted, _id } = items;
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(text);

  const editRef = useRef<HTMLInputElement | null>(null);
  useLayoutEffect(() => {
    editRef.current !== null && editRef.current.focus();
  });

  const getDoneTodo = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/api/todos/${_id}`,
        {
          isCompleted: !isCompleted,
        },
        { withCredentials: true }
      );
    } catch (e) {
      alert('오류가 발생했습니다.');
    }
  };

  const deleteTodo = async () => {
    await axios.delete(`http://localhost:4000/api/todos/${_id}`, {
      withCredentials: true,
    });
  };

  const saveEditTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:4000/api/todos/${_id}`,
        {
          text: editTodo,
        },
        { withCredentials: true }
      );
    } catch (e) {
      alert('수정에 실패하였습니다.');
    }
    setIsEdit(false);
  };

  return (
    <S.TodoListItemWrapper>
      <S.CheckBox
        isCompleted={isCompleted}
        onClick={() => {
          getDoneTodo();
        }}
      >
        {isCompleted ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}
        {isEdit || <S.Text isCompleted={isCompleted}>{text}</S.Text>}
      </S.CheckBox>
      {isEdit && (
        <S.EditForm
          onSubmit={e => {
            editSubmit(e);
          }}
        >
          <S.EditInput
            type="text"
            value={editTodo}
            ref={editRef}
            onChange={e => {
              saveEditTodoText(e);
            }}
          />
        </S.EditForm>
      )}
      <S.Edit
        isCompleted={isCompleted}
        onClick={() => {
          setIsEdit(prev => !prev);
        }}
      >
        <FontAwesomeIcon icon={faPen} />
      </S.Edit>
      <S.Remove
        onClick={() => {
          deleteTodo();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </S.Remove>
    </S.TodoListItemWrapper>
  );
}

export default TodoListItem;
