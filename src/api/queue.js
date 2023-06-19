import api from './interceptor';

// 점주 줄서기 조회api, method : get, url : /api/que
export const getQueueList = () => {
  return api
    .get(`/api/que/`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 내 줄서기 조회api, method : get, url : /api/que/:store_id
export const getMyQueue = (storeId) => {
  return api
    .get(`/api/que/${storeId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 줄서기 요청api, method : post, url : /api/que/:store_id
export const postMyQueue = ({ storeId, editedQueue }) => {
  return api
    .post(`/api/que/${storeId}`, editedQueue)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 줄서기 수정api, method : put, url : /api/que/:que_id
export const editMyQueue = ({ queId, editedQueue }) => {
  return api
    .put(`/api/que/${queId}`, editedQueue)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 줄서기 삭제api, method : delete, url : /api/que/:que_id
export const deleteMyQueue = (queId) => {
  return api
    .delete(`/api/que/${queId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 입장알림api, method : post, url : /api/auth/push
export const notifyEntrance = (queId) => {
  return api
    .post(`/api/auth/reservePush`, { que_id: queId })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// store측 줄서기 거절api, method : post, url : /api/auth/push
export const rejectEntrance = (queId) => {
  return api
    .post(`/api/auth/cancelPush`, { que_id: queId })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
