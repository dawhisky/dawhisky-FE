import axios from 'axios';

// 스토어 정보 조회api, method : get, url : /api/mypage/store/:store_id
const getStoreInfo = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// 스토어 정보 수정api, method : put, url : /api/mypage/store
const editStoreInfo = async ({ token, formData }) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store`, formData, {
      headers: token,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export { getStoreInfo, editStoreInfo };
