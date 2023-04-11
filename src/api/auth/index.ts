import api from '..';
import type { AxiosError, AxiosResponse } from 'axios';
import { AuthErrorType } from './authAPI.type';

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

// api.interceptors.response.use(
//   response => response,
//   (error: AxiosError<AuthErrorType>) => {
//     return alert(error.response?.data.message);
//   }
// );

export const login = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await api.post<AxiosResponse<AuthResponseType>>('/auth/login', { email, password });
  return data;
};

export const register = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await api.post<AxiosResponse<AuthResponseType>>('/auth/register', {
    email,
    password,
  });
  return data;
};

export const check = async () => {
  const { data } = await api.get<AxiosResponse<CheckResponseType>>('/auth/check');
  return data;
};
