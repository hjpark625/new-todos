export interface AuthResponseType {
  user: {
    access_token: string;
    info: {
      __v: number;
      _id: string;
      email: string;
      registeredAt: Date;
      username: string;
    };
  };
}

export interface CheckResponseType {
  _id: string;
  email: string;
}

export interface AuthErrorType {
  message: string;
}
