import React from 'react';
import { styled } from 'styled-components';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <BackgroundDiv>
      <ContainerDiv>
        <WrapMain>{children}</WrapMain>
        <Navbar />
      </ContainerDiv>
    </BackgroundDiv>
  );
};

export default Layout;

const BackgroundDiv = styled.div`
  // 배경화면 색상 임시 지정
  background-color: #f9f5f4;
`;

const ContainerDiv = styled.div`
  width: 360px;
  height: 100vh;
  margin: auto;
  position: relative;
  overflow-y: scroll;
  background-color: #ffffff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
`;

const WrapMain = styled.main`
  padding: 0px 16px 10px 16px;
`;
