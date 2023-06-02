import axios from 'axios';

// 스토어 테이블 생성API, method : post, url : /api/mypage/store/table
const editTable = async (tableInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store/table`, tableInfo);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default editTable;
