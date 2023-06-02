import axios from 'axios';

// 회원가입API, method : post, url : /api/auth/signup/store
const signup = async (storeInfo) => {
  try {
    const response = await axios.post('http://jjmdev.site/api/auth/signup/store', storeInfo);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 사업자등록번호 유효성조회API, method : post
const checkBizNumber = async (bizNumber) => {
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

// 이메일 중복여부 검사API, method : post, url : /api/auth/checkEmail
const checkEmail = async (inputEmail) => {
  try {
    const response = await axios.post('http://jjmdev.site/api/auth/checkEmail', { email: inputEmail });

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

// 이메일 발송API, method : post, url : /api/auth/send

const sendEmail = async (inputEmail) => {
  try {
    const response = await axios.post('http://jjmdev.site/api/auth/send', { email: inputEmail });
    console.log(response);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { signup, checkBizNumber, checkEmail, sendEmail };
