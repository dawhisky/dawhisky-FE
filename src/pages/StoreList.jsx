import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { styled, useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { MdOutlineGpsFixed } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setMapSelect, getMapSelect, getAddressSelect } from '../selectors/mapSelectSelector';
import { Layout, Button, DetailList } from '../components';
import KakaoMap from './KakaoMap';
import { getStoreList } from '../api/store';

const StoreList = () => {
  // * [react-select] options
  const statusOptions = [
    { value: { lat: 37.517186, lon: 127.04128 }, label: '강남구' },
    { value: { lat: 37.535804, lon: 127.132481 }, label: '강동구' },
    { value: { lat: 37.638052, lon: 127.025732 }, label: '강북구' },
    { value: { lat: 37.558598, lon: 126.837668 }, label: '강서구' },
    { value: { lat: 37.481247, lon: 126.952739 }, label: '관악구' },
    { value: { lat: 37.540693, lon: 127.07023 }, label: '광진구' },
    { value: { lat: 37.485266, lon: 126.901401 }, label: '구로구' },
    { value: { lat: 37.466613, lon: 126.889249 }, label: '금천구' },
    { value: { lat: 37.655128, lon: 127.061368 }, label: '노원구' },
    { value: { lat: 37.665833, lon: 127.049522 }, label: '도봉구' },
    { value: { lat: 37.580178, lon: 127.046835 }, label: '동대문구' },
    { value: { lat: 37.502834, lon: 126.94791 }, label: '동작구' },
    { value: { lat: 37.557192, lon: 126.925381 }, label: '마포구' },
    { value: { lat: 37.555134, lon: 126.936893 }, label: '서대문구' },
    { value: { lat: 37.504598, lon: 127.02506 }, label: '서초구' },
    { value: { lat: 37.547184, lon: 127.047367 }, label: '성동구' },
    { value: { lat: 37.592624, lon: 127.016403 }, label: '성북구' },
    { value: { lat: 37.510888, lon: 127.112655 }, label: '송파구' },
    { value: { lat: 37.524496, lon: 126.875181 }, label: '양천구' },
    { value: { lat: 37.52497, lon: 126.895951 }, label: '영등포구' },
    { value: { lat: 37.529849, lon: 126.964561 }, label: '용산구' },
    { value: { lat: 37.6190014, lon: 126.921008 }, label: '은평구' },
    { value: { lat: 37.571026, lon: 126.976669 }, label: '종로구' },
    { value: { lat: 37.566295, lon: 126.99191 }, label: '중구' },
    { value: { lat: 37.596362, lon: 127.085032 }, label: '중랑구' },
  ];

  // * [react-select] custom style
  const theme = useTheme();
  const selectStyle = {
    control: (styles) => {
      return {
        ...styles,
        border: `1px solid ${theme.colors.gray}`,
        boxShadow: 'none',
        fontSize: '15px',
        cursor: 'pointer',
        '&:hover': {
          border: `1px solid ${theme.colors.orange}`,
        },
      };
    },
    option: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? `${theme.colors.white}` : 'black',
      fontSize: '15px',
      fontWeight: isFocused ? '700' : '400',
      backgroundColor: isFocused ? `${theme.colors.orange}` : 'transparent',
      cursor: 'pointer',
    }),
    menuList: (styles) => ({
      ...styles,
      padding: '0',
      '&::-webkit-scrollbar': {
        width: '2px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.colors.gray}`,
      },
    }),
  };

  const getMapValue = useRecoilValue(getMapSelect);
  const getAddressValue = useRecoilValue(getAddressSelect);
  const setMapValue = useSetRecoilState(setMapSelect);
  const [selectStatus, setSelectStatus] = useState(statusOptions[getMapValue]);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const [currentLocationToggle, setCurrentLocationToggle] = useState(false);
  const [toggleId, setToggleId] = useState(0);
  const [storeList, setStoreList] = useState([]);
  const [nearbyToggle, setNearbyToggle] = useState(false);

  // * [위치 동의] 사용자 위치정보 허용했을 경우
  const approve = (position) => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(position.coords.longitude, position.coords.latitude, (address) => {
      // 사용자의 위치가 서울시가 아닐 경우 default 강남구로 설정
      const getAddressName = address[0];
      if (getAddressName.region_1depth_name !== '서울') {
        setSelectStatus(statusOptions[getMapValue]);
        setCoords({
          lat: statusOptions[getMapValue].value.lat,
          lon: statusOptions[getMapValue].value.lon,
        });
      } else {
        const userLoacation = statusOptions.find((option) => option.label === getAddressName.region_2depth_name);
        setSelectStatus(userLoacation);
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }
    });
  };

  // * [위치 동의] 사용자 위치정보 거절하거나 오류일 경우 default 위도/경도 설정
  const reject = () => {
    setCoords({
      lat: statusOptions[getMapValue].value.lat,
      lon: statusOptions[getMapValue].value.lon,
    });
  };

  // * [스토어 리스트] 위스키바 목록 보기 toggle
  const isShowListHandler = () => setNearbyToggle(!nearbyToggle);

  // * [스토어 리스트] 조회
  const { refetch } = useQuery('getStoreList', () => getStoreList(selectStatus.label), {
    onSuccess: (response) => {
      setStoreList(response);
      setCoords({ lat: selectStatus.value.lat, lon: selectStatus.value.lon });
    },
  });

  // * [스토어 리스트] 지도 이동해 구가 바뀔때마다 재조회
  useEffect(() => {
    if (getAddressValue) {
      const addressIdx = statusOptions.findIndex((i) => i.label === getAddressValue);
      setMapValue(addressIdx);
      setSelectStatus(statusOptions[addressIdx]);
      toast.success(`중심 위치를 ${getAddressValue}로 변경합니다.`);
    }
  }, [getAddressValue]);

  // * [스토어 리스트] select의 값이 바뀔때마다 재조회
  useEffect(() => {
    setMapValue(statusOptions.findIndex((i) => i.label === selectStatus.label));
    refetch();
  }, [selectStatus, currentLocationToggle]);

  // * [위치 동의] 페이지가 처음 마운트될 때 위치 정보 동의 실행
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);

  // * [실시간 위치] 현재 위치 버튼 클릭 시 currentLocationToggle true/false 값 변경
  const onCurrentLocationClickHandler = () => setCurrentLocationToggle(!currentLocationToggle);

  // * [실시간 위치] currentLocationToggle true/false값에 따라 현재 위치 GPS 추적 여부 변경
  useEffect(() => {
    if (currentLocationToggle) {
      // 장치 위치가 변경될 때마다 위치 추적
      const watchId = navigator.geolocation.watchPosition(approve, reject);
      setToggleId(watchId);
    } else {
      // watchPosition 실행 중지
      navigator.geolocation.clearWatch(toggleId);
    }
  }, [currentLocationToggle]);

  return (
    <Layout>
      <ListSection>
        <SelectWrapDiv>
          <StyledSelect
            defaultValue={selectStatus}
            value={selectStatus}
            onChange={setSelectStatus}
            options={statusOptions}
            isSearchable={false}
            styles={selectStyle}
          />
          <button type={'button'} size={'small'} onClick={isShowListHandler}>
            {'목록 보기'}
          </button>
        </SelectWrapDiv>
        <KakaoMap coords={coords} storelist={storeList} />
        <ButtonWrapDiv>
          <button type={'button'} onClick={onCurrentLocationClickHandler}>
            <UserGpsIcon gpsstatus={currentLocationToggle ? 'true' : ''} />
          </button>
        </ButtonWrapDiv>
      </ListSection>

      {nearbyToggle && (
        <>
          <BackgroundDiv onClick={isShowListHandler} position={'Layout'} />
          <NearbyListDiv>
            <p>{'주변 위스키바'}</p>
            <div>
              <DetailList type={'store'} list={storeList} />
            </div>
            <div>
              <Button onClick={isShowListHandler}>{'닫기'}</Button>
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
  }
`;

const SelectWrapDiv = styled.div`
  top: 30px;
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  z-index: 3;
  button {
    width: 100px;
    height: 38px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    box-shadow: 2px 2px 4px 3px rgba(0, 0, 0, 0.2);
  }
`;

const StyledSelect = styled(Select)`
  width: 150px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ButtonWrapDiv = styled.div`
  width: 100%;
  height: 100px;
  bottom: 0;
  display: flex;
  z-index: 2;
  & button {
    position: absolute;
    font-weight: 600;
  }
  & button:last-child {
    width: 40px;
    height: 40px;
    padding: 7px;
    bottom: 100px;
    right: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 23px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
  }
`;

const UserGpsIcon = styled(MdOutlineGpsFixed)`
  color: ${({ theme, gpsstatus }) => (gpsstatus === 'true' ? theme.colors.orange : '')};
`;

const BackgroundDiv = styled.div`
  ${(props) => props.position === 'Layout' && 'position: absolute;'}
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
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
    bottom: 0;
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
