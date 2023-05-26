import React, { useState } from 'react';
import { styled } from 'styled-components';

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

  const [editMode, setEditMode] = useState(false);

  return (
    <StoreInfoManageWrapper>
      <div id="image-wrapper">img</div>
      <div id="store-info-area">
        {storeInfoSet.map((item) => {
          return (
            <div className="individual-info-area" key={item.title}>
              <div>
                <span className="info-title">{item.title}</span>
              </div>
              <span className="info-content">{storeInfo[item.type]}</span>
            </div>
          );
        })}
      </div>
      <button id="edit-button" type="button">
        수정하기
      </button>
    </StoreInfoManageWrapper>
  );
};

export default StoreInfoManage;

const StoreInfoManageWrapper = styled.div`
  #image-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: rgba(217, 217, 217, 0.5);
    height: 326px;
    margin: 0 -16px 0 -16px;
  }
  #store-info-area {
    margin-top: 32px;
    .individual-info-area {
      display: flex;

      margin-bottom: 20px;
      div {
        width: 90px;
      }
      .info-title {
        font-weight: bolder;
        font-size: 18px;
      }
      .info-content {
        font-weight: normal;
      }
    }
  }
  #edit-button {
    width: 326px;
    height: 40px;
    border-radius: 20px;
    background-color: #ececec;
  }
`;
