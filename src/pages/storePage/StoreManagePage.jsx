import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { BsThreeDots, BsCheck2 } from 'react-icons/bs';
import StoreInfoManage from './StoreInfoManage';
import StoreBottleManage from './StoreBottleManage';
import StoreBottleRegister from './StoreBottleRegister';
import StoreQueSeatManage from './StoreQueSeatManage';
import StoreSeatEditPage from './StoreSeatEditPage';
import { getStoreInfo } from '../../api/storeInfo';
import { TabMenu, Button, Modal } from '../../components';
import { setLogout, setSignout } from '../../api/login';

const StoreManagePage = () => {
  const tabGroup = [
    { name: '좌석관리', type: 'seat' },
    { name: '업장관리', type: 'store' },
    { name: '주류관리', type: 'bottle' },
  ];
  const managementList = ['로그아웃', '회원탈퇴'];
  // 어떤 탭이 선택되었는지 여부 상태관리
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  // 로그아웃, 회원탈퇴
  const [managementChosen, setManagementChosen] = useState(null);
  // 로그인, 회원탈퇴 토글 열렸는지 상태관리
  const [bottomToggle, setBottomToggle] = useState(false);
  // 회원탈퇴 모달 열렸는지 상태관리
  const [modalToggle, setModalToggle] = useState(false);
  // 주류 등록 모드인지 여부 상태관리
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  // 좌석 수정 모드인지 여부 상태관리
  const [isSeatEditMode, setIsSeatEditMode] = useState(false);
  // 좌석 관리 탭 내에서 '줄서기'인지 '좌석 현황'인지
  const [whichMode, setWhichMode] = useState('que');
  // 업장 정보 수정 input값 상태관리
  const [storeInfo, setStoreInfo] = useState({});

  const navigate = useNavigate();
  const params = useParams()['*'];
  const id = localStorage.getItem('store_id');

  // * [스토어 테이블 정보] 조회
  useQuery('getStoreInfo', () => getStoreInfo(id), {
    onSuccess: (response) => {
      setStoreInfo(response);
    },
  });

  // * [tab] 탭 클릭
  const onTabClickHandler = (type) => setTabChosen(type);

  // * [모달] 모달창 ON, OFF
  const modalToggleHandler = () => setModalToggle(!modalToggle);

  // * [로그인 관리] 토글 버튼 클릭
  const onToggleClickHandler = () => {
    setBottomToggle(!bottomToggle);
    setManagementChosen(null);
  };

  // * [로그아웃] 로그아웃 useMutation
  const setLogoutMutation = useMutation(setLogout, {
    onSuccess: () => {
      localStorage.clear();
      toast.success('로그아웃이 완료되었습니다.');
      navigate(`/`, { replace: true });
    },
  });

  // * [로그아웃, 회원탈퇴] 버튼 클릭
  const onManagementClickHandler = (idx) => {
    setManagementChosen(managementList[idx]);
    if (idx === 1) {
      modalToggleHandler();
    } else if (params === 'store') {
      setLogoutMutation.mutate(params);
    }
  };

  // * [회원탈퇴] useMutation
  const setSignoutMutation = useMutation(setSignout, {
    onSuccess: () => {
      localStorage.clear();
      toast.success('회원탈퇴가 완료되었습니다.');
      navigate(`/`, { replace: true });
    },
  });

  // * [회원탈퇴] 버튼 클릭
  const onDeleteUserHandler = () => {
    setSignoutMutation.mutate(params);
  };

  return (
    <div>
      <Header>
        <UserNameH1>{storeInfo && storeInfo.store}</UserNameH1>
        <SignoutSpan>
          <BsThreeDots onClick={onToggleClickHandler} />
        </SignoutSpan>
      </Header>
      {bottomToggle && (
        <>
          <BackgroundDiv onClick={onToggleClickHandler} />
          <ListUl>
            <span>{'로그인 관리'}</span>
            {managementList.map((item, idx) => {
              return (
                <ListLi
                  key={item}
                  active={item === managementChosen ? 'true' : 'false'}
                  onClick={() => onManagementClickHandler(idx, item)}
                >
                  <p>{item}</p>
                  <BsCheck2 />
                </ListLi>
              );
            })}
            <ButtonWrapDiv>
              <Button location={'both'} onClick={onToggleClickHandler}>
                {'닫기'}
              </Button>
            </ButtonWrapDiv>
          </ListUl>
        </>
      )}
      {modalToggle && (
        <Modal
          message={'회원탈퇴 하시겠습니까?'}
          both={'true'}
          oncancelclick={modalToggleHandler}
          onconfirmclick={onDeleteUserHandler}
        />
      )}
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      {isRegisterMode && <StoreBottleRegister setIsRegisterMode={setIsRegisterMode} />}
      {isSeatEditMode && (
        <StoreSeatEditPage
          setWhichMode={setWhichMode}
          setIsSeatEditMode={setIsSeatEditMode}
          storeId={storeInfo.store_id}
        />
      )}
      {tabChosen === 'seat' && (
        <StoreQueSeatManage
          whichMode={whichMode}
          setWhichMode={setWhichMode}
          setIsSeatEditMode={setIsSeatEditMode}
          storeId={storeInfo.store_id}
        />
      )}
      {tabChosen === 'store' && <StoreInfoManage storeInfo={storeInfo} />}
      {tabChosen === 'bottle' && <StoreBottleManage id={storeInfo.store_id} />}
    </div>
  );
};

export default StoreManagePage;

const Header = styled.header`
  padding: 40px 10px 15px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserNameH1 = styled.h1`
  font-size: 20px;
  font-weight: 700;
`;

const SignoutSpan = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const ListUl = styled.ul`
  width: 360px;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px 12px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 2;
  overflow-y: auto;
  animation: fadeInUp 0.7s;
  & span {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate(-50%, 100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const ListLi = styled.li`
  margin: 16px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  :first-child {
    font-weight: ${({ active }) => (active === 'true' ? '700' : '400')};
    width: 300px;
  }
  :last-child {
    font-size: 20px;
    color: ${({ theme, active }) => (active === 'true' ? theme.colors.orange : 'transparent')};
  }
`;

const ButtonWrapDiv = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
