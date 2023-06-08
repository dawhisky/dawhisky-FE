import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import LikeIcon from './LikeIcon';
import isLoginCheck from '../hook/isLoginCheck';

// ! [props]
// * 상세페이지에서 보이는 뒤로가기, 아이템명, 좋아요 버튼을 모아둔 Header
// * korname : 화면에서 보일 아이템 명
// * engname : 화면에서 보일 아이템의 영문명, 없으면 props 아예 안내려도 됨

const DetailHeader = ({ korname, engname, whiskylike }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const [loginStatus, setLoginStatus] = useState({
    login: false,
    userFlag: '',
  });

  const onBeforeClickHandler = () => navigate(-1);

  // * 로그인 여부 및 token값 확인
  useEffect(() => {
    const getToken = isLoginCheck();
    if (getToken !== null) {
      const { user } = getToken;
      if (user) {
        setLoginStatus({ login: true, userFlag: 'user' });
      } else {
        setLoginStatus({ login: true, userFlag: 'store' });
      }
    }
  }, []);

  // * 로그인 구분에 따라 유저/사업자 마이페이지 이동 처리
  const onLikeClickHandler = () => {
    if (!loginStatus.login) {
      alert(`로그인이 필요한 페이지입니다.`);
      navigate(`/Login`);
    } else if (loginStatus.login && loginStatus.userFlag === 'user') {
      navigate(`/UserManagePage`);
    } else {
      navigate(`/StoreManagePage`);
    }
  };

  return (
    <Header
      color={url.includes('/WhiskyDetail') ? 'black' : 'white'}
      flag={url.includes('/WhiskyDetail') ? 'whisky' : 'store'}
    >
      <LeftIcon onClick={onBeforeClickHandler} />
      <NameDiv>
        <p>{korname}</p>
        {!!engname && <span>{engname}</span>}
      </NameDiv>
      {url !== '/LikeList' ? <LikeIcon like={whiskylike} onClick={onLikeClickHandler} /> : <NullDiv />}
    </Header>
  );
};

export default DetailHeader;

const Header = styled.header`
  color: ${(props) => props.color};
  background: ${(props) => (props.flag === 'store' ? 'linear-gradient(rgba(90, 90, 90, 0.9), transparent)' : 'none')};
  width: 360px;
  height: 70px;
  padding: 10px 20px;
  margin-left: -17px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const NameDiv = styled.div`
  width: 230px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  & p {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  & span {
    width: 100%;
    display: block;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
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
