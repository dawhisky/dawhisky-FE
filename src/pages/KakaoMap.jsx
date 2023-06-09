import React, { useState, useEffect } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { styled } from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { setAddressSelect } from '../selectors/mapSelectSelector';
import { mapPoint } from '../assets';

// window.kakao 객체를 가져옴
const { kakao } = window;

const KakaoMap = ({ coords, storelist }) => {
  const [markers, setMarkers] = useState([]);
  const [mapMarkerId, setMapMarkerId] = useState(null);
  const setAddressValue = useSetRecoilState(setAddressSelect);

  // * 상세 페이지로 이동
  const navigate = useNavigate();
  const onOverlayClickHandler = (storeId) => navigate(`/StoreDetail/${storeId}`);

  // * 주소-좌표 변환 객체를 생성
  const geocoder = new kakao.maps.services.Geocoder();

  // * storelist 주소를 지도에 마킹할 수 있도록 x, y값 변환
  useEffect(() => {
    const fetchMarkerData = async () => {
      const addMarkers = [];

      const markerPromises = storelist.map((item) => {
        return new Promise((resolve) => {
          geocoder.addressSearch(item.address, (result, status) => {
            if (status === kakao.maps.services.Status.OK && result[0]) {
              addMarkers.push({
                position: {
                  lat: result[0].address.y,
                  lng: result[0].address.x,
                },
                content: item.store,
                id: item.store_id,
                isOverlayVisible: false,
              });
            }
            resolve();
          });
        });
      });

      await Promise.all(markerPromises);
      setMarkers(addMarkers);
    };

    fetchMarkerData();
  }, [storelist]);

  // * 업장 아이콘 클릭 시 overlay visible true/false
  const onMarkerClickHandler = (markerId) => {
    if (mapMarkerId !== markerId) {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === mapMarkerId && marker.isOverlayVisible
            ? { ...marker, isOverlayVisible: !marker.isOverlayVisible }
            : marker,
        ),
      );
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === markerId ? { ...marker, isOverlayVisible: !marker.isOverlayVisible } : marker,
        ),
      );
      setMapMarkerId(markerId);
    } else {
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.id === markerId ? { ...marker, isOverlayVisible: !marker.isOverlayVisible } : marker,
        ),
      );
      setMapMarkerId(markerId);
    }
  };

  // * 지도의 중심 위치를 변경했을 경우 해당 구 위스키바 조회
  const onIdleHandler = (map) => {
    const latlng = map.getCenter();
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (address) => {
      const getAddressName = address[0].address;
      if (getAddressName.region_1depth_name === '서울') {
        setAddressValue(getAddressName.region_2depth_name);
      } else {
        toast.error('현재 위스키바는 서울시 내 업장만 조회 가능합니다.');
      }
    });
  };

  return (
    <MapSection>
      <Map
        center={{
          lat: coords.lat,
          lng: coords.lon,
        }}
        style={{
          width: '100%',
          height: '100vh',
        }}
        level={5}
        onIdle={(map) => onIdleHandler(map)}
      >
        {markers &&
          markers.map((marker) => (
            <React.Fragment key={`marker_${marker.id}`}>
              <MapMarker
                position={marker.position}
                image={{
                  src: mapPoint,
                  size: {
                    width: 27,
                    height: 27,
                  },
                  options: {
                    offset: {
                      x: 15,
                      y: -7,
                    },
                  },
                }}
                onClick={() => onMarkerClickHandler(marker.id)}
              />
              {marker.isOverlayVisible && (
                <CustomOverlayMap
                  value={marker.isOverlayVisible}
                  position={marker.position}
                  yAnchor={1}
                  onClick={() => onMarkerClickHandler(marker.id)}
                >
                  <OverlayDiv onClick={() => onOverlayClickHandler(marker.id)}>
                    {marker.content}
                    <BiChevronRight />
                  </OverlayDiv>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
      </Map>
    </MapSection>
  );
};

export default KakaoMap;

const MapSection = styled.section`
  width: 360px;
  height: 100vh;
  margin-left: -17px;
`;

const OverlayDiv = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  border: 1px solid #ececec;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;
