const isLoginCheck = () => {
  const authorization = localStorage.getItem('authorization');
  const refreshtoken = localStorage.getItem('refreshToken');

  if (authorization && !refreshtoken) {
    // refreshtoken 재 요청 로직 구성
    return null;
  }

  if (!authorization && !refreshtoken) {
    return null;
  }

  return { authorization, refreshtoken };
};

export default isLoginCheck;
