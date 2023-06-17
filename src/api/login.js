import api from './interceptor';

// 점주login api, method : post, url : /api/auth/login/store
export const login = (loginInfo) => {
  return api
    .post(`/api/auth/login/store`, loginInfo)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 로그아웃
export const setLogout = (userFlag) => {
  return api
    .delete(`/api/auth/logout/${userFlag}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 회원탈퇴
export const setSignout = (userFlag) => {
  return api
    .delete(`/api/auth/signout/${userFlag}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
