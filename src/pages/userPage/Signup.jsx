import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import { Layout, Button, SetInfoModal } from '../../components';
import { signup, checkBizNumber, sendEmail } from '../../api/signup';

const Signup = () => {
  // map함수 돌릴 form
  const signupForm = [
    { name: '이메일', type: 'email', placeholder: '이메일을 입력해주세요' },
    { name: '이메일 인증번호', type: 'authCode', placeholder: '이메일 인증번호를 입력해주세요' },
    { name: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요' },
    { name: '비밀번호 확인', type: 'passwordConfirm', placeholder: '비밀번호를 입력해주세요' },
    { name: '상호명', type: 'store', placeholder: '상호명을 입력해주세요' },
    { name: '사업자번호', type: 'biz_number', placeholder: '사업자 번호를 입력해주세요' },
  ];

  // 모달 화면 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 어떤 모달창이 열렸는지
  const [whichModalOpen, setWhichModalOpen] = useState('pictureUpload');

  // storeInfo 초기값
  const initialStoreInfo = { email: '', store: '', biz_number: '', password: '', passwordConfirm: '', authCode: '' };

  // 회원 정보 상태관리
  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);

  // 업로드 예정 사진 상태관리
  const [uploadImage, setUploadImage] = useState(null);

  // 사업자번호 유효여부
  const [isBizNumberPassed, setIsBizNumberPassed] = useState(false);

  // useNavigate hook 호출
  const navigate = useNavigate();

  // input값 변화 감지 함수
  const saveInputValue = (e) => {
    setStoreInfo({ ...storeInfo, [e.target.dataset.type]: e.target.value });
  };

  // '사진을 첨부해주세요' 버튼 눌렀을 때의 모달창 액션
  const onUploadHandler = () => {
    setIsModalOpen(true);
    setWhichModalOpen('pictureUpload');
  };

  // useMutation hook 회원가입 api 통신 성공시/실패시
  const signupApi = useMutation(signup, {
    onSuccess: () => {
      alert('회원가입이 완료되었습니다.');
      navigate('/Login');
    },
    onError: (error) => {
      alert(error);
    },
  });

  // useMutation hook 사업자번호 유효성 api 통신 성공시/실패시
  const checkBizNumberApi = useMutation(checkBizNumber, {
    onSuccess: (data) => {
      if (data !== '국세청에 등록되지 않은 사업자등록번호입니다.') {
        setIsBizNumberPassed(true);
        alert('유효한 사업자 등록번호입니다.');
      } else {
        alert('유효하지 않은 사업자 등록번호입니다.');
      }
    },
    onError: () => {
      alert('유효하지 않은 사업자 등록번호입니다.');
    },
  });

  // 사업자번호 유효성 확인 핸들러 함수
  const checkBizNumberHandler = () => {
    checkBizNumberApi.mutate(storeInfo.biz_number);
  };

  // email 본인인증 메일 발송
  const sendEmailApi = useMutation(sendEmail, {
    onSuccess: (response) => {
      alert(response.message);
    },
    onError: (error) => {
      alert(error.response.data.errorMessage);
    },
  });

  // useMutation hook 이메일 중복여부 api 통신 성공시/실패시
  // const checkEmailApi = useMutation(checkEmail, {
  //   onSuccess: (response) => {
  //     alert(response.data.message);
  //     sendEmailApi.mutate(storeInfo.email);
  //   },
  //   onError: (error) => {
  //     alert(error.response.data.errorMessage);
  //   },
  // });

  // email 중복확인 핸들러 함수
  const checkEmailHandler = () => {
    sendEmailApi.mutate(storeInfo.email);
  };

  // 사진데이터 상태관리하고, 모달창 닫기
  const prepareUploadImage = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
    setWhichModalOpen('confirm');
  };

  // 카메라 촬영하여 사진데이터 상태관리하고, 모달창 닫기
  const caturePictureHandler = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
    setWhichModalOpen('confirm');
  };

  // '가입' 버튼 누르면 예외상황에 따라 분기처리하고, formData만들어서 전송
  const signupButtonHandler = () => {
    if (
      storeInfo.email === '' ||
      storeInfo.store === '' ||
      storeInfo.password === '' ||
      storeInfo.biz_number === '' ||
      uploadImage === null
    ) {
      alert('입력되지 않은 입력칸이 있습니다.');
    } else if (storeInfo.password !== storeInfo.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (isBizNumberPassed !== true) {
      alert('유효하지 않는 사업자번호입니다.');
    } else {
      const formData = new FormData();
      formData.append('email', storeInfo.email);
      formData.append('store', storeInfo.store);
      formData.append('password', storeInfo.password);
      formData.append('biz_number', storeInfo.biz_number);
      formData.append('biz_photo', uploadImage);
      formData.append('authCode', storeInfo.authCode);
      formData.append('address', null);
      formData.append('phone', null);
      formData.append('notice', null);
      formData.append('runtime', null);

      signupApi.mutate(formData);
    }
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
          <button onClick={() => signupButtonHandler()} type={'button'}>
            {'가입'}
          </button>
        </SignupTop>
        <SignupMiddle>
          {signupForm.map((item) => {
            return (
              <IndividualInputArea
                checkBizNumberHandler={checkBizNumberHandler}
                checkEmailHandler={checkEmailHandler}
                saveInputValue={saveInputValue}
                key={item.type}
                item={item}
              />
            );
          })}
          <div>
            <div>{'사업장 사진'}</div>
            <Button onClick={() => onUploadHandler()}>{'사진을 첨부해주세요'}</Button>
          </div>
        </SignupMiddle>
        {isModalOpen && (
          <SetInfoModal height={200} width={300}>
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
                  <label htmlFor={'fileInput'}>
                    {'갤러리에서 선택'}
                    <input type={'file'} id={'fileInput'} onChange={(e) => prepareUploadImage(e)} />
                  </label>
                  <label htmlFor={'takePicture'}>
                    {'사진 촬영'}
                    <input
                      type={'file'}
                      id={'takePicture'}
                      capture={'camera'}
                      onChange={(e) => caturePictureHandler(e)}
                    />
                  </label>
                </div>
                <Button onClick={() => setIsModalOpen(false)}>{'취소'}</Button>
              </PictureUpload>
            )}
          </SetInfoModal>
        )}
      </SignupWrapper>
    </Layout>
  );
};

const IndividualInputArea = ({ item, saveInputValue, checkBizNumberHandler, checkEmailHandler }) => {
  return (
    <InputAreaWrapper>
      <p>{item.name}</p>
      {item.type === 'password' || item.type === 'passwordConfirm' ? (
        <input
          onChange={(e) => saveInputValue(e)}
          data-type={item.type}
          type={'password'}
          placeholder={item.placeholder}
        />
      ) : (
        <input onChange={(e) => saveInputValue(e)} data-type={item.type} type={'text'} placeholder={item.placeholder} />
      )}

      {item.type === 'email' ? (
        <button onClick={() => checkEmailHandler()} type={'button'}>
          {'중복 확인'}
        </button>
      ) : item.type === 'biz_number' ? (
        <button onClick={() => checkBizNumberHandler()} type={'button'}>
          {'조회'}
        </button>
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
  font-size: 20px;

  button {
    transform: none;
  }

  div:first-child {
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    font-size: 16px;

    input {
      display: none;
    }
    label {
      margin: 5px;
      font-weight: 800;
    }
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
