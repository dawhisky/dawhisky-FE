import api from './interceptor';

// * 위스키 리스트 전체 조회
export const getWhiskyList = () => {
  return api
    .get(`/api/whisky/?page=1&pageSize=100`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 리스트 나라별 선택 조회
export const getWhiskyCountryList = (country) => {
  return api
    .get(`api/whisky/filter/${country}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 키워드 검색
export const getKeywordList = (keyword) => {
  return api
    .get(`/api/whisky/search/${keyword}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 디테일 조회
export const getWhiskyDetail = (id) => {
  return api
    .get(`/api/whisky/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 보유 스토어 조회
export const getWhiskyStore = (id) => {
  return api
    .get(`/api/whisky/comment/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 코멘트 조회
export const getWhiskyComment = (id) => {
  return api
    .get(`/api/whisky/comment/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
