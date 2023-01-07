import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todos from './todos';
import auth from './auth';

const rootReducer = combineReducers({ todos, auth });

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
