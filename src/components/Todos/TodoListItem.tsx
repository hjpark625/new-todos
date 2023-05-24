import React, { useState, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPen, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import * as S from '@/components/Todos/styles/TodoListItem.styled';
import { useAppDispatch } from '@/modules';
import { changeEditInput, updateCheckTodo, updateTextTodo, deleteTodo } from '@/modules/todos';
import type { RootState } from '@/modules';
import type { TodoListItemProps } from '@/components/types/Todo.type';

function TodoListItem({ items }: TodoListItemProps) {
  const dispatch = useAppDispatch();
  const { text, isCompleted, _id } = items;
  const [isEdit, setIsEdit] = useState(false);

  const editTodo = useSelector((state: RootState) => state.todos.editInput);

  const editRef = useRef<HTMLInputElement | null>(null);
  useLayoutEffect(() => {
    editRef.current !== null && editRef.current.focus();
  });

  const getDoneTodo = () => {
    try {
      dispatch(updateCheckTodo({ _id, isCompleted: !isCompleted }));
    } catch (e) {
      return e;
    }
  };

  const onDeleteTodo = () => {
    try {
      dispatch(deleteTodo({ _id }));
    } catch (e) {
      return e;
    }
  };

  const saveEditTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEditInput(e.target.value));
  };

  const editSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(updateTextTodo({ _id, text: editTodo }));
    } catch (e) {
      return e;
    } finally {
      dispatch(changeEditInput(''));
    }
    setIsEdit(false);
  };

  // TODO: 클릭 이벤트 발생 시, isEdit 상태를 false로 변경하는 기능 구현
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     console.log(editRef.current);
  //     console.log(editRef.current?.contains(e.target as Node));
  //     console.log(e.target);
  //     if (editRef.current && editRef.current.contains(e.target as Node)) {
  //       setIsEdit(false);
  //     }
  //   };
  //   window.addEventListener('click', handleClickOutside);
  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, [editRef, isEdit]);

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
            placeholder={text}
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
          onDeleteTodo();
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </S.Remove>
    </S.TodoListItemWrapper>
  );
}

export default TodoListItem;
