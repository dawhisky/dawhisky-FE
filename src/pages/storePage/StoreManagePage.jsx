import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout } from '../../components';
import StoreInfoManage from './StoreInfoManage';
import StoreBottleManage from './StoreBottleManage';
import StoreBottleRegister from './StoreBottleRegister';

const StoreManagePage = () => {
  const [whichTabChosen, setWhichTabChosen] = useState('store');

  const [isRegisterMode, setIsRegisterMode] = useState(false);

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
        {isRegisterMode ? (
          <StoreBottleRegister setIsRegisterMode={setIsRegisterMode} />
        ) : (
          <StoreManagePageWrapper>
            <div>{storeInfo.name}</div>
            <TopTabGroup>
              {tabGroup.map((item) => {
                return (
                  <TopTab
                    type={'button'}
                    key={item.type}
                    id={item.type}
                    onClick={(e) => setWhichTabChosen(e.target.id)}
                    whichtabchosen={whichTabChosen}
                  >
                    {item.name}
                  </TopTab>
                );
              })}
            </TopTabGroup>
            {whichTabChosen === 'store' ? (
              <StoreInfoManage />
            ) : whichTabChosen === 'bottle' ? (
              <StoreBottleManage setIsRegisterMode={setIsRegisterMode} />
            ) : null}
          </StoreManagePageWrapper>
        )}
      </Layout>
    </div>
  );
};

export default StoreManagePage;

const StoreManagePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;

  & > div:first-child {
    display: flex;
    align-items: flex-end;
    position: fixed;
    height: 40px;
    width: 340px;
    padding-left: 20px;
    font-size: 20px;
    font-weight: 700;
    background-color: white;
  }
`;

const TopTabGroup = styled.div`
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
