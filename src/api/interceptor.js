import axios from 'axios';

// * 요청을 보낼 서버 지정
const api = axios.create({
  // .env에 저장된 서버 경로를 불러옴
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

// * request interceptor
api.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem('authorization');
    const refreshToken = localStorage.getItem('refreshToken');

    // * eslint Assignment to property of function parameter 'config' 에러 임시 비활성화 처리
    if (authorization && refreshToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.authorization = `${authorization}`;
      // eslint-disable-next-line no-param-reassign
      config.headers.refreshToken = `${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// * response interceptor
api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        // 에러 처리 로직이 있다면 추가 작성
        throw err;
      });
  },
  (error) => {
    return Promise.reject(error).catch((err) => {
      // 에러 처리 로직이 있다면 추가 작성
      throw err;
    });
  },
);

export default api;
