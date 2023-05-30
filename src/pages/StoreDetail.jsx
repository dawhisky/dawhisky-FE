import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, DetailHeader, DetailInfo, DetailList, Image, TabMenu } from '../components';

const StoreDetail = () => {
  const tabGroup = [
    { name: '상세 정보', type: 'barInfo' },
    { name: '보유 위스키', type: 'getWhisky' },
    { name: '줄서기', type: 'que' },
  ];

  const barDetail = {
    상호명: '상호명',
    주소: '서울특별시 강남구 강남대로 7',
    전화번호: '02-000-0000',
    운영시간: '매일 19:00 - 03:00',
    공지사항: '위스키바 공지사항',
  };

  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setTabChosen(type);

  return (
    <Layout>
      <DetailHeader korname={'위스키바 이름'} />
      <ImageDiv>
        <Image width={'360px'} height={'360px'} src={''} alt={''} />
      </ImageDiv>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      <TabSection>
        {tabChosen === 'barInfo' && <DetailInfo info={barDetail} />}
        {tabChosen === 'getWhisky' && <DetailList />}
        {tabChosen === 'que' && '줄서기 컴포넌트'}
      </TabSection>
    </Layout>
  );
};

export default StoreDetail;

const ImageDiv = styled.div`
  width: 360px;
  margin-left: -17px;
`;

const TabSection = styled.section`
  padding-top: 15px;
`;
