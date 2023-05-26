import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, Navbar } from '../../components';

const Login = () => {
  const [userRole, setUserRole] = useState('user');
  console.log(userRole);
  return (
    <Layout>
      <LoginPageWrapper userRole={userRole}>
        <div id="logo-wrapper">
          <p>다위스키 로고</p>
        </div>
        <div id="login-page-center">
          <div id="personal-login">
            <button id="personal-trans-button" type="button" onClick={() => setUserRole('user')}>
              개인회원 로그인
            </button>
            <button id="personal-login-button" type="button">
              카카오톡으로 시작하기
            </button>
          </div>
          <div id="owner-login">
            <button id="owner-trans-button" type="button" onClick={() => setUserRole('owner')}>
              사업자회원 로그인
            </button>
            <div id="input-area">
              <input placeholder="Email" type="text" id="email-input" />
              <input placeholder="Password" type="password" id="password-input" />
            </div>
            <p id="find-idpw">아이디 / 비밀번호 찾기</p>
            <button id="owner-login-button" type="button">
              로그인
            </button>
          </div>
        </div>
        <div id="login-bottom">
          <span>다위스키 이용이 처음이신가요?</span>&nbsp;&nbsp;
          <span id="signup-button">회원가입</span>
        </div>
      </LoginPageWrapper>
    </Layout>
  );
};

export default Login;

const LoginPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 143px;
  }
  #login-page-center {
    height: 327px;
    padding: 0 24px 0 24px;

    #personal-login {
      margin-bottom: 43px;

      #personal-trans-button {
        font-size: 18px;
        background-color: transparent;
        color: ${(props) => (props.userRole === 'user' ? 'black' : '#afb1b6')};
      }
      #personal-login-button {
        height: 46px;
        width: 312px;
        background-color: #b4b4b4;
        color: white;
        border-radius: 8px;
        margin-top: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }
    }

    #owner-login {
      height: 146px;

      #owner-trans-button {
        font-size: 18px;
        background-color: transparent;
        color: ${(props) => (props.userRole === 'owner' ? 'black' : '#afb1b6')};
        margin-bottom: 4px;
      }
      #input-area {
        height: 116px;
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
      }
      #find-idpw {
        display: flex;
        justify-content: flex-end;
        font-size: 12px;
        color: #72777a;
      }
      #owner-login-button {
        height: 46px;
        width: 312px;
        border-radius: 8px;
        color: #72777a;
        background-color: #f3f3f3;
        margin-top: 18px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }
    }
  }
  #login-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    margin-top: 20px;

    span {
      font-size: 13px;
    }

    #signup-button {
      font-size: 16px;
      color: #0067a3;
    }
  }
`;

// 개인회원 로그인, 사업자회원 로그인, 카카오톡으로 시작하기 앞에 붙는 '아이콘'
// 개인회원 로그인이 선택돼서 활성화 됐을 때의 '카카오톡으로 시작하기' 버튼의 백그라운드 칼라, 폰트 칼라
// 로그인에 필요한 입력값 충족되었을 때 활성화 될 로그인 버튼의 백그라운드 칼라, 폰트 칼라
