import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Layout, DetailHeader, TabMenu, WhiskyGrid, DetailList, Button } from '../../components';
import { getUserInfo } from '../../api/user';

const LikeList = () => {
  const tabGroup = [
    { name: '위스키', type: 'whisky' },
    { name: '위스키 바', type: 'store' },
  ];

  const [likeWhisky, setLikeWhisky] = useState([]);
  const [likeStore, setLikeStore] = useState([]);
  const [tabChosen, setTabChosen] = useState(null);
  const onTabClickHandler = (type) => setTabChosen(type);

  const location = useLocation();
  const url = location.pathname;

  // * 좋아요 한 내역 조회
  useQuery('getUserInfo', () => getUserInfo(), {
    onSuccess: (response) => {
      if (response) {
        setLikeWhisky(response[0].whisky_likes);
        setLikeStore(response[0].store_likes);
      }
    },
  });

  return !url.includes('/ManagePage/user') ? (
    <Layout>
      <DetailHeader korname={'좋아요'} />
      <ListSection>
        <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      </ListSection>
      {tabChosen === 'whisky' && likeWhisky && <WhiskyGrid list={likeWhisky} />}
      {tabChosen === 'store' && <DetailList type={'store'} list={likeStore} />}
    </Layout>
  ) : (
    <>
      <ButtonWrapDiv>
        <LikeListButton type={'button'} onClick={() => setTabChosen(tabGroup[0].type)}>
          {'위스키'}
        </LikeListButton>
        <LikeListButton type={'button'} onClick={() => setTabChosen(tabGroup[1].type)}>
          {'위스키 바'}
        </LikeListButton>
      </ButtonWrapDiv>
      {!tabChosen && <NoneDataDiv>{'버튼을 클릭해주세요'}</NoneDataDiv>}
      {tabChosen === 'whisky' && likeWhisky && <WhiskyGrid list={likeWhisky} />}
      {tabChosen === 'store' && <DetailList type={'store'} list={likeStore} />}
    </>
  );
};

export default LikeList;

const ListSection = styled.section`
  padding-top: 80px;
`;

const ButtonWrapDiv = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
`;

const LikeListButton = styled.button`
  width: 140px;
  height: 50px;
  border-radius: 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  cursor: pointer;
  &:focus {
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
    border: none;
  }
`;

const NoneDataDiv = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.darkGray};
`;
