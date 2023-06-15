import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from '../components';

const ManagePage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const store = localStorage.getItem('store_id');
  const [userFlag, setUserFlag] = useState('');

  useEffect(() => {
    if (!user && store) {
      setUserFlag('store');
    } else if (user && !store) {
      setUserFlag('user');
    } else {
      setUserFlag('');
    }
  }, [user, store]);

  useEffect(() => {
    if (userFlag) {
      navigate(`/ManagePage/${userFlag}`, { replace: true });
    }
  }, [userFlag, navigate]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ManagePage;
