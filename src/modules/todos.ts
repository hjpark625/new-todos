import { createAction, createReducer } from '@reduxjs/toolkit';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';

export const changeInput = createAction<string>(CHANGE_INPUT);

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '',
      isCompleted: false,
    },
  ],
};

const todos = createReducer(initialState, builder => {
  builder.addCase(changeInput, (state, action) => ({
    ...state,
    input: action.payload,
  }));
});

export default todos;
