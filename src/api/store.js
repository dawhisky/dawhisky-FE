import api from './interceptor';

// * 스토어 리스트 전체 조회
const getStoreList = () => {
  return api
    .get(`/api/map/store`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export default getStoreList;
