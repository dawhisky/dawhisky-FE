const isLoginCheck = () => {
  const authorization = localStorage.getItem('authorization');
  const refreshtoken = localStorage.getItem('refreshToken');
  const store = localStorage.getItem('store');
  const user = localStorage.getItem('user');

  if (authorization && !refreshtoken) {
    // refreshtoken 만료 시 재 요청 로직 구성
    return null;
  }

  if (!authorization && !refreshtoken) {
    return null;
  }

  return { authorization, refreshtoken, store, user };
};

export default isLoginCheck;
