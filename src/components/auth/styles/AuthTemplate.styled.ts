import styled from 'styled-components';

export const AuthTemplateWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoArea = styled.div`
  display: block;
  padding-bottom: 2rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;
