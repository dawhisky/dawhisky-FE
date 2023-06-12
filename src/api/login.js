import api from './interceptor';

// 점주login api, method : post, url : /api/auth/login/store
const login = (loginInfo) => {
  return api
    .post(`/api/auth/login/store`, loginInfo)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export default login;
