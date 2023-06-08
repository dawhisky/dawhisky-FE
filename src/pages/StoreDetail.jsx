import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { Layout, DetailHeader, DetailInfo, DetailList, Image, TabMenu } from '../components';
import UserQuePage from './UserQuePage';
import { getStoreInfo } from '../api/storeInfo';

const StoreDetail = () => {
  const params = useParams();
  // 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getStoreInfo', () => getStoreInfo({ id: 77 }));
  // 해당 스토어 정보 상태관리
  const [barDetail, setBarDetail] = useState({});

  useEffect(() => {
    if (!isLoading && !isError) {
      const extractedData = {
        상호명: data.store,
        주소: data.address,
        전화번호: data.phone,
        운영시간: data.runtime,
        공지사항: data.notice,
      };
      Object.keys(extractedData).forEach((key) => {
        if (extractedData[key] === undefined || extractedData[key] === null || extractedData[key] === 'null') {
          extractedData[key] = '아직 입력되지 않았습니다.';
        }
      });
      setBarDetail(extractedData);
    }
  }, [data]);

  const tabGroup = [
    { name: '상세 정보', type: 'barInfo' },
    { name: '보유 위스키', type: 'getWhisky' },
    { name: '줄서기', type: 'que' },
  ];

  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setTabChosen(type);

  return (
    <Layout>
      <DetailHeader korname={barDetail.상호명} />
      <ImageDiv>
        <Image width={'360px'} height={'360px'} src={data?.biz_photo.slice(2, -2)} alt={''} />
      </ImageDiv>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      <TabSection>
        {data && tabChosen === 'barInfo' && <DetailInfo info={barDetail} />}
        {tabChosen === 'getWhisky' && <DetailList />}
        {tabChosen === 'que' && <UserQuePage />}
      </TabSection>
    </Layout>
  );
};

export default StoreDetail;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 328px;
  width: 360px;
  margin-left: -17px;
  overflow: hidden;
  & > img {
    object-fit: cover;
  }
`;

const TabSection = styled.section`
  padding-top: 15px;
`;
