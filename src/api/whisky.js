import api from './interceptor';

// * 위스키 리스트 전체 조회
export const getWhiskyList = ({ page, pageSize, like, country, type, region }) => {
  return api
    .get(`/api/whisky/?page=${page}&pageSize=${pageSize}&like=${like}&country=${country}&type=${type}&region=${region}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 입문자 추천 리스트 전체 조회
export const getBeginnerWhiskyList = () => {
  return api
    .get(`/api/whisky/beginner`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 위스키 인기검색 조회
export const getTrendingList = () => {
  return api
    .get(`/api/whisky/trending`)
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
    .get(`/api/whisky/store/${id}`)
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
