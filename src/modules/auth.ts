import { createAction, createReducer } from '@reduxjs/toolkit';
import type { AuthType } from '../components/types/Auth.type';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const SET_AUTHTYPE = 'auth/SET_AUTHTYPE';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const changeField = createAction<{
  form: keyof AuthType;
  key: string;
  value: string;
}>(CHANGE_FIELD);

export const setAuthType = createAction<string>(SET_AUTHTYPE);

export const initializeForm = createAction<string>(INITIALIZE_FORM);

const initialState = {
  authType: 'login',
  register: {
    email: '',
    password: '',
  },
  login: {
    email: '',
    password: '',
  },
};

const auth = createReducer(initialState, builder => {
  builder
    .addCase(changeField, (state, { payload }) => ({
      ...state,
      [payload.form]: {
        ...state[payload.form],
        [payload.key]: payload.value,
      },
    }))
    .addCase(setAuthType, (state, { payload }) => ({
      ...state,
      authType: payload,
    }));
});

export default auth;
