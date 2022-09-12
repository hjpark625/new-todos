export interface TextMap {
  login: string;
  register: string;
}
export interface AuthFormProps {
  type: keyof TextMap;
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
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
