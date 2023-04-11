import { createAction, createReducer } from '@reduxjs/toolkit';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction<string>(START_LOADING);
export const finishLoading = createAction<string>(FINISH_LOADING);

const initialState = {};

const loading = createReducer(initialState, builder => {
  builder
    .addCase(startLoading, (state, { payload }) => ({
      ...state,
      [payload]: true,
    }))
    .addCase(finishLoading, (state, { payload }) => ({
      ...state,
      [payload]: false,
    }))
    .addDefaultCase(state => state);
});

export default loading;
