export interface AuthType {
  login: string;
  register: string;
}
export interface AuthFormProps {
  type: keyof AuthType;
}
export interface UserInfo {
  email: string;
  password: string;
}
export interface ButtonStyledProps {
  fullWidth: boolean | null;
  cyan: boolean | null;
  disabled?: boolean | null;
}
