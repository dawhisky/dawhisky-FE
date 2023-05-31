import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import LikeIcon from './LikeIcon';

// ! [props]
// * 상세페이지에서 보이는 뒤로가기, 아이템명, 좋아요 버튼을 모아둔 Header
// * korname : 화면에서 보일 아이템 명
// * engname : 화면에서 보일 아이템의 영문명, 없으면 props 아예 안내려도 됨

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