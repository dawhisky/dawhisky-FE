import api from './interceptor';

// 스토어정보 조회api, method : get, url : /api/mypage/store/:store_id
export const getStoreInfo = (id) => {
  return api
    .get(`/api/mypage/store/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 스토어 정보 수정api, method : put, url : /api/mypage/store
export const editStoreInfo = (formData) => {
  return api
    .put(`/api/mypage/store`, formData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
