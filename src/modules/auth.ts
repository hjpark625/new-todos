const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

interface IChangeField {
  form: string;
  key: string;
  value: string;
}

interface IAction {
  type: string;
  form: 'register' | 'login';
  key: string;
  value: string;
  auth: string;
}

export const changeField = ({ form, key, value }: IChangeField) => ({
  type: CHANGE_FIELD,
  form,
  key,
  value,
});

export const initializeForm = (form: string) => ({
  type: INITIALIZE_FORM,
  form,
});

export interface RootState {
  register: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
}

const initialState: RootState = {
  register: {
    email: '',
    password: '',
  },
  login: {
    email: '',
    password: '',
  },
};

function auth(state = initialState, action: IAction) {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        [action.form]: { ...state[action.form], [action.key]: action.value },
      };

    default:
      return state;
  }
}

export default auth;
