import React from 'react';
import { styled } from 'styled-components';
import { RiHomeLine, RiHomeFill } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdPersonOutline, MdPerson } from "react-icons/md";
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // * pathname에 따라 아이콘 fill 여부 결정
  return (
    <Nav>
      <NavButton>
        {location.pathname === '' ? <RiHomeFill /> : <RiHomeLine />}
        <p>위스키</p>
      </NavButton>
      <NavButton>
        {location.pathname === '' ? <AiFillHeart /> : <AiOutlineHeart />}
        <p>바</p>
      </NavButton>
      <NavButton>
      {location.pathname === '' ? <MdPerson /> : <MdPersonOutline />}
        <p>마이페이지</p>
      </NavButton>
    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
  width: 360px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.1)  0 -3px 4px -1px;
  `

const NavButton = styled.button`
  width: 33%;
  line-height: 15px;
  background-color: transparent;
  color: #6C7072;
  :first-child {
    font-size: 26px;
  }
  :last-child {
    font-size: 12px;
  }
`