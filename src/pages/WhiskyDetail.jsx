import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, DetailHeader, DetailInfo, Image, TabMenu } from '../components';
import WhiskyStockList from './WhiskyStockList';
import WhiskyComment from './WhiskyComment';

const WhiskyDetail = () => {
  const tabGroup = [
    { name: '상세 정보', type: 'detail' },
    { name: '위스키 바', type: 'bar' },
    { name: '코멘트', type: 'comment' },
  ];

  const whiskyDetail = {
    지역: '어느 나라 | 어느 지역',
    타입: '무슨 타입',
    아로마: '아로마 or 피니쉬?',
  };

  const [whichTabChosen, setWhichTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setWhichTabChosen(type);

  return (
    <Layout>
      <DetailHeader korname={'위스키 이름'} engname={'Whisky name'} />
      <ImageDiv>
        <Image width={'360px'} height={'360px'} src={''} alt={''} />
      </ImageDiv>
      <TabMenu tabgroup={tabGroup} whichtabchosen={whichTabChosen} ontabclickhandler={onTabClickHandler} />
      <TabSection>
        {whichTabChosen === 'detail' && <DetailInfo info={whiskyDetail} />}
        {whichTabChosen === 'bar' && <WhiskyStockList />}
        {whichTabChosen === 'comment' && <WhiskyComment />}
      </TabSection>
    </Layout>
  );
};

export default WhiskyDetail;

const ImageDiv = styled.div`
  width: 360px;
  margin-left: -17px;
`;

const TabSection = styled.section`
  padding-top: 15px;
`;
