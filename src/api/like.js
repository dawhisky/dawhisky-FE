import api from './interceptor';

// * 위스키 좋아요 등록/취소
export const isWhiskyLike = (id) => {
  return api
    .put(`/api/like/whisky/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 스토어 좋아요 등록/취소
export const isStoreLike = (id) => {
  return api
    .put(`/api/like/store/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
