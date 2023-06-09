import React, { useState } from 'react';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { BsThreeDots, BsCheck2 } from 'react-icons/bs';
import { useMutation, useQuery } from 'react-query';
import { TabMenu, Button, Modal, WhiskyGrid } from '../../components';
import UserQueueList from './UserQueueList';
import LikeList from './LikeList';
import { getUserInfo } from '../../api/user';
import { setLogout, setSignout } from '../../api/login';

const UserManagePage = () => {
  const tabGroup = [
    { name: '코멘트 관리', type: 'getComment' },
    { name: '좋아요 내역', type: 'getLike' },
    { name: '줄서기 현황', type: 'getMyQueueList' },
  ];
  const managementList = ['로그아웃', '회원탈퇴'];
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [managementChosen, setManagementChosen] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [bottomToggle, setBottomToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);

  const navigate = useNavigate();
  const params = useParams()['*'];

  // * [마이페이지] 유저 마이페이지 데이터 조회
  const { data } = useQuery('getUserInfo', () => getUserInfo(), {
    onSuccess: (response) => {
      if (response) {
        setCommentList(response[0].reviews);
      }
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
    } else if (params === 'user') {
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

  // * [회원탈퇴]
  const onDeleteUserHandler = () => {
    setSignoutMutation.mutate(params);
  };

  return (
    <>
      <Header>
        <UserNameH1>{data && data[0].name}</UserNameH1>
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
      {tabChosen === 'getComment' && <WhiskyGrid list={commentList} link={'comment'} />}
      {tabChosen === 'getLike' && <LikeList />}
      {tabChosen === 'getMyQueueList' && <UserQueueList />}
    </>
  );
};

export default UserManagePage;

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
  z-index: 1;
`;

const ListUl = styled.ul`
  width: 360px;
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 12px 12px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
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
