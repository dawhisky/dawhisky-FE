import api from './interceptor';

// 유저정보조회api, method : get, url : /api/mypage/user
const getUserInfo = () => {
  return api
    .get(`/api/mypage/user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export default getUserInfo;
