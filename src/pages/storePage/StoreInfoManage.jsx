import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { GrGallery, GrCamera } from 'react-icons/gr';
import { Image, DetailInfo, Button, Modal } from '../../components';
import { getStoreInfo, editStoreInfo } from '../../api/storeInfo';

const StoreInfoManage = ({ storeInfo }) => {
  const storeInfoList = {
    상호명: storeInfo.store !== 'null' ? storeInfo.store : '아직 입력되지 않았습니다.',
    주소: storeInfo.address !== 'null' ? storeInfo.address : '아직 입력되지 않았습니다.',
    전화번호: storeInfo.phone !== 'null' ? storeInfo.phone : '아직 입력되지 않았습니다.',
    운영시간: storeInfo.runtime !== 'null' ? storeInfo.runtime : '아직 입력되지 않았습니다.',
    공지사항: storeInfo.notice !== 'null' ? storeInfo.notice : '아직 입력되지 않았습니다.',
  };

  const storeInfoSet = [
    { title: '상호명', type: 'store' },
    { title: '주소', type: 'address' },
    { title: '전화번호', type: 'phone' },
    { title: '운영시간', type: 'runtime' },
    { title: '공지사항', type: 'notice' },
  ];

  // useQueryClient
  const queryClient = useQueryClient();

  // 모달창이 열렸는지 여부 상태관리
  const [modalToggle, setModalToggle] = useState(false);

  // img url 상태관리
  const [imageUrl, setImageUrl] = useState(null);

  // 수정할 input값 상태관리
  const [editedInputValue, setEditedInputValue] = useState(null);

  // 업로드 예정 사진 상태관리
  const [uploadImage, setUploadImage] = useState(null);

  // 스토어정보 수정
  const editInfoApi = useMutation(editStoreInfo, {
    onSuccess: () => {
      toast.success('수정이 완료되었습니다.');
      queryClient.invalidateQueries('getStoreInfo', getStoreInfo(storeInfo.store_id));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 모달창 ON, OFF
  const modalToggleHandler = () => setModalToggle(!modalToggle);

  useEffect(() => {
    if (storeInfo.biz_photo) {
      setImageUrl(storeInfo.biz_photo);
      setEditedInputValue({
        store: storeInfo.store || '아직 입력되지 않았습니다.',
        address: storeInfo.address || '아직 입력되지 않았습니다.',
        phone: storeInfo.phone || '아직 입력되지 않았습니다.',
        notice: storeInfo.notice || '아직 입력되지 않았습니다.',
        runtime: storeInfo.runtime || '아직 입력되지 않았습니다.',
        biz_photo: storeInfo.biz_photo || '아직 입력되지 않았습니다.',
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

    editInfoApi.mutate(formData);
    modalToggleHandler();
  };

  return (
    <>
      <div>
        <ImageDiv>
          <Image width={'22.5rem'} height={'22.5rem'} src={imageUrl} alt={`${storeInfo.store} 사진`} />
        </ImageDiv>
        <DetailInfo info={storeInfoList} />
        <ButtonWrapDiv>
          <Button onClick={modalToggleHandler}>{'수정하기'}</Button>
        </ButtonWrapDiv>
      </div>
      {modalToggle && (
        <Modal
          height={'32.5rem'}
          both={'true'}
          oncancelclick={modalToggleHandler}
          onconfirmclick={submitEditedStoreInfo}
        >
          <ModalChildSection>
            <IndividualInputArea>
              <span>{'대표사진'}</span>
              <label htmlFor={'fileInput'}>
                <GrGallery />
                <input type={'file'} id={'fileInput'} onChange={(e) => prepareUploadImage(e)} />
              </label>
              <label htmlFor={'takePicture'}>
                <GrCamera />
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
          </ModalChildSection>
        </Modal>
      )}
    </>
  );
};

export default StoreInfoManage;

const ImageDiv = styled.div`
  width: 22.5rem;
  height: 22.5rem;
  margin: -1.25rem 0 1.875rem -1.063rem;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ButtonWrapDiv = styled.div`
  height: 4.375rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    transform: none;
  }
`;

const ModalChildSection = styled.section`
  height: 100%;
  display: flex;
  padding: 1.875rem 0.938rem;
  flex-direction: column;
  span {
    font-weight: 700;
    font-size: 1.063rem;
  }
  input {
    height: 2.188rem;
    width: 100%;
    margin-top: 0.5rem;
    padding: 0.625rem;
    border: 0.07rem solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 0.625rem;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    &:focus {
      outline: 0.07rem solid ${({ theme }) => theme.colors.orange};
    }
  }
  label {
    margin-left: 3.125rem;
    font-size: 1.063rem;
    cursor: pointer;
    input {
      display: none;
    }
  }
`;

const IndividualInputArea = styled.div`
  margin: 0 0.625rem 0.938rem 0.625rem;
`;
