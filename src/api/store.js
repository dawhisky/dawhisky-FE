import api from './interceptor';

// * 스토어 리스트 전체 조회
export const getStoreList = (location) => {
  return api
    .get(`/api/map/store/${location}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 스토어에서 보유한 위스키 조회
export const getStoreWhiskyList = (storeId) => {
  return api
    .get(`/api/mypage/whisky/${storeId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
