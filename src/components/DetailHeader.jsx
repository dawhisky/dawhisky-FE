import React from 'react';
import { styled } from 'styled-components';
import { BsChevronLeft } from 'react-icons/bs';
import LikeIcon from './LikeIcon';

const DetailHeader = ({ korname, engname }) => {
  // TODO Scroll 감지해서 Background에 color 넣기
  return (
    <Header>
      <LeftIcon />
      <NameDiv>
        <p>{korname}</p>
        {!!engname && <span>{engname}</span>}
      </NameDiv>
      <LikeIcon />
    </Header>
  );
};

export default DetailHeader;

const Header = styled.header`
  width: 330px;
  height: 60px;
  margin-top: 10px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  z-index: 0;
`;

const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  & p {
    font-size: 18px;
    font-weight: 600;
  }
  & span {
    font-size: 14px;
  }
`;

const LeftIcon = styled(BsChevronLeft)`
  font-size: 20px;
  cursor: pointer;
`;
