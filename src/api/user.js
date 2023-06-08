import axios from 'axios';

// 유저정보조회api, method : get, url : /api/mypage/user
const getUserInfo = async ({ token }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mypage/user`, { headers: token });
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export default getUserInfo;
