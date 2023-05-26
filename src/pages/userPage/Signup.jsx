import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout } from '../../components/element';

const Signup = () => {
  const signupForm = [
    { name: '이메일', type: 'email', placeholder: '이메일을 입력해주세요' },
    { name: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요' },
    { name: '비밀번호 확인', type: 'passwordConfirm', placeholder: '비밀번호를 입력해주세요' },
    { name: '상호명', type: 'store', placeholder: '상호명을 입력해주세요' },
    { name: '사업자번호', type: 'biz-number', placeholder: '이메일을 입력해주세요' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [whichModalOpen, setWhichModalOpen] = useState('pictureUpload');
  const onUploadHandler = () => {
    setIsModalOpen(true);
    setWhichModalOpen('pictureUpload');
  };
  return (
    <Layout>
      <SignupWrapper>
        <div id="signup-top">
          <button id="previous" type="button">
            이전
          </button>
          <div>
            <h1>회원가입</h1>
          </div>
          <button id="signup-button" type="submit">
            가입
          </button>
        </div>
        <div id="signup-middle">
          {signupForm.map((item, index) => {
            return <IndividualInputArea key={item.type} item={item} />;
          })}
          <div>
            <div>사업장 사진</div>
            <button onClick={() => onUploadHandler()} id="picture-upload-button" type="button">
              사진을 첨부해주세요
            </button>
          </div>
        </div>
        {isModalOpen && (
          <Translucent>
            <div id="modal-window">
              {whichModalOpen === 'confirm' ? (
                <div id="confirm">
                  <div>첨부 사진은 사업장 대표 이미지로 적용됩니다.</div>
                  <button onClick={() => setIsModalOpen(false)} type="button">
                    확인
                  </button>
                </div>
              ) : (
                <div id="picture-upload">
                  <div>사진 첨부</div>
                  <div id="button-area">
                    <button onClick={() => setWhichModalOpen('confirm')} type="button">
                      갤러리에서 선택
                    </button>
                    <button onClick={() => setWhichModalOpen('confirm')} type="button">
                      사진 촬영
                    </button>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} id="cancle-button" type="button">
                    취소
                  </button>
                </div>
              )}
            </div>
          </Translucent>
        )}
      </SignupWrapper>
    </Layout>
  );
};

const IndividualInputArea = ({ item }) => {
  return (
    <div className="input-area" id={item.type}>
      <p>{item.name}</p>
      {item.type === 'password' || item.type === 'passwordConfirm' ? (
        <input type="password" placeholder={item.placeholder} />
      ) : (
        <input type="text" placeholder={item.placeholder} />
      )}

      {item.type === 'email' ? (
        <button type="button">중복확인</button>
      ) : item.type === 'biz-number' ? (
        <button type="button">조회</button>
      ) : null}
    </div>
  );
};

export default Signup;

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  #signup-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    height: 74px;
    width: 360px;
    border: 0.5px solid #eaeaea;
    background-color: white;
    z-index: 1;

    h1 {
      font-size: 20px;
      font-weight: 600;
    }
    button {
      display: flex;
      align-items: center;
      background-color: transparent;
      height: 30px;
      padding: 15px;
    }

    #signup-button {
      color: #b4b4b4;
    }
  }

  #signup-middle {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 74px;
    margin-bottom: 60px;
    height: 100%;
    box-sizing: border-box;
    width: 328px;
    overflow-y: auto;

    .input-area {
      position: relative;
      height: 76px;
      margin-bottom: 24px;
      p {
        font-weight: 700;
      }
      input {
        height: 48px;
        width: 308px;
        border: 1px solid #e3e5e6;
        border-radius: 8px;
        color: #72777a;
        padding-left: 10px;
        margin-top: 12px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }
      button {
        position: absolute;
        bottom: 12%;
        right: 3%;
        height: 24px;
        width: 70px;
        background-color: #ececec;
        border-radius: 14px;
        font-size: 14px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      }
    }
  }

  #picture-upload-button {
    height: 48px;
    width: 312px;
    border-radius: 24px;
    margin-top: 12px;
    background-color: #a5a5a5;
    color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const Translucent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 360px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;

  #modal-window {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 200px;
    width: 300px;
    border-radius: 15px;
    background-color: white;

    #confirm {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 200px;
      width: 300px;
      padding: 40px;
      text-align: center;
      line-height: 200%;
      button {
        margin-top: 30px;
        font-size: 20px;
        font-weight: 700;
        background-color: transparent;
      }
    }
  }

  #picture-upload {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    height: 200px;
    #button-area {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 300px;
      padding-left: 10px;

      button {
        margin: 10px;
        background-color: transparent;
      }
    }

    #cancle-button {
      height: 40px;
      width: 280px;
      border-radius: 20px;
      background-color: #ececec;
    }
  }
`;

// '이전'버튼 아이콘 받기
// 유효성에 문제가 있을 경우 input 테두리 붉은색 되는 로직 보류
// '중복확인'버튼이랑 '조회'버튼 저대로 괜찮은걸까나
// 사진 촬영 기능
