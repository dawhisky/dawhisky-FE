import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
    localStorage.removeItem('authorization');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('store_id');
    const updatedResult = { ...result };
    updatedResult.msg = '로그인 정보가 유효하지 않습니다. 다시 로그인을 진행해주세요.';
    return updatedResult;
  }

  return { ...result };
};

// * PrivateRoute 검증
const PrivateRoute = ({ category, element }) => {
  const { userFlag, msg } = isAuthenticated();

  // ManagePage 진입할 경우
  if (userFlag !== '' && msg === '' && element.type.name === 'ManagePage') {
    return element;
  }

  // 로그인 정보는 있으나 해당 정보가 유효하지 않을 경우
  if (msg !== '') {
    alert(msg);
    return <Navigate to={'/Login'} replace />;
  }

  // 로그인 정보와 해당 페이지 진입 조건이 일치할 경우
  if (userFlag !== '' && category === userFlag) {
    return element;
  }

  // 로그인 정보와 해당 페이지 진입 조건이 불일치할 경우
  if (userFlag !== '' && category && category !== userFlag) {
    alert(`접근 권한이 없습니다. 메인페이지로 이동합니다.`);
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
          <Route path={'/ManagePage/*'} element={<PrivateRoute element={<ManagePage />} />}>
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

          {/* route error */}
          <Route path={'*'} element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
