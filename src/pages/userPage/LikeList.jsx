import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { Layout, DetailHeader, TabMenu, WhiskyGrid, DetailList } from '../../components';
import getUserInfo from '../../api/user';

const LikeList = () => {
  const tabGroup = [
    { name: '위스키', type: 'whisky' },
    { name: '위스키 바', type: 'store' },
  ];
  const [likeWhisky, setLikeWhisky] = useState([]);
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setTabChosen(type);

  // 인가 정보
  // const authorization = localStorage.getItem('authorization');
  const authorization =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2lqYWVob25nQG5hdmVyLmNvbSIsImlhdCI6MTY4NjIyNTQ4MiwiZXhwIjoxNjg2MjMyNjgyfQ.h2B2p9b6Y9nv9nlB0Lu791MgKgy-vmjCoXmrJNdeeCE';
  // const unEditedRefreshToken = localStorage.getItem('refreshToken');
  const unEditedRefreshToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob2lqYWVob25nQG5hdmVyLmNvbSIsImlhdCI6MTY4NjIyNTQ4MiwiZXhwIjoxNjg2ODMwMjgyfQ.wfH8S6v8dNCowuakiov8LhKIGzzDuE4NyR5GMt3QUjA';
  const refreshtoken = unEditedRefreshToken.replace('Bearer', '');
  const token = { authorization, refreshtoken };
  const storeId = localStorage.getItem('store_id');
  // 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getUserInfo', () => getUserInfo({ token }));

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Layout>
      <DetailHeader korname={'좋아요'} />
      <ListSection>
        <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      </ListSection>
      {tabChosen === 'whisky' && <WhiskyGrid />}
      {tabChosen === 'store' && <DetailList type={'store'} />}
    </Layout>
  );
};

export default LikeList;

const ListSection = styled.section`
  padding-top: 80px;
`;
