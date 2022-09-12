import React from 'react';
import styled from 'styled-components';

function AuthTemplate({ children }: { children: React.ReactElement }) {
  return (
    <AuthTemplateWrapper>
      <WhiteBox>
        <LogoArea>
          <span>WELCOME to Todo APP</span>
        </LogoArea>
        {children}
      </WhiteBox>
    </AuthTemplateWrapper>
  );
}

export default AuthTemplate;

const AuthTemplateWrapper = styled.div`
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

const LogoArea = styled.div`
  display: block;
  padding-bottom: 2rem;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
`;

const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;
