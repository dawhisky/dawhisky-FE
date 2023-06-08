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

  // 해당 스토어 테이블 정보
  const { data } = useQuery('getUserInfo', () => getUserInfo(), {
    onSuccess: () => {
      setLikeWhisky(data[0].WhiskyLikes);
      setLikeStore(data[0].StoreLikes);
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
