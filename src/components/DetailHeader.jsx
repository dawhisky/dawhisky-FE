import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import isLoginCheck from '../hook/isLoginCheck';
import { isWhiskyLike, isStoreLike } from '../api/like';
// ! [props]
// * 상세페이지에서 보이는 뒤로가기, 아이템명, 좋아요 버튼을 모아둔 Header
// * korname : 화면에서 보일 아이템 명
// * engname : 화면에서 보일 아이템의 영문명, 없으면 props 아예 안내려도 됨

const DetailHeader = ({ korname, engname, like, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const [loginStatus, setLoginStatus] = useState({
    login: false,
    userFlag: '',
  });
  const [likeStatus, setLikeStatus] = useState(() => like);

  const onBeforeClickHandler = () => navigate(-1);

  // * 로그인 여부 및 token값 확인
  useEffect(() => {
    const getToken = isLoginCheck();
    if (getToken !== null) {
      setLoginStatus({ login: true, userFlag: getToken.userFlag });
    }
  }, []);

  // * [위스키 좋아요] 좋아요 등록/취소 useMutation
  const isWhiskyLikeMutation = useMutation(isWhiskyLike, {
    onSuccess: () => setLikeStatus(!likeStatus),
  });

  // * [스토어 좋아요] 좋아요 등록/취소 useMutation
  const isStoreLikeMutation = useMutation(isStoreLike, {
    onSuccess: () => setLikeStatus(!likeStatus),
  });

  // * 로그인 구분에 따라 로그인 페이지 이동/좋아요 로직 처리
  const onLikeClickHandler = () => {
    if (!loginStatus.login) {
      alert(`로그인 후 좋아요 등록이 가능합니다.`);
      navigate(`/Login`);
    } else if (loginStatus.login && loginStatus.userFlag === 'user') {
      if (url.includes('/WhiskyDetail')) {
        isWhiskyLikeMutation.mutate(id);
      } else if (url.includes('/StoreDetail')) {
        isStoreLikeMutation.mutate(id);
      }
    }
  };

  return (
    <Header
      color={
        url.includes('/WhiskyDetail') || url.includes('/LikeList') || url.includes('/MyComment') ? 'black' : 'white'
      }
      flag={
        url.includes('/WhiskyDetail') || url.includes('/LikeList') || url.includes('/MyComment') ? 'whisky' : 'store'
      }
    >
      <LeftIcon onClick={onBeforeClickHandler} />
      <NameDiv flag={loginStatus.userFlag === 'store' ? 'store' : 'user'}>
        <p>{korname}</p>
        {!!engname && <span>{engname}</span>}
      </NameDiv>
      {url.includes('/LikeList') || (loginStatus.login && loginStatus.userFlag === 'store') ? (
        <NullDiv />
      ) : !likeStatus ? (
        <OutlineHeartIcon onClick={onLikeClickHandler} />
      ) : (
        <FillHeartIcon onClick={onLikeClickHandler} />
      )}
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
  width: ${(props) => (props.flag === 'store' ? '270px' : '230px')};
  padding-left: ${(props) => (props.flag === 'store' ? '20px' : '0px')};
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

const OutlineHeartIcon = styled(AiOutlineHeart)`
  font-size: 24px;
  cursor: pointer;
`;

const FillHeartIcon = styled(AiFillHeart)`
  font-size: 24px;
  cursor: pointer;
`;
