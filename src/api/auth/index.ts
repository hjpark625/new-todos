import api from '..';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await api.post('/auth/login', { email, password });
};

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await api.post('/auth/register', { email, password });
};

export const check = async () => {
  await api.get('/auth/check');
};
