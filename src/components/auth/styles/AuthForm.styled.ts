import styled, { css } from 'styled-components';
import palette from '../../../styles/palette';
import { ButtonStyledProps } from '../../types/Auth.type';

export const AuthFormWrapper = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: bolder;
  }
`;

export const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

export const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

export const ChangeAuthButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export const SubmitButton = styled.button<ButtonStyledProps>`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  margin-top: 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${({ cyan }) =>
    cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    ${({ disabled }) =>
    disabled &&
    css`
      background: ${palette.gray[4]};
      cursor: not-allowed;
      &:hover {
        background: ${palette.gray[4]};
      }
    `}
`;
