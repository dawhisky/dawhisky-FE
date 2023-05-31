import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import LikeIcon from './LikeIcon';

const DetailHeader = ({ korname, engname }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const onBeforeClickHandler = () => navigate(-1);

  // TODO Scroll 감지해서 Background에 color 넣기
  return (
    <Header>
      <LeftIcon onClick={onBeforeClickHandler} />
      <NameDiv>
        <p>{korname}</p>
        {!!engname && <span>{engname}</span>}
      </NameDiv>
      {url !== '/LikeList' ? <LikeIcon /> : <NullDiv />}
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
  z-index: 1;
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

const NullDiv = styled.div`
  width: 20px;
  height: 20px;
`;
