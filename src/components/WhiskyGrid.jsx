import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import LikeIcon from './LikeIcon';
import Image from './Image';

// TODO 추후 response로 list값 props로 내려받으면 map처리할 수 있도록 작업 예정

const WhiskyGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const onWhiskyClickHandler = () => {
    if (url === `/UserManagePage`) {
      navigate(`/MyComment`);
    } else if (url === `/LikeList`) {
      navigate(`/WhiskyDetail`);
    }
  };

  return (
    <WhiskyListSection>
      <WhiskyDataDiv onClick={onWhiskyClickHandler}>
        <Image width={'155px'} height={'155px'} borderradius={'5px'} src={''} alt={''} />
        <h1>위스키 이름</h1>
        <div>
          <h3>Whisky name</h3>
          <h2>48% vol</h2>
        </div>
        <div>
          <LikeIcon />
        </div>
      </WhiskyDataDiv>
    </WhiskyListSection>
  );
};

export default WhiskyGrid;

const WhiskyListSection = styled.section`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-gap: 25px 15px;
`;

const WhiskyDataDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  & div {
    display: flex;
    justify-content: space-between;
  }
  &:nth-child(1) > div:last-child {
    position: absolute;
    top: 8px;
    right: 10px;
  }
  & h1 {
    width: 155px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
  }
  & h3 {
    width: 100px;
    font-size: 14px;
    line-height: 16px;
    color: #8f8f8f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
