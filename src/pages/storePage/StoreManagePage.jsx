import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout } from '../../components';
import { StoreBottleManage, StoreInfoManage } from '../../components/innerPage';

const StoreManagePage = () => {
  const [whichTabChosen, setWhichTabChosen] = useState('store');

  const storeInfo = {
    name: '팀스피릿츠',
    address: '서울특별시 강남구 강남대로7',
    phoneNumber: '010-0000-0000',
    barHours: '매일 19 : 00 - 03 : 00',
    notice: '공지사항',
  };

  const tabGroup = [
    { name: '좌석 관리', type: 'seat' },
    { name: '업장 관리', type: 'store' },
    { name: '주류 관리', type: 'bottle' },
  ];

  return (
    <div>
      <Layout>
        <StoreManagePageWrapper>
          <div id="store-name">{storeInfo.name}</div>
          <div id="store-management-tab">
            {tabGroup.map((item) => {
              return (
                <TopTab
                  type="button"
                  key={item.type}
                  id={item.type}
                  onClick={(e) => setWhichTabChosen(e.target.id)}
                  whichtabchosen={whichTabChosen}
                >
                  {item.name}
                </TopTab>
              );
            })}
          </div>
          {whichTabChosen === 'store' ? (
            <StoreInfoManage />
          ) : whichTabChosen === 'bottle' ? (
            <StoreBottleManage />
          ) : null}
        </StoreManagePageWrapper>
      </Layout>
    </div>
  );
};

export default StoreManagePage;

const StoreManagePageWrapper = styled.div`
  display: flex;
  justify-content: center;

  #store-name {
    display: flex;
    align-items: flex-end;
    position: fixed;
    height: 40px;
    width: 360px;
    padding-left: 20px;
    top: 0;
    font-size: 20px;
    font-weight: 700;
    background-color: white;
  }
  #store-management-tab {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    position: fixed;
    top: 40px;
    height: 50px;
    width: 360px;
    border-bottom: 0.5px solid #eaeaea;
    margin: 0 -16px 0 -16px;
    background-color: white;
  }
`;

const TopTab = styled.button`
  font-weight: ${(props) => (props.id === props.whichtabchosen ? '900' : '100')};
  font-size: ${(props) => (props.id === props.whichtabchosen ? '17px' : '16px')};
  ${(props) => props.id === props.whichtabchosen && 'text-decoration : underline'};
  text-decoration-thickness: 3px;
  text-underline-offset: 5px;
  padding-bottom: 5px;
  background-color: transparent;
`;
