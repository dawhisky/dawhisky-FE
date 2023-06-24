import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { mapPoint } from '../assets';

// ! [props]
// * 사업장 상세정보나 위스키 상세정보를 보여주는 컴포넌트
// * info : 객체의 key-value 형태로 데이터를 넣어주면 해당 내용을 화면에 출력
// ex. const info = { 지역 : '아메리칸' }

const { kakao } = window;

const DetailInfo = ({ info }) => {
  const [markers, setMarkers] = useState(null);

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    // * 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // * storelist 주소를 지도에 마킹할 수 있도록 x, y값 변환
    if (info['주소']) {
      geocoder.addressSearch(info['주소'], (result, status) => {
        if (status === kakao.maps.services.Status.OK && result[0]) {
          setMarkers({ lat: result[0].y, lng: result[0].x });
        }
      });
    }
  }, [info]);

  const renderedInfo = Object.entries(info).map((item) => {
    return (
      <InfoDiv key={item[0]}>
        <InfoKeyDt>{item[0]}</InfoKeyDt>
        <InfoLine>{'|'}</InfoLine>
        <InfoValueDd>{item[1]}</InfoValueDd>
      </InfoDiv>
    );
  });

  return (
    <>
      <div>{renderedInfo}</div>
      {url.includes('/StoreDetail') && markers !== null && (
        <Map
          center={markers}
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '8px',
            marginTop: '30px',
          }}
          level={3}
        >
          <MapMarker position={markers} image={{ src: mapPoint, size: { width: 27, height: 27 } }} />
        </Map>
      )}
    </>
  );
};

export default DetailInfo;

const InfoDiv = styled.div`
  display: flex;
  padding: 0 10px;
  margin-bottom: 1.25rem;
`;

const InfoKeyDt = styled.dt`
  width: 5rem;
  font-weight: 600;
`;

const InfoLine = styled.dd`
  width: 0.625rem;
  margin-right: 0.625rem;
  font-weight: 500;
`;

const InfoValueDd = styled.dd`
  width: calc(100% - 5.625rem);
  white-space: wrap;
  text-align: justify;
`;
