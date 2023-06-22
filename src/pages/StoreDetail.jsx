import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { styled } from 'styled-components';
import { Layout, DetailHeader, DetailInfo, DetailList, Image, TabMenu } from '../components';
import UserQuePage from './UserQuePage';
import { getStoreWhiskyList } from '../api/store';
import { getStoreInfo } from '../api/storeInfo';

const StoreDetail = () => {
  const [storeWhiskyList, setStoreWhiskyList] = useState([]);

  // * Store ID Url에서 get
  const location = useLocation();
  const storeId = location.pathname.slice(13);

  // * tab 구분
  const tabGroup = [
    { name: '상세 정보', type: 'barInfo' },
    { name: '보유 위스키', type: 'getWhisky' },
    { name: '줄서기', type: 'que' },
  ];

  const [tabChosen, setTabChosen] = useState(location.state ? tabGroup[location.state.idx].type : tabGroup[0].type);

  // * [상세 정보 tab] 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getStoreInfo', () => getStoreInfo(storeId));

  // * [상세 정보 tab] 해당 스토어 정보 상태관리
  const [barDetail, setBarDetail] = useState({});

  // * [보유 위스키 tab] 조회 useMutation
  const getStoreWhiskyMutation = useMutation(getStoreWhiskyList, {
    onSuccess: (response) => setStoreWhiskyList(response),
  });

  // * [보유 위스키 tab] 조회
  const getStoreWhisky = () => getStoreWhiskyMutation.mutate(storeId);

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

  // * [줄서기 tab] 클릭 시 로그인/회원 구분에 따라 분기 처리
  const onTabClickHandler = (type) => setTabChosen(type);

  // * 페이지가 마운트될 때 스토어에서 보유한 위스키 조회
  useEffect(() => {
    getStoreWhisky();
  }, []);

  return (
    <Layout>
      {data && (
        <>
          <DetailHeader korname={data.store} like={data.liked} />
          <ImageDiv>
            <Image width={'22.5rem'} height={'22.5rem'} src={data.biz_photo} alt={`${data.store} 대표 이미지`} />
          </ImageDiv>
          <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />

          <TabSection>
            {data && tabChosen === 'barInfo' && <DetailInfo info={barDetail} />}
            {tabChosen === 'getWhisky' && <DetailList list={storeWhiskyList} />}
            {tabChosen === 'que' && <UserQuePage />}
          </TabSection>
        </>
      )}
    </Layout>
  );
};

export default StoreDetail;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20.5rem;
  width: 22.5rem;
  margin-left: -1.063rem;
  overflow: hidden;
  & > img {
    object-fit: cover;
  }
`;

const TabSection = styled.section``;
