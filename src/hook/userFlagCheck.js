const UserFlagCheck = () => {
  const store = localStorage.getItem('store_id');
  const user = localStorage.getItem('user');
  let userFlag = '';

  if (user && !store) userFlag = 'user';
  else if (!user && store) userFlag = 'store';

  return userFlag;
};

export default UserFlagCheck;
