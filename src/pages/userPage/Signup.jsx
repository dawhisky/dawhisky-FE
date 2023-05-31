import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Layout, Button, Modal } from '../../components';

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
  const navigate = useNavigate();
  const onUploadHandler = () => {
    setIsModalOpen(true);
    setWhichModalOpen('pictureUpload');
  };
  return (
    <Layout>
      <SignupWrapper>
        <SignupTop>
          <button onClick={() => navigate('/Login')} type={'button'}>
            {'이전'}
          </button>
          <div>
            <h1>{'회원가입'}</h1>
          </div>
          <button type={'button'}>{'가입'}</button>
        </SignupTop>
        <SignupMiddle>
          {signupForm.map((item) => {
            return <IndividualInputArea key={item.type} item={item} />;
          })}
          <div>
            <div>{'사업장 사진'}</div>
            <Button onClick={() => onUploadHandler()}>{'사진을 첨부해주세요'}</Button>
          </div>
        </SignupMiddle>
        {isModalOpen && (
          <Modal height={200} width={300}>
            {whichModalOpen === 'confirm' ? (
              <ConfirmModal>
                <div>{'첨부 사진은 사업장 대표 이미지로 적용됩니다.'}</div>
                <button onClick={() => setIsModalOpen(false)} type={'button'}>
                  {'확인'}
                </button>
              </ConfirmModal>
            ) : (
              <PictureUpload>
                <div>{'사진첨부'}</div>
                <div>
                  <button onClick={() => setWhichModalOpen('confirm')} type={'button'}>
                    {'갤러리에서 선택'}
                  </button>
                  <button onClick={() => setWhichModalOpen('confirm')} type={'button'}>
                    {'사진 촬영'}
                  </button>
                </div>
                <Button onClick={() => setIsModalOpen(false)}>{'취소'}</Button>
              </PictureUpload>
            )}
          </Modal>
        )}
      </SignupWrapper>
    </Layout>
  );
};

const IndividualInputArea = ({ item }) => {
  return (
    <InputAreaWrapper>
      <p>{item.name}</p>
      {item.type === 'password' || item.type === 'passwordConfirm' ? (
        <input type={'password'} placeholder={item.placeholder} />
      ) : (
        <input type={'text'} placeholder={item.placeholder} />
      )}

      {item.type === 'email' ? (
        <button type={'button'}>{'중복확인'}</button>
      ) : item.type === 'biz-number' ? (
        <button type={'button'}>{'조회'}</button>
      ) : null}
    </InputAreaWrapper>
  );
};

export default Signup;

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupTop = styled.div`
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

  & > button:last-child {
    color: #b4b4b4;
  }
`;

const SignupMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 85px;
  margin-bottom: 60px;
  height: 100%;
  box-sizing: border-box;
  width: 328px;
  overflow-y: auto;

  & > div:last-child {
    font-weight: 700;
    button {
      transform: none;
      height: 48px;
      width: 312px;
      border-radius: 24px;
      margin-top: 12px;
      background-color: #a5a5a5;
      color: white;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
  }
`;

const InputAreaWrapper = styled.div`
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
`;

const ConfirmModal = styled.div`
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
`;

const PictureUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

  button {
    transform: none;
  }

  div:first-child {
    margin-top: 15px;
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    button {
      background-color: transparent;
      margin: 5px;
      font-weight: 800;
    }
  }

  & > button:last-child {
    width: 90%;
    margin: 10px;
  }
`;

// '이전'버튼 아이콘 받기
// 유효성에 문제가 있을 경우 input 테두리 붉은색 되는 로직 보류
// '중복확인'버튼이랑 '조회'버튼 저대로 괜찮은걸까나
// 사진 촬영 기능
