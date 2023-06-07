import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { Layout } from '../../components';
import StoreInfoManage from './StoreInfoManage';
import StoreBottleManage from './StoreBottleManage';
import StoreBottleRegister from './StoreBottleRegister';
import StoreQueSeatManage from './StoreQueSeatManage';
import StoreSeatEditPage from './StoreSeatEditPage';
import { getStoreInfo } from '../../api/storeInfo';

const StoreManagePage = () => {
  // 인가 정보
  const authorization = localStorage.getItem('authorization');
  const unEditedRefreshToken = localStorage.getItem('refreshToken');
  const refreshtoken = unEditedRefreshToken.replace('Bearer', '');
  const storeId = localStorage.getItem('store_id');
  const token = { authorization, refreshtoken };
  // 어떤 탭이 선택되었는지 여부 상태관리
  const [whichTabChosen, setWhichTabChosen] = useState('store');
  // 주류 등록 모드인지 여부 상태관리
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  // 좌석 수정 모드인지 여부 상태관리
  const [isSeatEditMode, setIsSeatEditMode] = useState(false);
  // 좌석 관리 탭 내에서 '줄서기'인지 '좌석 현황'인지
  const [whichMode, setWhichMode] = useState('que');
  // 업장 정보 수정 input값 상태관리
  const [storeInfo, setStoreInfo] = useState({});

  // 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getStoreInfo', () => getStoreInfo({ token, id: storeId }));

  useEffect(() => {
    if (!isLoading && !isError) {
      setStoreInfo(data);
    }
  }, [data]);

  const tabGroup = [
    { name: '좌석 관리', type: 'seat' },
    { name: '업장 관리', type: 'store' },
    { name: '주류 관리', type: 'bottle' },
  ];

  return (
    <Layout>
      {isRegisterMode ? (
        <StoreBottleRegister setIsRegisterMode={setIsRegisterMode} />
      ) : isSeatEditMode ? (
        <StoreSeatEditPage
          setWhichTabChosen={setWhichTabChosen}
          setWhichMode={setWhichMode}
          setIsSeatEditMode={setIsSeatEditMode}
          storeId={storeId}
        />
      ) : (
        <StoreManagePageWrapper>
          <div>{storeInfo.store}</div>
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
            <StoreInfoManage storeInfo={storeInfo} />
          ) : whichTabChosen === 'bottle' ? (
            <StoreBottleManage setIsRegisterMode={setIsRegisterMode} />
          ) : (
            <StoreQueSeatManage
              whichMode={whichMode}
              setWhichMode={setWhichMode}
              setIsSeatEditMode={setIsSeatEditMode}
              storeId={storeId}
            />
          )}
        </StoreManagePageWrapper>
      )}
    </Layout>
  );
};

export default StoreManagePage;

const StoreManagePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    display: flex;
    align-items: flex-end;
    position: fixed;
    height: 40px;
    width: 360px;
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
