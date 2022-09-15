import React, { useState } from 'react';
import { remove, ref, update } from 'firebase/database';
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPen, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { TodoProps } from '../types/Todo.type';
import * as S from './styles/TodoListItem.styled';

function TodoListItem({ items }: TodoProps) {
  const { text, isCompleted, id } = items;
  const [isDone, setIsDone] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);

  const [editTodo, setEditTodo] = useState(text);

  const token = localStorage.getItem('uid');

  const getDoneTodo = async () => {
    const doneRef = ref(db, `todos/${token}/${id}`);
    setIsDone(!isDone);
    await update(doneRef, {
      isCompleted: isDone,
    }).catch(err => {
      alert('오류가 발생했습니다.');
      console.error(err);
    });
  };

  const deleteTodo = async () => {
    const deleteRef = ref(db, `todos/${token}/${id}`);
    remove(deleteRef);
  };

  const saveEditTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editRef = ref(db, `todos/${token}/${id}`);
    await update(editRef, {
      text: editTodo,
    }).catch(err => {
      alert('수정 실패');
      console.error(err);
    });
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
        {isCompleted ? (
          <FontAwesomeIcon icon={faSquareCheck} />
        ) : (
          <FontAwesomeIcon icon={faSquare} />
        )}
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
