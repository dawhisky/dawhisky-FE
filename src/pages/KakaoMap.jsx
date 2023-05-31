import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const { kakao } = window;

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });
  const { lat, lon } = coords;
  const mapContainerRef = useRef();

  // * 사용자 위치정보 허용했을 경우 해당 위도/경도 설정
  const approve = (position) => {
    const { latitude, longitude } = position.coords;
    setCoords({ lat: latitude, lon: longitude });
  };

  // * 사용자 위치정보 거절하거나 오류일 경우 을지로 3가 위도/경도 설정
  const reject = () => {
    const latitude = 37.566498652285;
    const longitude = 126.99209745028;
    setCoords({ lat: latitude, lon: longitude });
  };

  useEffect(() => {
    // TODO 일단 초기에 한 번만 값을 가져오는 것으로 설정,
    // TODO 추후 N분에 한 번씩 실시간 업데이트 할 수 있도록 Geolocation.watchPosition() 고려
    navigator.geolocation.getCurrentPosition(approve, reject);
  }, []);

  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      // 초기 중심 위치를 설정한다.
      const options = { center: new kakao.maps.LatLng(lat, lon), level: 3 };
      // 카카오 지도 객체를 생성하고, mapContainerRef의 current 속성을 이용해 지도를 컨테이너에 표시한다.
      // 이때, current 속성은 useRef로 생성한 ref 객체의 현재값이다.
      const kakaoMap = new kakao.maps.Map(mapContainerRef.current, options);
      // useState의 set함수를 이용해 map 상태를 업데이트한다. (map 변수에 카카오 지도 객체 저장)
      setMap(kakaoMap);
    }
  }, [lat, lon]);

  return (
    <MapSection>
      <MapDiv ref={mapContainerRef} />
    </MapSection>
  );
};

export default KakaoMap;

const MapSection = styled.section`
  width: 360px;
  height: 100vh;
  margin-left: -17px;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 94%;
`;
