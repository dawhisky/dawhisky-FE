import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Image from './Image';
import { whiskyColor, whiskyGray, barColor, barGray, mypageColor, mypageGray } from '../assets';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  // * 마이페이지 이동
  const onMagagePageClickHandler = () => {
    navigate(`/ManagePage`);
  };

  // * pathname에 따라 아이콘 fill 여부 결정
  return (
    <Nav>
      <NavButton onClick={() => navigate(`/`)}>
        {url === `/` || url.includes('/LikeList') || url.includes('/WhiskyDetail') ? (
          <>
            <Image
              width={'1.8rem'}
              height={'1.8rem'}
              borderradius={'none'}
              src={whiskyColor}
              alt={'네비게이션바 위스키 탭 선택된 이미지'}
            />
            <ColoredP>위스키</ColoredP>
          </>
        ) : (
          <>
            <Image
              width={'1.8rem'}
              height={'1.8rem'}
              borderradius={'none'}
              src={whiskyGray}
              alt={'네비게이션바 위스키탭 기본 이미지'}
            />
            <GrayP>위스키</GrayP>
          </>
        )}
      </NavButton>
      <NavButton onClick={() => navigate(`/StoreList`)}>
        {url.includes('/StoreList') || url.includes('/StoreDetail') ? (
          <>
            <Image
              width={'1.8rem'}
              height={'1.8rem'}
              borderradius={'none'}
              src={barColor}
              alt={'네비게이션바 바 탭 선택된 이미지'}
            />
            <ColoredP>바</ColoredP>
          </>
        ) : (
          <>
            <Image
              width={'1.8rem'}
              height={'1.8rem'}
              borderradius={'none'}
              src={barGray}
              alt={'네비게이션바 바 탭 기본 이미지'}
            />
            <GrayP>바</GrayP>
          </>
        )}
      </NavButton>
      <NavButton onClick={onMagagePageClickHandler}>
        {url.includes('/UserManagePage') || url.includes('/StoreManagePage') || url.includes('/MyComment') ? (
          <>
            <Image
              width={'1.8rem'}
              height={'1.8rem'}
              borderradius={'none'}
              src={mypageColor}
              alt={'네비게이션바 마이페이지 탭 선택된 이미지'}
            />
            <ColoredP>마이페이지</ColoredP>
          </>
        ) : (
          <>
            <Image
              width={'1.8rem'}
              height={'1.8rem'}
              borderradius={'none'}
              src={mypageGray}
              alt={'네비게이션바 마이페이지 탭 기본 이미지'}
            />
            <GrayP>마이페이지</GrayP>
          </>
        )}
      </NavButton>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  width: 22.5rem;
  height: 3.75rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(0, 0, 0, 0.1) 0 -3px 4px -1px;
  z-index: 5;
`;

const NavButton = styled.button`
  width: 33%;
  line-height: 0.938rem;
  background-color: transparent;
  cursor: pointer;
  :first-child {
    margin-top: 0.188rem;
  }
  :last-child {
    font-size: 0.75rem;
    margin-top: 0.063rem;
  }
`;

const ColoredP = styled.p`
  color: ${({ theme }) => theme.colors.darkBrown};
  font-weight: 700;
`;

const GrayP = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
`;
