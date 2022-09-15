import React from 'react';
import * as S from './styles/AuthTemplate.styled';

function AuthTemplate({ children }: { children: React.ReactElement }) {
  return (
    <S.AuthTemplateWrapper>
      <S.WhiteBox>
        <S.LogoArea>
          <span>WELCOME to Todo APP</span>
        </S.LogoArea>
        {children}
      </S.WhiteBox>
    </S.AuthTemplateWrapper>
  );
}

export default AuthTemplate;
