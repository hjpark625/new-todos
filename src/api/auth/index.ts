import api from '..';
import type { AxiosResponse } from 'axios';
import type { AuthResponseType, CheckResponseType } from './authAPI.type';

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
