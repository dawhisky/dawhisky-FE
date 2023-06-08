import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { RiHomeLine, RiHomeFill } from 'react-icons/ri';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdPersonOutline, MdPerson } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import isLoginCheck from '../hook/isLoginCheck';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const [loginStatus, setLoginStatus] = useState({
    login: false,
    userFlag: '',
  });

  // * 로그인 여부 및 token값 확인
  useEffect(() => {
    const getToken = isLoginCheck();
    if (getToken !== null) {
      setLoginStatus({ login: true, userFlag: getToken.userFlag });
    }
  }, []);

  // * 로그인 구분에 따라 유저/사업자 마이페이지 이동 처리
  const onMagagePageClickHandler = () => {
    if (!loginStatus.login) {
      alert(`로그인이 필요한 페이지입니다.`);
      navigate(`/Login`);
    } else if (loginStatus.login && loginStatus.userFlag === 'user') {
      navigate(`/UserManagePage`);
    } else {
      navigate(`/StoreManagePage`);
    }
  };

  // * pathname에 따라 아이콘 fill 여부 결정
  return (
    <Nav>
      <NavButton onClick={() => navigate(`/`)}>
        {url === `/` || url.includes('/LikeList') || url.includes('/WhiskyDetail') ? <RiHomeFill /> : <RiHomeLine />}
        <p>위스키</p>
      </NavButton>
      <NavButton onClick={() => navigate(`/StoreList`)}>
        {url.includes('/StoreList') || url.includes('/StoreDetail') ? <AiFillHeart /> : <AiOutlineHeart />}
        <p>바</p>
      </NavButton>
      <NavButton onClick={onMagagePageClickHandler}>
        {url.includes('/UserManagePage') || url.includes('/StoreManagePage') || url.includes('/MyComment') ? (
          <MdPerson />
        ) : (
          <MdPersonOutline />
        )}
        <p>마이페이지</p>
      </NavButton>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  width: 360px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 -3px 4px -1px;
  z-index: 5;
`;

const NavButton = styled.button`
  width: 33%;
  line-height: 15px;
  background-color: transparent;
  color: #6c7072;
  cursor: pointer;
  :first-child {
    font-size: 26px;
  }
  :last-child {
    font-size: 12px;
  }
`;
