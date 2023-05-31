import React, { useState } from 'react';
import { styled } from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

// * 좋아요 버튼 공통 컴포넌트화
// * 클릭 시 좋아요 값 변화 및 API 연동 부분 추후 작업 예정

const LikeIcon = ({ ...rest }) => {
  // TODO props로 받은 true/false 값으로 useState 초기값 지정할 수 있는지 확인 필요
  const [toggleLike, setToggleLike] = useState(false);

  const onLikeClickHandler = (e) => {
    e.preventDefault();
    setToggleLike(!toggleLike);
  };

  return (
    <div>
      {!toggleLike ? (
        <OutlineHeartIcon onClick={onLikeClickHandler} {...rest} />
      ) : (
        <FillHeartIcon onClick={onLikeClickHandler} {...rest} />
      )}
    </div>
  );
};

export default LikeIcon;

const OutlineHeartIcon = styled(AiOutlineHeart)`
  font-size: 24px;
  cursor: pointer;
`;

const FillHeartIcon = styled(AiFillHeart)`
  font-size: 24px;
  cursor: pointer;
`;
