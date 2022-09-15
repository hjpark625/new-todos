// 액션 타입
const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

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

export const toggle = (id: number) => ({
  type: TOGGLE,
  id,
});

export const remove = (id: number) => ({
  type: REMOVE,
  id,
});

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
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    default:
      return state;
  }
}

export default todos;
