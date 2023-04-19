import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { useDispatch } from 'react-redux';
import todos, { todoSaga } from './todos';
import auth, { authSaga } from './auth';
import loading from './loading';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ todos, auth, loading });

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([authSaga(), todoSaga()]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
