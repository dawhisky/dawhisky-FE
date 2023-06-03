import React from 'react';
import { styled } from 'styled-components';
import { RiHomeLine, RiHomeFill } from 'react-icons/ri';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdPersonOutline, MdPerson } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

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
      {/* TODO 로그인한 유저 상태에 따라 UserManage로 넘길지 StoreManage로 넘길지 분기 처리 필요 */}
      <NavButton onClick={() => navigate(`/StoreManagePage`)}>
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
