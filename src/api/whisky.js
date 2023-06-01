import axios from 'axios';

// TODO 추후 로그인 인스턴스 생성되면 해당 파일로 연결

const getKeywordList = (keyword) => {
  return axios
    .get(`${process.env.REACT_APP_SERVER_URL}/api/whisky/search/${keyword}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export default getKeywordList;
