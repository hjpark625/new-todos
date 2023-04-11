import { createAction, createReducer } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../api/auth';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthType } from '../components/types/Auth.type';
import { finishLoading, startLoading } from './loading';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const SET_AUTHTYPE = 'auth/SET_AUTHTYPE';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const changeField = createAction<{
  form: keyof AuthType;
  key: string;
  value: string;
}>(CHANGE_FIELD);
export const setAuthType = createAction<string>(SET_AUTHTYPE);
export const initializeForm = createAction<string>(INITIALIZE_FORM);
export const register = createAction<{ email: string; password: string }>(
  REGISTER
);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction<{ error: string }>(
  REGISTER_FAILURE
);
export const login = createAction<{ email: string; password: string }>(LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginFailure = createAction<{ error: string }>(LOGIN_FAILURE);

function* registerSaga(
  action: PayloadAction<{ email: string; password: string }>
) {
  startLoading(REGISTER);
  try {
    yield call(authAPI.register, action.payload);
    yield put(registerSuccess());
  } catch (e: any) {
    yield put(registerFailure(e));
  } finally {
    finishLoading(REGISTER);
  }
}
function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>
) {
  startLoading(LOGIN);
  try {
    console.log(action.payload);
    yield call(authAPI.login, action.payload);
    yield put(loginSuccess());
  } catch (e: any) {
    yield put(loginFailure(e));
  } finally {
    finishLoading(LOGIN);
  }
}

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

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

const auth = createReducer(initialState, (builder) => {
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
    }))
    .addCase(register, (state) => ({
      ...state,
    }))
    .addCase(registerSuccess, (state) => state)
    .addCase(registerFailure, (state) => state)
    // .addCase(login, (state) => state)
    .addCase(loginSuccess, (state) => state)
    .addCase(loginFailure, (state) => state)
    .addDefaultCase((state) => state);
});

export default auth;
