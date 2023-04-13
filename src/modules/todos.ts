import { createAction, createReducer } from '@reduxjs/toolkit';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { isAxiosError } from 'axios';
import { startLoading, finishLoading } from './loading';
import * as todoAPI from '../api/todo';
import type { PutEffect, CallEffect } from 'redux-saga/effects';
import type { TodoCreateResponseType, TodoErrorType, TodoGetResponseType } from '../api/todo/todoAPI.type';
import type { AxiosResponse } from 'axios';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';

const GET_TODOS = 'todo/GET_TODOS';
const GET_TODOS_SUCCESS = 'todo/GET_TODOS_SUCCESS';
const GET_TODOS_FAILURE = 'todo/GET_TODOS_FAILURE';

const CREATE_TODO = 'todo/CREATE_TODO';
const CREATE_TODO_SUCCESS = 'todo/CREATE_TODO_SUCCESS';
const CREATE_TODO_FAILURE = 'todo/CREATE_TODO_FAILURE';

const UPDATE_CHECK_TODO = 'todo/UPDATE_CHECK_TODO';
const UPDATE_TEXT_TODO = 'todo/UPDATE_TEXT_TODO';
const UPDATE_TODO_SUCCESS = 'todo/UPDATE_TODO_SUCCESS';
const UPDATE_TODO_FAILURE = 'todo/UPDATE_TODO_FAILURE';

const DELETE_TODO = 'todo/DELETE_TODO';
const DELETE_TODO_SUCCESS = 'todo/DELETE_TODO_SUCCESS';
const DELETE_TODO_FAILURE = 'todo/DELETE_TODO_FAILURE';

export const changeInput = createAction<string>(CHANGE_INPUT);

export const getTodos = createAction(GET_TODOS);
export const getTodosSuccess = createAction<TodoGetResponseType[]>(GET_TODOS_SUCCESS);
export const getTodosFailure = createAction<TodoErrorType>(GET_TODOS_FAILURE);

export const createTodo = createAction<{ text: string; createdAt: Date; isCompleted: boolean }>(CREATE_TODO);
export const createTodoSuccess = createAction<TodoCreateResponseType>(CREATE_TODO_SUCCESS);
export const createTodoFailure = createAction<TodoErrorType>(CREATE_TODO_FAILURE);

export const updateCheckTodo = createAction<{ _id: string; isCompleted: boolean }>(UPDATE_CHECK_TODO);
export const updateTextTodo = createAction<{ _id: string; text: string }>(UPDATE_TEXT_TODO);
export const updateTodoSuccess = createAction(UPDATE_TODO_SUCCESS);
export const updateTodoFailure = createAction<TodoErrorType>(UPDATE_TODO_FAILURE);

export const deleteTodo = createAction<{ _id: string }>(DELETE_TODO);
export const deleteTodoSuccess = createAction(DELETE_TODO_SUCCESS);
export const deleteTodoFailure = createAction<TodoErrorType>(DELETE_TODO_FAILURE);

function* getTodosSaga(
  action: ReturnType<typeof getTodos>
): Generator<CallEffect<AxiosResponse<TodoGetResponseType[]>>> | PutEffect {
  yield put(startLoading(GET_TODOS));
  try {
    const res = yield call(todoAPI.getTodos);
    yield put(getTodosSuccess(res));
  } catch (e) {
    if (isAxiosError<TodoErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      yield alert(data.message);
      yield put(getTodosFailure(data));
    }
  } finally {
    yield put(finishLoading(GET_TODOS));
  }
}

function* createSaga(
  action: ReturnType<typeof createTodo>
): Generator<CallEffect<AxiosResponse<TodoCreateResponseType>>> | PutEffect {
  yield put(startLoading(CREATE_TODO));
  try {
    const res = yield call(todoAPI.createTodo, action.payload);
    yield put(createTodoSuccess(res));
  } catch (e) {
    if (isAxiosError<TodoErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      yield alert(data.message);
      yield put(createTodoFailure(data));
    }
  } finally {
    yield put(finishLoading(CREATE_TODO));
  }
}

