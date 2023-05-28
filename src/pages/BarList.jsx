import React, { useState } from 'react';
import { styled } from 'styled-components';
import { MdOutlineGpsFixed } from 'react-icons/md';
import { Layout, SearchInput, Button, DetailList } from '../components';
import KakaoMap from './KakaoMap';

const BarList = () => {
  const [nearbyList, setNearbyList] = useState(false);
  const isShowListHandler = () => setNearbyList(!nearbyList);
  return (
    <Layout>
      <ListSection>
        <SearchInput searchtype={'before'} placeholder={'위스키 바를 검색해보세요!'} />
        <KakaoMap />
        <Button size={'small'} color={'white'} onClick={isShowListHandler}>
          목록 보기
        </Button>
        {/* TODO 클릭 시 Geolocation.watchPosition 적용? */}
        <button type="button">
          <MdOutlineGpsFixed />
        </button>
      </ListSection>

      {/* TODO BarNearByList.jsx로 컴포넌트 분리 or 한 페이지에서 진행? */}
      {nearbyList && (
        <>
          <BackgroundDiv onClick={isShowListHandler} position="Layout" />
          <NearbyListDiv>
            <p>주변 위스키바</p>
            <div>
              <DetailList />
            </div>
            <div>
              <Button onClick={isShowListHandler}>닫기</Button>
            </div>
          </NearbyListDiv>
        </>
      )}
    </Layout>
  );
};

export default BarList;

const ListSection = styled.section`
  position: relative;
  & > div {
    position: absolute;
    top: 30px;
    z-index: 2;
  }
  & > button:nth-child(3) {
    position: absolute;
    z-index: 1;
    font-weight: 600;
  }
  & > button:last-child {
    width: 40px;
    height: 40px;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 100px;
    right: 0px;
    background-color: #fff;
    font-size: 23px;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
  }
`;

const BackgroundDiv = styled.div`
  ${(props) => props.position === 'Layout' && 'position: absolute;'}
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const NearbyListDiv = styled.div`
  width: 360px;
  max-height: 400px;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px 12px 0 0;
  background-color: #fff;
  z-index: 3;
  height: ${(props) => `${props.height}px`};
  overflow-y: auto;
  animation: fadeInUp 0.7s;
  & p {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
  & > div {
    padding: 10px;
  }
  & > div > div {
    cursor: pointer;
  }
  & > div:last-child {
    height: 60px;
    position: relative;
  }
  & > div:last-child > button {
    position: absolute;
    bottom: 0px;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate(-50%, 100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;
