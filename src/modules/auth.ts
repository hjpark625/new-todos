import { createAction, createReducer } from '@reduxjs/toolkit';
import { CallEffect, PutEffect, call, put, takeLatest } from 'redux-saga/effects';
import { isAxiosError } from 'axios';
import * as authAPI from '../api/auth';
import { finishLoading, startLoading } from './loading';
import type { AxiosResponse } from 'axios';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthType } from '../components/types/Auth.type';
import type { AuthResponseType } from '../api/auth/authAPI.type';
import type { AuthErrorType } from '../api/auth/authAPI.type';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const SET_AUTHTYPE = 'auth/SET_AUTHTYPE';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

export const changeField = createAction<{
  form: keyof AuthType;
  key: string;
  value: string;
}>(CHANGE_FIELD);
export const setAuthType = createAction<string>(SET_AUTHTYPE);
export const initializeForm = createAction<string>(INITIALIZE_FORM);
export const register = createAction<{ email: string; password: string }>(REGISTER);
export const registerSuccess = createAction<AuthResponseType>(REGISTER_SUCCESS);
export const registerFailure = createAction<AuthErrorType>(REGISTER_FAILURE);
export const login = createAction<{ email: string; password: string }>(LOGIN);
export const loginSuccess = createAction<AuthResponseType>(LOGIN_SUCCESS);
export const loginFailure = createAction<AuthErrorType>(LOGIN_FAILURE);
export const logout = createAction(LOGOUT);
export const logoutSuccess = createAction(LOGOUT_SUCCESS);
export const logoutFailure = createAction(LOGOUT_FAILURE);

function* registerSaga(
  action: PayloadAction<{ email: string; password: string }>
):
  | Generator<CallEffect<AxiosResponse<AuthResponseType, any>>>
  | PutEffect<{ payload: undefined; type: 'auth/LOGIN_SUCCESS' }> {
  yield put(startLoading(REGISTER));
  try {
    const res = yield call(authAPI.register, action.payload);
    yield put(registerSuccess(res));
  } catch (e: unknown) {
    if (isAxiosError<AuthErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      yield alert(data.message);
      yield put(registerFailure(data));
    }
  } finally {
    yield put(finishLoading(REGISTER));
  }
}
function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>
):
  | Generator<CallEffect<AxiosResponse<AuthResponseType, any>>>
  | PutEffect<{ payload: undefined; type: 'auth/LOGIN_SUCCESS' }> {
  yield put(startLoading(LOGIN));
  try {
    const res = yield call(authAPI.login, action.payload);
    localStorage.setItem('access_token', res.user.access_token);
    alert(`어서오세요 ${res.user.info.username}님!`);
    yield put(loginSuccess(res));
  } catch (e: unknown) {
    if (isAxiosError<AuthErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      alert(data.message);
      yield put(loginFailure(data));
    }
  } finally {
    yield put(finishLoading(LOGIN));
  }
}

function* logoutSaga() {
  yield put(startLoading(LOGOUT));
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('access_token');
    alert('로그아웃 완료');
    yield put(logoutSuccess());
  } catch (e: unknown) {
    if (isAxiosError<AuthErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      alert(data.message);
      yield put(logoutFailure());
    }
  } finally {
    yield put(finishLoading(LOGOUT));
  }
}

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
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
  userInfo: {
    _id: '',
    email: '',
    username: '',
  },
  status: 'idle',
  error: '',
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
    }))
    .addCase(register, state => ({ ...state, status: 'pending' }))
    .addCase(registerSuccess, (state, { payload }) => ({
      ...state,
      status: 'success',
      userInfo: {
        _id: payload.user.info._id,
        email: payload.user.info.email,
        username: payload.user.info.username,
      },
    }))
    .addCase(registerFailure, (state, { payload }) => ({
      ...state,
      status: 'rejected',
      error: payload.message,
    }))
    .addCase(login, state => ({ ...state, status: 'pending' }))
    .addCase(loginSuccess, (state, { payload }) => ({
      ...state,
      status: 'success',
      userInfo: {
        _id: payload.user.info._id,
        email: payload.user.info.email,
        username: payload.user.info.username,
      },
    }))
    .addCase(loginFailure, (state, { payload }) => ({
      ...state,
      status: 'rejected',
      error: payload.message,
    }))
    .addDefaultCase(state => state);
});

export default auth;
