import React from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Layout } from '../components';
import { userLogin } from '../api/login';

const AdminLogin = () => {
  const navigate = useNavigate();

  const loginApi = useMutation(userLogin, {
    onSuccess: ({ authorization, refreshToken, user, message }) => {
      localStorage.setItem('authorization', authorization);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', user);
      toast.success(message);
      navigate('/', { replace: true });
    },
    onError: (error) => {
      toast.error(error.response.data.errorMessage);
    },
  });

  const onLocalLoginHandler = (id) => {
    const setEmail = {
      email: `${id}@naver.com`,
    };
    loginApi.mutate(setEmail);
  };

  return (
    <Layout>
      <WrapDiv>
        <button type={'button'} onClick={() => onLocalLoginHandler('dev1')}>
          DEV 1
        </button>
        <button type={'button'} onClick={() => onLocalLoginHandler('dev2')}>
          DEV 2
        </button>
        <button type={'button'} onClick={() => onLocalLoginHandler('dev3')}>
          DEV 3
        </button>
      </WrapDiv>
    </Layout>
  );
};

export default AdminLogin;

const WrapDiv = styled.section`
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  button {
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    font-weight: 500;
    cursor: pointer;
  }
  :first-child {
    background-color: ${({ theme }) => theme.colors.mediumOrange};
  }
  :nth-child(2) {
    background-color: ${({ theme }) => theme.colors.orange};
  }
  :nth-child(3) {
    background-color: ${({ theme }) => theme.colors.lightBrown};
  }
`;
