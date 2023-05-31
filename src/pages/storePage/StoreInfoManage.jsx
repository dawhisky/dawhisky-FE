import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Button, Modal } from '../../components';

const StoreInfoManage = () => {
  const storeInfo = {
    name: '팀스피릿츠',
    address: '서울특별시 강남구 강남대로7',
    phoneNumber: '010-0000-0000',
    barHours: '매일 19 : 00 - 03 : 00',
    notice: '공지사항',
  };

  const storeInfoSet = [
    { title: '상호명', type: 'name' },
    { title: '주소', type: 'address' },
    { title: '전화번호', type: 'phoneNumber' },
    { title: '운영시간', type: 'barHours' },
    { title: '공지사항', type: 'notice' },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <StoreInfoManageWrapper>
        <div>{'img'}</div>
        <StoreInfoArea>
          {storeInfoSet.map((item) => {
            return (
              <div key={item.title}>
                <div>
                  <span>{item.title}</span>
                </div>
                <span>{storeInfo[item.type]}</span>
              </div>
            );
          })}
        </StoreInfoArea>
        <Button onClick={() => setIsModalOpen(true)}>{'수정하기'}</Button>
      </StoreInfoManageWrapper>
      {isModalOpen && (
        <Modal height={400} width={300}>
          <IndividualInputArea>
            <span>{'대표사진'}</span>
            <Button location={'both'} size={'small'}>
              {'선택'}
            </Button>
          </IndividualInputArea>
          {storeInfoSet.map((item) => (
            <IndividualInputArea key={item.type}>
              <span>{item.title}</span>
              <input type={'text'} placeholder={storeInfo[item.type]} />
            </IndividualInputArea>
          ))}
          <Button location={'both'} size={'medium'} onClick={() => setIsModalOpen(false)}>
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
  margin-top: 90px;

  button {
    transform: none;
  }

  & > div:first-child {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: rgba(217, 217, 217, 0.5);
    height: 326px;
    width: 100%;
  }

  #edit-button {
    width: 326px;
    height: 40px;
    border-radius: 20px;
    background-color: #ececec;
  }
`;

const StoreInfoArea = styled.div`
  margin-top: 32px;
  & > div {
    display: flex;
    margin-bottom: 20px;
    div {
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
  justify-content: space-between;
  align-items: center;
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
`;
