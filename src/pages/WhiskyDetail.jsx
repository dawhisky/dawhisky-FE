import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, DetailHeader, Image, TabMenu } from '../components';
import WhiskyStockList from './WhiskyStockList';
import WhiskyComment from './WhiskyComment';

const WhiskyDetail = () => {
  const tabGroup = [
    { name: '상세 정보', type: 'detail' },
    { name: '위스키 바', type: 'bar' },
    { name: '코멘트', type: 'comment' },
  ];

  const [whichTabChosen, setWhichTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setWhichTabChosen(type);

  return (
    <Layout>
      <DetailHeader korname={'위스키 이름'} engname={'Whisky name'} />
      <ImageDiv>
        <Image width={'360px'} height={'360px'} src={''} alt={''} />
      </ImageDiv>
      <TabMenu tabgroup={tabGroup} whichtabchosen={whichTabChosen} ontabclickhandler={onTabClickHandler} />
      {whichTabChosen === 'detail' && '디테일'}
      {whichTabChosen === 'bar' && <WhiskyStockList />}
      {whichTabChosen === 'comment' && <WhiskyComment />}
    </Layout>
  );
};

export default WhiskyDetail;

const ImageDiv = styled.div`
  width: 360px;
  margin-left: -17px;
`;
