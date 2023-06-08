const isLoginCheck = () => {
  const authorization = localStorage.getItem('authorization');
  const refreshToken = localStorage.getItem('refreshToken');
  const store = localStorage.getItem('store_id');
  const user = localStorage.getItem('user');

  if (authorization && !refreshToken) {
    // refreshToken 만료 시 재 요청 로직 구성
    return null;
  }

  if (!authorization && !refreshToken) {
    return null;
  }

  return { authorization, refreshToken, store, user };
};

export default isLoginCheck;
