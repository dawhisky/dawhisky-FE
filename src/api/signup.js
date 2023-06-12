import axios from 'axios';
import api from './interceptor';

// 회원가입API, method : post, url : /api/auth/signup/store
export const signup = (storeInfo) => {
  return api
    .post(`/api/auth/signup/store`, storeInfo)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// 사업자등록번호 유효성조회API, method : post
export const checkBizNumber = async (bizNumber) => {
  try {
    const response = await axios.post(
      'https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=frtuyQqzKjh2a4PRBiPOpQfze7hYV7%2FaAXJnEBK7F68w7vWFHOaYmRhJAXc0EnxIG%2BZsThaWmfT44uD63zAfhw%3D%3D',
      { b_no: [bizNumber] },
    );
    return response.data.data[0].tax_type;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 이메일 발송API, method : post, url : /api/auth/send
export const sendEmail = (inputEmail) => {
  return api
    .post(`/api/auth/send`, { email: inputEmail })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
