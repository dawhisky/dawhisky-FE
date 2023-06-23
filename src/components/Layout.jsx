import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { bgFram, bgLogo } from '../assets';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <BackgroundDiv>
      <LogoImg src={bgLogo} alt={'DA WHISKY 로고'} onClick={() => navigate(`/`)} />
      <ContainerDiv>
        <WrapMain>{children}</WrapMain>
        <Navbar />
      </ContainerDiv>
    </BackgroundDiv>
  );
};

export default Layout;

const BackgroundDiv = styled.div`
  height: ${window.innerHeight}px;
  background-image: url(${bgFram});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  @media (max-width: 1250px) {
    & > img {
      width: 235px;
    }
  }
  @media (max-width: 1050px) {
    & > img {
      width: 190px;
    }
  }
  @media (max-width: 900px) {
    & > img {
      display: none;
    }
  }
`;

const LogoImg = styled.img`
  width: 335px;
  position: absolute;
  top: 45px;
  left: 60px;
  cursor: pointer;
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
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const WrapMain = styled.main`
  padding: 0 1rem 1.875rem 1rem;
  margin-bottom: 2.5rem;
`;
