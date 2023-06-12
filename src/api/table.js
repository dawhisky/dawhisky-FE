import api from './interceptor';

// 테이블 조회api, method : get, url : /api/mypage/table/:store_id
export const getTableInfo = (storeId) => {
  return api
    .get(`/api/mypage/table/${storeId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 테이블 생성api, method : post, url : /api/mypage/store/table
export const createTableInfo = ({ editedSeatData }) => {
  return api
    .post(`/api/mypage/store/table`, editedSeatData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 테이블 수정api, method : put, url : /api/mypage/store/table
export const editTableInfo = ({ editedSeatData }) => {
  return api
    .put(`/api/mypage/store/table`, editedSeatData)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 테이블 삭제api, method : delete, url : /api/mypage/store/table
export const deleteTableInfo = () => {
  return api
    .delete(`/api/mypage/store/table`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
