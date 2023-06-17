import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { isWhiskyLike, isStoreLike } from '../api/like';

// ! [props]
// * 상세페이지에서 보이는 뒤로가기, 아이템명, 좋아요 버튼을 모아둔 Header
// * korname : 화면에서 보일 아이템 명
// * engname : 화면에서 보일 아이템의 영문명, 없으면 props 아예 안내려도 됨

const DetailHeader = ({ korname, engname, like, id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;
  const [userFlag, setUserFlag] = useState(localStorage.getItem('user'));
  const [likeStatus, setLikeStatus] = useState(false);

  // * 설정되어있는 좋아요가 있다면 세팅
  useEffect(() => {
    setLikeStatus(like);
  }, [like]);

  // * 이전 버튼 클릭
  const onBeforeClickHandler = () => navigate(-1);

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
    if (!userFlag) {
      toast.error(`로그인 후 좋아요 등록이 가능합니다.`);
      navigate(`/Login`);
    }
    if (url.includes('/WhiskyDetail')) {
      isWhiskyLikeMutation.mutate(id);
    } else if (url.includes('/StoreDetail')) {
      isStoreLikeMutation.mutate(id);
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
      <NameDiv flag={userFlag ? 'user' : 'store'}>
        <p>{korname}</p>
        {!!engname && <span>{engname}</span>}
      </NameDiv>
      {url.includes('/LikeList') || !userFlag ? (
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
  background: ${(props) =>
    props.flag === 'store'
      ? 'linear-gradient(rgba(200, 200, 200, 0.9), transparent)'
      : 'linear-gradient(rgba(200, 200, 200, 0.5), rgba(200, 200, 200, 0.3), transparent)'};
  width: 22.5rem;
  height: 4.375rem;
  padding: 0.625rem 1.25rem;
  margin-left: -1.063rem;
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
  gap: 0.25rem;
  & p {
    width: 100%;
    font-size: 1.125rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  & span {
    width: 100%;
    display: block;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

const LeftIcon = styled(BsChevronLeft)`
  font-size: 1.25rem;
  cursor: pointer;
`;

const NullDiv = styled.div`
  width: 1.25rem;
  height: 1.25rem;
`;

const OutlineHeartIcon = styled(AiOutlineHeart)`
  font-size: 1.5rem;
  cursor: pointer;
`;

const FillHeartIcon = styled(AiFillHeart)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
`;
