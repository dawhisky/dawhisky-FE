import axios from 'axios';

// 테이블 생성api, method : post, url : /api/mypage/store/table
const editTable = async ({ token, editedSeatData }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store/table`, editedSeatData, {
      headers: token,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export default editTable;
