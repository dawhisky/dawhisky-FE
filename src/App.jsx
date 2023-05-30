import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  WhiskyList,
  WhiskyDetail,
  BarList,
  BarDetail,
  Signup,
  Login,
  StoreManagePage,
  LikeList,
  UserManagePage,
  MyComment,
  SelectWhisky,
} from './pages/index';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WhiskyList />} />
          <Route path="/WhiskyDetail" element={<WhiskyDetail />} />
          <Route path="/BarList" element={<BarList />} />
          <Route path="/BarDetail" element={<BarDetail />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/StoreManagePage" element={<StoreManagePage />} />
          <Route path="/LikeList" element={<LikeList />} />
          <Route path="/UserManagePage" element={<UserManagePage />} />
          <Route path="/MyComment" element={<MyComment />} />
          <Route path="/SelectWhisky" element={<SelectWhisky />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
