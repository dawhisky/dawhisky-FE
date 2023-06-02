import axios from 'axios';

// 점주login api, method : post, url : /api/auth/login/store
const login = async (loginInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login/store`, loginInfo);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export default login;
