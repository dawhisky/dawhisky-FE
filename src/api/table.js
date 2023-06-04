import axios from 'axios';

// 테이블 조회api, method : get, url : /api/mypage/table/:store_id
const getTableInfo = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/mypage/table/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// 테이블 생성api, method : post, url : /api/mypage/store/table
const createTableInfo = async ({ token, editedSeatData }) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store/table`, editedSeatData, {
      headers: token,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// 테이블 수정api, method : put, url : /api/mypage/store/table
const editTableInfo = async ({ token, entireSeatData }) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store/table`, entireSeatData, {
      headers: token,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

// 테이블 삭제api, method : delete, url : /api/mypage/store/table
const deleteTableInfo = async ({ token }) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/mypage/store/table`, {
      headers: token,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export { getTableInfo, createTableInfo, editTableInfo, deleteTableInfo };
