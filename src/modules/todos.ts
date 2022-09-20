// 액션 타입
const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const EDIT = 'todo/EDIT';

interface ActionType {
  type: string;
  input: string;
  todo: { id: number; text: string; isCompleted: boolean }[];
  id: number;
}

// 액션 생성 함수
export const changeInput = (input: string) => ({
  type: CHANGE_INPUT,
  input,
});

let id = 1;
export const insert = (text: string) => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    isCompleted: false,
  },
});

export const edit = (text: string, isCompleted: boolean) => ({
  type: EDIT,
  todo: {
    id,
    text,
    isCompleted,
  },
});

export interface IInitialState {
  input: string;
  todos: { id: number; text: string; isCompleted: boolean }[];
}

const initialState: IInitialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '',
      isCompleted: false,
    },
  ],
};

// 리듀서
function todos(state = initialState, action: ActionType) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
      };
    case EDIT:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default todos;
