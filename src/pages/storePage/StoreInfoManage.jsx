import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { Button, Modal } from '../../components';
import { getStoreInfo, editStoreInfo } from '../../api/storeInfo';

const StoreInfoManage = ({ storeInfo }) => {
  const storeInfoSet = [
    { title: '상호명', type: 'store' },
    { title: '주소', type: 'address' },
    { title: '전화번호', type: 'phone' },
    { title: '운영시간', type: 'runtime' },
    { title: '공지사항', type: 'notice' },
  ];

  // 인가 정보
  const authorization = localStorage.getItem('authorization');
  const unEditedRefreshToken = localStorage.getItem('refreshToken');
  const refreshtoken = unEditedRefreshToken.replace('Bearer', '');
  const token = { authorization, refreshtoken };

  // useQueryClient
  const queryClient = useQueryClient();

  // 모달창이 열렸는지 여부 상태관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // img url 상태관리
  const [imageUrl, setImageUrl] = useState(null);

  // 수정할 input값 상태관리
  const [editedInputValue, setEditedInputValue] = useState(null);

  // 업로드 예정 사진 상태관리
  const [uploadImage, setUploadImage] = useState(null);

  // 스토어정보 수정
  const editInfoApi = useMutation(editStoreInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getStoreInfo', getStoreInfo({ token, id: storeInfo.store_id }));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (storeInfo.biz_photo) {
      setImageUrl(storeInfo.biz_photo);
      setEditedInputValue({
        store: storeInfo.store,
        address: storeInfo.address,
        phone: storeInfo.phone,
        notice: storeInfo.notice,
        runtime: storeInfo.runtime,
        biz_photo: storeInfo.biz_photo,
      });
    }
  }, [storeInfo]);

  const getInputChange = (e) => {
    setEditedInputValue({ ...editedInputValue, [e.target.dataset.type]: e.target.value });
  };

  // 사진데이터 상태관리하고, 모달창 닫기
  const prepareUploadImage = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
  };

  // 카메라 촬영하여 사진데이터 상태관리하고, 모달창 닫기
  const caturePictureHandler = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
  };

  // 작성완료버튼 핸들러 함수
  const submitEditedStoreInfo = () => {
    const formData = new FormData();
    if (uploadImage) {
      formData.append('biz_photo', uploadImage);
    }
    formData.append('store', editedInputValue.store);
    formData.append('address', editedInputValue.address);
    formData.append('phone', editedInputValue.phone);
    formData.append('notice', editedInputValue.notice);
    formData.append('runtime', editedInputValue.runtime);

    editInfoApi.mutate({ token, formData });

    setIsModalOpen(false);
  };

  return (
    <>
      <StoreInfoManageWrapper>
        <div>
          <img src={imageUrl} alt={'StorePhoto'} />
        </div>
        <StoreInfoArea>
          {storeInfoSet.map((item) => {
            return (
              <div key={item.title}>
                <div>
                  <span>{item.title}</span>
                </div>
                <span>{storeInfo[item.type] !== 'null' ? storeInfo[item.type] : '아직 입력되지 않았습니다.'}</span>
              </div>
            );
          })}
        </StoreInfoArea>
        <div>
          <Button onClick={() => setIsModalOpen(true)}>{'수정하기'}</Button>
        </div>
      </StoreInfoManageWrapper>
      {isModalOpen && (
        <Modal height={400} width={300}>
          <IndividualInputArea>
            <span>{'대표사진'}</span>
            <label htmlFor={'fileInput'}>
              {'갤러리에서 선택'}
              <input type={'file'} id={'fileInput'} onChange={(e) => prepareUploadImage(e)} />
            </label>
            <label htmlFor={'takePicture'}>
              {'사진 촬영'}
              <input type={'file'} id={'takePicture'} capture={'camera'} onChange={(e) => caturePictureHandler(e)} />
            </label>
          </IndividualInputArea>
          {storeInfoSet.map((item) => (
            <IndividualInputArea key={item.type}>
              <span>{item.title}</span>
              <input
                onChange={(e) => getInputChange(e)}
                data-type={item.type}
                type={'text'}
                placeholder={
                  item.type === 'phone'
                    ? '"-" 없이 입력해주세요.'
                    : item.type === 'runtime'
                    ? 'ex) 18:30 - 02:30'
                    : storeInfo[item.type] === 'null' ||
                      storeInfo[item.type] === 'undefined' ||
                      storeInfo[item.type] === undefined
                    ? '아직 입력되지 않았습니다.'
                    : storeInfo[item.type]
                }
              />
            </IndividualInputArea>
          ))}
          <Button onClick={() => submitEditedStoreInfo()} location={'both'} size={'medium'}>
            {'작성 완료'}
          </Button>
        </Modal>
      )}
    </>
  );
};

export default StoreInfoManage;

const StoreInfoManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 95px;
  margin-bottom: 80px;
  button {
    transform: none;
  }

  & > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgba(217, 217, 217, 0.5);
    height: 326px;
    width: 360px;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  #edit-button {
    width: 326px;
    height: 40px;
    border-radius: 20px;
    background-color: #ececec;
  }
  & > div:last-child {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const StoreInfoArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  padding: 0 10px 0 10px;

  & > div {
    display: flex;
    margin-bottom: 20px;
    & > div {
      width: 90px;
      span {
        font-weight: bolder;
        font-size: 18px;
      }
    }
    span {
      font-weight: normal;
    }
  }
`;

const IndividualInputArea = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 20px;

  span {
    margin-left: 10px;
    font-weight: 800;
    min-width: 60px;
  }
  input {
    height: 20px;
    width: 65%;
    margin: 0px 10px 0 5px;
    border: 1px solid #e3e5e6;
    border-radius: 14px;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  button {
    margin-right: 10px;
  }

  label {
    margin-left: 10px;
    input {
      display: none;
    }
  }
`;
