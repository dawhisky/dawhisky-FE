import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { BiUserCircle } from 'react-icons/bi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsFillChatFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Layout, Button, Image } from '../../components';
import { login } from '../../api/login';
import { logo } from '../../assets';

const Login = () => {
  // 유저 유형 상태관리
  const [userRole, setUserRole] = useState('user');
  // 로그인 input 적합성
  const [isSuitable, setIsSuitable] = useState(false);

  // useNavigate hook 호출
  const navigate = useNavigate();

  // 카카오서비스 url
  const KAKAO_AUTH = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  // 소셜로그인 핸들러 함수
  const socialLogin = () => {
    if (userRole === 'user') {
      window.location.href = KAKAO_AUTH;
    } else {
      setUserRole('user');
    }
  };

  // input 입력값 상태관리
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });

  // input핸들러 함수
  const inputHandler = (e) => {
    if (e.target.dataset.type === 'email') {
      setLoginInput({ email: e.target.value, password: loginInput.password });
    } else {
      setLoginInput({ email: loginInput.email, password: e.target.value });
    }
  };

  // 사업자회원 로그인 입력값 적합성 검사
  useEffect(() => {
    if (
      loginInput.email.length > 0 &&
      loginInput.email.includes('@') &&
      loginInput.email.includes('.') &&
      loginInput.password.length > 0
    ) {
      setIsSuitable(true);
    } else {
      setIsSuitable(false);
    }
  }, [loginInput]);

  useEffect(() => {
    if (localStorage.getItem('user') || localStorage.getItem('store')) {
      toast.error('로그아웃 후에 진행해주세요');
      navigate('/');
    }
  }, []);

  // useMutation hook 로그인 api 성공시/실패시
  const loginApi = useMutation(login, {
    onSuccess: ({ authorization, refreshToken, store, message }) => {
      localStorage.setItem('authorization', authorization);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('store_id', store);
      toast.success(message);
      navigate('/ManagePage', { replace: true });
    },
    onError: (error) => {
      toast.error(error.response.data.errorMessage);
    },
  });

  // 로그인버튼 핸들러함수
  const loginButtonHandler = () => {
    loginApi.mutate(loginInput);
  };

  // 회원가입버튼 핸들러함수
  const signupButtonHandler = () => {
    toast.info('개인회원은 "카카오톡으로 시작하기" 버튼으로 회원가입 하실 수 있습니다.');
    navigate('/Signup');
  };

  return (
    <Layout>
      <LoginPageWrapper userrole={userRole} issuitable={isSuitable}>
        <LogoWrapper>
          <Image width={'10rem'} height={'3rem'} borderradius={'none'} src={logo} alt={'DAWHISKY LOGO'} />
        </LogoWrapper>
        <LoginPageCenter>
          <PersonalLogin userrole={userRole} issuitable={isSuitable}>
            <div>
              <PersonalIcon />
              <button type={'button'} onClick={() => setUserRole('user')}>
                {'개인회원 회원가입 및 로그인'}
              </button>
            </div>
            {/* <Button onClick={() => socialLogin()}>{'카카오톡으로 시작하기'}</Button> */}
            <button type={'button'} onClick={() => socialLogin()}>
              <BsFillChatFill />
              {'카카오톡으로 시작하기'}
            </button>
          </PersonalLogin>
          <OwnerLogin userrole={userRole} issuitable={isSuitable}>
            <div>
              <StoreIcon />
              <button type={'button'} onClick={() => setUserRole('store')}>
                {'사업자회원 로그인'}
              </button>
            </div>
            <InputArea>
              <input
                onFocus={() => setUserRole('store')}
                onChange={(e) => inputHandler(e)}
                data-type={'email'}
                placeholder={'Email'}
                type={'text'}
              />
              <input
                onFocus={() => setUserRole('store')}
                onChange={(e) => inputHandler(e)}
                data-type={'password'}
                placeholder={'Password'}
                type={'password'}
              />
              {/* <div>
                <Button>{'아이디 / 비밀번호 찾기'}</Button>
              </div> */}
            </InputArea>
            <div>
              <button type={'button'} onClick={() => loginButtonHandler()}>
                {'로그인'}
              </button>
            </div>
          </OwnerLogin>
        </LoginPageCenter>
        <LoginBottom>
          <span>{'다위스키 이용이 처음이신가요?'}</span>&nbsp;&nbsp;
          <Button onClick={() => signupButtonHandler()}>{'사업자 회원가입'}</Button>
        </LoginBottom>
      </LoginPageWrapper>
    </Layout>
  );
};

export default Login;

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 148px;
`;

const LoginPageCenter = styled.div`
  height: 327px;
  padding: 0 24px 0 24px;
`;

const PersonalLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 43px;
  height: 74px;
  width: 100%;

  button {
    transform: none;
  }

  & > div:first-child {
    width: 100%;
    margin-left: 13px;
    display: flex;
    align-items: center;
    color: ${(props) => (props.userrole === 'user' ? 'black' : '#afb1b6')};
    gap: 3px;
    button {
      height: 100%;
      width: 100%;
      font-size: 17px;
      text-align: left;
      background-color: transparent;
      color: ${(props) => (props.userrole === 'user' ? 'black' : '#afb1b6')};
      border-radius: 0;
      margin-top: 0;
      box-shadow: none;
      font-weight: 600;
      cursor: pointer;
    }
  }
  & > button {
    background-color: ${(props) => (props.userrole === 'user' ? '#FAE100' : '#afb1b6')};
    color: ${(props) => (props.userrole === 'user' ? 'black' : 'white')};
    height: 46px;
    width: 312px;
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
`;

const PersonalIcon = styled(BiUserCircle)`
  font-size: 20px;
`;

const OwnerLogin = styled.div`
  height: 146px;
  button {
    transform: none;
  }
  & > div:first-child {
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 8px;
    gap: 3px;
    color: ${(props) => (props.userrole === 'store' ? 'black' : '#afb1b6')};
    margin-bottom: 10px;
    button {
      width: 100%;
      text-align: left;
      font-size: 17px;
      background-color: transparent;
      font-weight: 600;
      cursor: pointer;
      color: ${(props) => (props.userrole === 'store' ? 'black' : '#afb1b6')};
    }
  }
  & button:first-child {
    background-color: ${(props) => (props.userrole !== 'user' && props.issuitable ? '#FF8B00' : '#afb1b6')};
    color: white;
    height: 46px;
    width: 312px;
    border-radius: 8px;
    margin-top: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
`;

const StoreIcon = styled(HiOutlineOfficeBuilding)`
  font-size: 20px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 116px;
  width: 100%;
  margin-top: 5px;
  input {
    height: 46px;
    width: 312px;
    border-radius: 8px;
    margin: 0 auto 8px auto;
    background-color: #f3f3f3;
    padding: 16px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const LoginBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  margin-top: 20px;

  span {
    font-size: 13px;
  }

  button {
    transform: none;
    background-color: transparent;
    width: 110px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.orange};
  }
`;
