import React, { useState } from 'react';
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
  const [likeStore, setLikeStore] = useState([]);
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setTabChosen(type);

  // * 좋아요 한 내역 조회
  useQuery('getUserInfo', () => getUserInfo(), {
    onSuccess: (response) => {
      if (response) {
        setLikeWhisky(response[0].whisky_likes);
        setLikeStore(response[0].store_likes);
      }
    },
  });

  return (
    <Layout>
      <DetailHeader korname={'좋아요'} />
      <ListSection>
        <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      </ListSection>
      {tabChosen === 'whisky' && likeWhisky && <WhiskyGrid list={likeWhisky} />}
      {tabChosen === 'store' && <DetailList type={'store'} list={likeStore} />}
    </Layout>
  );
};

export default LikeList;

const ListSection = styled.section`
  padding-top: 80px;
`;
