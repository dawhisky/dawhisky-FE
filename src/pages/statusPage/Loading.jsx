import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { bottle } from '../../assets';

const Loading = () => {
  const [isShow, setIsShow] = useState(false);

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  useEffect(() => {
    const showLoading = async () => {
      await delay(2000);
      if (isShow) {
        setIsShow(false);
      } else {
        setIsShow(true);
      }
    };

    showLoading();
  }, [isShow]);

  return (
    <BackgroundDiv>
      <LoadingDiv>
        <CircleDiv>
          {!isShow && <BottleImg src={bottle} alt={'로딩 아이콘'} />}
          {isShow && <BottleImg src={bottle} alt={'로딩 아이콘'} />}
        </CircleDiv>
        <CircleDiv>
          {isShow && <BottleImg src={bottle} alt={'로딩 아이콘'} />}
          {!isShow && <BottleImg src={bottle} alt={'로딩 아이콘'} />}
        </CircleDiv>
        <CircleDiv>
          {!isShow && <BottleImg src={bottle} alt={'로딩 아이콘'} />}
          {isShow && <BottleImg src={bottle} alt={'로딩 아이콘'} />}
        </CircleDiv>
      </LoadingDiv>
    </BackgroundDiv>
  );
};

export default Loading;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 6;
`;

const LoadingDiv = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const CircleDiv = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 50%;
  position: relative;
`;

const bounceOnce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
`;

const BottleImg = styled.img`
  position: absolute;
  bottom: 17px;
  left: 13px;
  animation: ${bounceOnce} 0.6s ease-in-out;
`;
