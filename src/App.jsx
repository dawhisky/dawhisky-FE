import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  WhiskyList,
  WhiskyDetail,
  StoreList,
  StoreDetail,
  Signup,
  Login,
  LoginOauth,
  StoreManagePage,
  LikeList,
  UserManagePage,
  MyComment,
  SelectWhisky,
  SearchPage,
  ManagePage,
  AdminLogin,
} from './pages/index';
import { NoMatch } from './pages/statusPage';

const queryClient = new QueryClient();

const isAuthenticated = () => {
  const authorization = localStorage.getItem('authorization');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');
  const store = localStorage.getItem('store_id');
  const result = {
    userFlag: '',
    msg: '',
  };

  if (!user && store) {
    result.userFlag = 'store';
  } else if (user && !store) {
    result.userFlag = 'user';
  }

  // 로그인 관련 모든 데이터가 존재할 경우
  if (result.userFlag && authorization && refreshToken) {
    return { ...result };
  }

  // 로그인 관련 데이터가 하나라도 없을 경우 기존 로그인 정보 삭제, 재로그인 진행
  if ((!result.userFlag && authorization && refreshToken) || (result.userFlag && (!authorization || !refreshToken))) {
    localStorage.clear();
    sessionStorage.clear();
    const updatedResult = { ...result };
    updatedResult.msg = '로그인 정보가 유효하지 않습니다. \n다시 로그인을 진행해주세요.';
    return updatedResult;
  }

  return { ...result };
};

// * PrivateRoute 검증
const PrivateRoute = ({ category, element, isManagePage }) => {
  const { userFlag, msg } = isAuthenticated();

  // ManagePage 진입할 경우
  if (userFlag !== '' && msg === '' && isManagePage === 'true') {
    return element;
  }

  // 로그인 정보는 있으나 해당 정보가 유효하지 않을 경우
  if (msg !== '') {
    toast.error(msg);
    return <Navigate to={'/Login'} replace />;
  }

  // 로그인 정보와 해당 페이지 진입 조건이 일치할 경우
  if (userFlag !== '' && category === userFlag) {
    return element;
  }

  // 로그인 정보와 해당 페이지 진입 조건이 불일치할 경우
  if (userFlag !== '' && category && category !== userFlag) {
    toast.error(`일반 유저만 사용 가능한 기능입니다. \n메인페이지로 이동합니다.`);
    return <Navigate to={'/'} replace />;
  }

  return <Navigate to={'/Login'} replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* PrivateRoute */}
          <Route path={'/ManagePage/*'} element={<PrivateRoute element={<ManagePage />} isManagePage={'true'} />}>
            <Route path={'user'} element={<PrivateRoute category={'user'} element={<UserManagePage />} />} />
            <Route path={'store'} element={<PrivateRoute category={'store'} element={<StoreManagePage />} />} />
          </Route>
          <Route path={'/LikeList'} element={<PrivateRoute category={'user'} element={<LikeList />} />} />
          <Route path={'/SelectWhisky'} element={<PrivateRoute category={'user'} element={<SelectWhisky />} />} />
          <Route path={'/MyComment/:id'} element={<PrivateRoute category={'user'} element={<MyComment />} />} />

          {/* PublicRoute */}
          <Route path={'/'} element={<WhiskyList />} />
          <Route path={'/Signup'} element={<Signup />} />
          <Route path={'/Login'} element={<Login />} />
          <Route path={'/LoginOauth'} element={<LoginOauth />} />
          <Route path={'/SearchPage'} element={<SearchPage />} />
          <Route path={'/WhiskyDetail/:id'} element={<WhiskyDetail />} />
          <Route path={'/StoreList'} element={<StoreList />} />
          <Route path={'/StoreDetail/:id'} element={<StoreDetail />} />

          {/* Temporary */}
          <Route path={'/AdminLogin'} element={<AdminLogin />} />

          {/* route error */}
          <Route path={'*'} element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
