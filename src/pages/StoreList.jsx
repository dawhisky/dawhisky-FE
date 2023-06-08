import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import { MdOutlineGpsFixed } from 'react-icons/md';
import { Layout, SearchInput, Button, DetailList } from '../components';
import KakaoMap from './KakaoMap';
import { getStoreList } from '../api/store';

const StoreList = () => {
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [currentLocationToggle, setCurrentLocationToggle] = useState(false);
  const [toggleId, setToggleId] = useState(0);
  const [storeList, setStoreList] = useState([]);
  const [nearbyToggle, setNearbyToggle] = useState(false);

  const DEFAULT_LAT = 37.566498652285;
  const DEFAULT_LON = 126.99209745028;

  // * 사용자 위치정보 허용했을 경우
  const approve = (position) => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.coords.longitude, position.coords.latitude, (address) => {
      // 사용자의 위치가 서울 중구, 종로구가 아닐 경우 default 위도/경도 설정
      const getAddressName = address[0];
      if (
        getAddressName.region_1depth_name !== '서울' ||
        getAddressName.region_2depth_name !== '중구' ||
        getAddressName.region_2depth_name !== '종로구'
      ) {
        alert('현재 위스키바 조회는 서울시 중구, 서울시 종로구만 가능합니다.\n지도 위치를 서울시 중구로 이동합니다.');
        setCoords({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
      } else {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
      }
    });
  };

  // * 사용자 위치정보 거절하거나 오류일 경우 default 위도/경도 설정
  const reject = () => setCoords({ lat: DEFAULT_LAT, lon: DEFAULT_LON });

  // TODO 중간발표 후 로직 재구성하여 2차 스코프 때 해당 코드 다시 사용
  // * 현재 위치 버튼 클릭 시 currentLocationToggle true/false 값 변경
  // const onCurrentLocationClickHandler = () => setCurrentLocationToggle(!currentLocationToggle);

  // * [스토어 리스트] 조회 useMutation
  const getStoreListMutation = useMutation(getStoreList, {
    onSuccess: (response) => {
      setStoreList(response);
    },
  });

  // * [스토어 리스트] 조회
  const getStoreListHandler = () => getStoreListMutation.mutate();

  // * 목록 보기 toggle
  const isShowListHandler = () => setNearbyToggle(!nearbyToggle);

  // * 페이지가 처음 마운트될 때 실행할 함수
  useEffect(() => {
    // 1. 위치 정보 동의
    navigator.geolocation.getCurrentPosition(approve, reject);
    // 2. 가입된 위스키바 목록 전체 조회
    getStoreListHandler();
  }, []);

  // TODO 중간발표 후 로직 재구성하여 2차 스코프 때 해당 코드 다시 사용
  // * currentLocationToggle true/false값에 따라 현재 위치 GPS 추적 여부 변경
  // useEffect(() => {
  //   if (currentLocationToggle) {
  //     // 장치 위치가 변경될 때마다 위치 추적
  //     const watchId = navigator.geolocation.watchPosition(approve, reject);
  //     setToggleId(watchId);
  //   } else {
  //     // watchPosition 실행 중지
  //     navigator.geolocation.clearWatch(toggleId);
  //   }
  // }, [currentLocationToggle]);

  return (
    <Layout>
      <ListSection>
        <KakaoMap coords={coords} storelist={storeList} />
        <Button size={'small'} color={'white'} onClick={isShowListHandler}>
          목록 보기
        </Button>
        {/* TODO 중간발표 후 로직 재구성하여 2차 스코프 때 해당 코드 다시 사용 */}
        {/* <button type="button" onClick={onCurrentLocationClickHandler}>
          <MdOutlineGpsFixed />
        </button> */}
      </ListSection>

      {/* TODO BarNearByList.jsx로 컴포넌트 분리 or 한 페이지에서 진행? */}
      {nearbyToggle && (
        <>
          <BackgroundDiv onClick={isShowListHandler} position="Layout" />
          <NearbyListDiv>
            <p>주변 위스키바</p>
            <div>
              <DetailList type={'store'} list={storeList} />
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

export default StoreList;

const ListSection = styled.section`
  position: relative;
  & > div {
    position: absolute;
    top: 30px;
    z-index: 2;
  }
  & > button:nth-child(2) {
    position: absolute;
    z-index: 1;
    font-weight: 600;
  }
  /* TODO 중간발표 후 로직 재구성하여 2차 스코프 때 해당 코드 다시 사용 */
  /* & > button:last-child {
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
  } */
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
