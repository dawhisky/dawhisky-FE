import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, DetailHeader, TabMenu, WhiskyGrid, DetailList } from '../../components';

const LikeList = () => {
  const tabGroup = [
    { name: '위스키', type: 'whisky' },
    { name: '위스키 바', type: 'store' },
  ];
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setTabChosen(type);

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
