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

// * 테스트 유저 계정 로컬 로그인
export const userLogin = (email) => {
  return api
    .post(`/api/auth/login/localUser`, email)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
