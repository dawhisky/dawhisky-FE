import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { BsChevronLeft } from 'react-icons/bs';
import { GrGallery, GrCamera } from 'react-icons/gr';
import { Layout, Button, Modal, Image } from '../../components';
import { signup, checkBizNumber, sendEmail } from '../../api/signup';

const Signup = () => {
  // map함수 돌릴 form
  const signupForm = [
    { name: '이메일', type: 'email', placeholder: '이메일을 입력해주세요' },
    {
      name: '이메일 인증번호',
      type: 'authCode',
      placeholder: '이메일 인증번호를 입력해주세요',
    },
    {
      name: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
    },
    {
      name: '비밀번호 확인',
      type: 'passwordConfirm',
      placeholder: '비밀번호를 입력해주세요',
    },
    { name: '상호명', type: 'store', placeholder: '상호명을 입력해주세요' },
    {
      name: '사업자번호',
      type: 'biz_number',
      placeholder: '사업자 번호를 입력해주세요',
    },
  ];

  // 모달 화면 열림 여부
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 어떤 모달창이 열렸는지
  const [whichModalOpen, setWhichModalOpen] = useState('pictureUpload');

  // storeInfo 초기값
  const initialStoreInfo = {
    email: '',
    store: '',
    biz_number: '',
    password: '',
    passwordConfirm: '',
    authCode: '',
  };

  // 회원 정보 상태관리
  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);

  // 업로드 예정 사진 상태관리
  const [uploadImage, setUploadImage] = useState(null);

  // 사업장 사진 썸네일 상태관리
  const [preview, setPreview] = useState(null);

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
      toast.success('회원가입이 완료되었습니다.');
      navigate('/Login', { replace: true });
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // useMutation hook 사업자번호 유효성 api 통신 성공시/실패시
  const checkBizNumberApi = useMutation(checkBizNumber, {
    onSuccess: (data) => {
      if (data !== '국세청에 등록되지 않은 사업자등록번호입니다.') {
        setIsBizNumberPassed(true);
        toast.success('유효한 사업자 등록번호입니다.');
      } else {
        toast.error('유효하지 않은 사업자 등록번호입니다.');
      }
    },
    onError: () => {
      toast.error('유효하지 않은 사업자 등록번호입니다.');
    },
  });

  // 사업자번호 유효성 확인 핸들러 함수
  const checkBizNumberHandler = () => {
    checkBizNumberApi.mutate(storeInfo.biz_number);
  };

  // email 본인인증 메일 발송
  const sendEmailApi = useMutation(sendEmail, {
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.response.data.errorMessage);
    },
  });

  // useMutation hook 이메일 중복여부 api 통신 성공시/실패시
  // const checkEmailApi = useMutation(checkEmail, {
  //   onSuccess: (response) => {
  //     toast.error(response.data.message);
  //     sendEmailApi.mutate(storeInfo.email);
  //   },
  //   onError: (error) => {
  //     toast.error(error.response.data.errorMessage);
  //   },
  // });

  // email 중복확인 핸들러 함수
  const checkEmailHandler = () => {
    sendEmailApi.mutate(storeInfo.email);
  };

  // 사진데이터 상태관리하고, 모달창 닫기
  const prepareUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.error('jpg, png 형식의 이미지 파일을 업로드해주세요.');
      return;
    }
    const previewURL = window.URL.createObjectURL(file);
    setPreview(previewURL);
    setUploadImage(file);
  };

  // 카메라 촬영하여 사진데이터 상태관리하고, 모달창 닫기
  const caturePictureHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      toast.error('jpg, png 형식의 이미지 파일을 업로드해주세요.');
      return;
    }
    const previewURL = window.URL.createObjectURL(file);
    setPreview(previewURL);
    setUploadImage(file);
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
      toast.error('입력되지 않은 입력칸이 있습니다.');
    } else if (storeInfo.password !== storeInfo.passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
    } else if (isBizNumberPassed !== true) {
      toast.error('유효하지 않은 사업자번호입니다.');
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
            <BsChevronLeft />
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
            <p>{'사업장 사진'}</p>
            <Button onClick={() => onUploadHandler()}>{'사진을 첨부해주세요'}</Button>
          </div>
        </SignupMiddle>
        {isModalOpen && whichModalOpen === 'confirm' && (
          <Modal
            message={`첨부 사진은\n사업장 대표 이미지로 적용됩니다.`}
            onconfirmclick={() => setIsModalOpen(false)}
          />
        )}
        {isModalOpen && whichModalOpen === 'pictureUpload' && (
          <Modal
            height={'400px'}
            both={'true'}
            oncancelclick={() => setIsModalOpen(false)}
            onconfirmclick={() => setWhichModalOpen('confirm')}
          >
            <ModalInnerDiv>
              <Image width={'220px'} height={'220px'} borderradius={'10px'} src={preview} />
              <SetImageDiv>
                <OptionsDiv>
                  <label htmlFor={'fileInput'}>
                    <GrGallery />
                    {'갤러리에서 선택'}
                    <input type={'file'} id={'fileInput'} name={'image'} onChange={(e) => prepareUploadImage(e)} />
                  </label>
                </OptionsDiv>
                <OptionsDiv>
                  <label htmlFor={'takePicture'}>
                    <GrCamera />
                    {'사진 촬영'}
                    <input
                      type={'file'}
                      id={'takePicture'}
                      capture={'camera'}
                      onChange={(e) => caturePictureHandler(e)}
                    />
                  </label>
                </OptionsDiv>
              </SetImageDiv>
            </ModalInnerDiv>
            <Hr />
          </Modal>
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
          {'중복확인'}
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
  height: 74px;
  width: 360px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.lightGray};
  background-color: ${({ theme }) => theme.colors.white};

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
    cursor: pointer;
  }

  & > button:last-child {
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const SignupMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;

  & > div:last-child {
    font-weight: 700;
    button {
      transform: none;
      height: 48px;
      width: 312px;
      border-radius: 24px;
      margin-top: 12px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      cursor: pointer;
    }
  }
  p {
    font-weight: 700;
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
    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.orange};
    }
  }
  button {
    width: 70px;
    height: 28px;
    position: absolute;
    bottom: 9%;
    right: 3%;
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 14px;
    font-size: 13px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
  }
`;

const ModalInnerDiv = styled.div`
  height: 330px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

const SetImageDiv = styled.div`
  display: flex;
  gap: 35px;
`;

const OptionsDiv = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkGray};
    cursor: pointer;
  }
  label > :first-child {
    font-size: 24px;
  }
  input {
    display: none;
  }
`;

const Hr = styled.hr`
  width: 250px;
  height: 1px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

// 유효성에 문제가 있을 경우 input 테두리 붉은색 되는 로직 보류
// '중복확인'버튼이랑 '조회'버튼 저대로 괜찮은걸까나
// 사진 촬영 기능
