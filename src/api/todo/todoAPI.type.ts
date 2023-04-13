export interface TodoCreateResponseType {
  text: string;
  isCompleted: boolean;
  createdAt: string;
  user: {
    _id: string;
    email: string;
  };
  _id: string;
  __v: number;
}

export interface TodoGetResponseType extends TodoCreateResponseType {}

export interface TodoErrorType {
  message: string;
}
