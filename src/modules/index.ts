import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import todos from './todos';
import auth, { authSaga } from './auth';
import loading from './loading';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ todos, auth, loading });

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

export function* rootSaga() {
  yield all([authSaga()]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
