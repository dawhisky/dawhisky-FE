import axios from 'axios';

// TODO 추후 로그인 인스턴스 생성되면 해당 파일로 연결

// * 위스키 리스트 전체 조회
export const getWhiskyList = () => {
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/whisky`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 키워드 검색
export const getKeywordList = (keyword) => {
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/whisky/search/${keyword}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
