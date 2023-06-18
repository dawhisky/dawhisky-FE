import React from 'react';
import { styled } from 'styled-components';
import { bgFram } from '../assets';
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
  background-image: url(${bgFram});
  background-repeat: 'no-repeat';
  background-size: 'cover';
`;

const ContainerDiv = styled.div`
  width: 22.5rem;
  height: ${window.innerHeight}px;
  margin: auto;
  position: relative;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 18px -7px;
  &::-webkit-scrollbar {
    width: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

const WrapMain = styled.main`
  padding: 0 1rem 1.875rem 1rem;
  margin-bottom: 2.5rem;
`;