function* updateCheckSaga(action: ReturnType<typeof updateCheckTodo>) {
  yield put(startLoading(UPDATE_CHECK_TODO));
  try {
    yield call(todoAPI.updateCheckTodo, action.payload);
    yield put(updateTodoSuccess());
  } catch (e) {
    if (isAxiosError<TodoErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      yield alert(data.message);
      yield put(updateTodoFailure(data));
    }
  } finally {
    yield put(finishLoading(UPDATE_CHECK_TODO));
  }
}

function* updateTextSaga(action: ReturnType<typeof updateTextTodo>) {
  yield put(startLoading(UPDATE_TEXT_TODO));
  try {
    yield call(todoAPI.updateTextTodo, action.payload);
    yield put(updateTodoSuccess());
  } catch (e) {
    if (isAxiosError<TodoErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      yield alert(data.message);
      yield put(updateTodoFailure(data));
    }
  } finally {
    yield put(finishLoading(UPDATE_TEXT_TODO));
  }
}

function* deleteSaga(action: ReturnType<typeof deleteTodo>) {
  yield put(startLoading(DELETE_TODO));
  try {
    yield call(todoAPI.deleteTodo, action.payload);
    yield put(deleteTodoSuccess());
  } catch (e) {
    if (isAxiosError<TodoErrorType>(e)) {
      const data = e.response?.data || { message: '알 수 없는 에러가 발생했습니다.' };
      yield alert(data.message);
      yield put(deleteTodoFailure(data));
    }
  } finally {
    yield put(finishLoading(DELETE_TODO));
  }
}

export function* todoSaga() {
  yield takeLatest(GET_TODOS, getTodosSaga);
  yield takeLatest(CREATE_TODO, createSaga);
  yield takeEvery(UPDATE_CHECK_TODO, updateCheckSaga);
  yield takeLatest(UPDATE_TEXT_TODO, updateTextSaga);
  yield takeLatest(DELETE_TODO, deleteSaga);
}

const initialState: {
  input: string;
  todos: TodoGetResponseType[];
  status: 'pending' | 'success' | 'rejected' | 'idle';
  error: string;
} = {
  input: '',
  todos: [],
  status: 'idle',
  error: '',
};

const todos = createReducer(initialState, builder => {
  builder
    .addCase(changeInput, (state, action) => ({
      ...state,
      input: action.payload,
    }))
    .addCase(getTodos, state => ({ ...state, status: 'pending' }))
    .addCase(getTodosSuccess, (state, action) => ({
      ...state,
      status: 'success',
      todos: state.todos.concat(action.payload),
    }))
    .addCase(getTodosFailure, (state, action) => ({
      ...state,
      status: 'rejected',
      error: action.payload.message,
    }))
    .addCase(createTodo, state => ({ ...state, status: 'pending' }))
    .addCase(createTodoSuccess, state => ({
      ...state,
      status: 'success',
    }))
    .addCase(createTodoFailure, (state, action) => ({
      ...state,
      status: 'rejected',
      error: action.payload.message,
    }))
    .addCase(updateCheckTodo, state => ({ ...state, status: 'pending' }))
    .addCase(updateTextTodo, state => ({ ...state, status: 'pending' }))
    .addCase(updateTodoSuccess, state => ({ ...state, status: 'success' }))
    .addCase(updateTodoFailure, (state, action) => ({
      ...state,
      status: 'rejected',
      error: action.payload.message,
    }))
    .addCase(deleteTodo, state => ({ ...state, status: 'pending' }))
    .addCase(deleteTodoSuccess, state => ({ ...state, status: 'success' }))
    .addCase(deleteTodoFailure, (state, action) => ({
      ...state,
      status: 'rejected',
      error: action.payload.message,
    }))
    .addDefaultCase(state => state);
});

export default todos;
