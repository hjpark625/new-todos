import api from '@/api';
import type { AxiosResponse } from 'axios';
import type { AuthResponseType, CheckResponseType } from '@/api/auth/authAPI.type';

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

export const logout = async () => {
  await api.post('/auth/logout');
};

export const check = async () => {
  const { data } = await api.get<AxiosResponse<CheckResponseType>>('/auth/check');
  return data;
};
