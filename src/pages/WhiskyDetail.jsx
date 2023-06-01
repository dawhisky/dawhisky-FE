import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getWhiskyDetail, getWhiskyStore, getWhiskyComment } from '../api/whisky';
import { Layout, DetailHeader, DetailInfo, DetailList, Image, TabMenu } from '../components';
import WhiskyComment from './WhiskyComment';

const WhiskyDetail = () => {
  const tabGroup = [
    { name: '상세 정보', type: 'detail' },
    { name: '위스키 바', type: 'bar' },
    { name: '코멘트', type: 'comment' },
  ];

  const location = useLocation();
  const whiskyId = location.pathname.slice(14);

  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [whiskyDetail, setWhiskyDetail] = useState(null);
  const [whiskyInfo, setWhiskyInfo] = useState(null);
  const [whiskyStore, setWhiskyStore] = useState(null);
  const [whiskyComment, setWhiskyComment] = useState('');

  const onTabClickHandler = (type) => setTabChosen(type);

  // * [위스키 디테일] 조회 useMutation
  const getWhiskyDetailMutation = useMutation(getWhiskyDetail, {
    onSuccess: (response) => {
      setWhiskyDetail(response);
      setWhiskyInfo({
        지역: `${response.whisky_country} | ${response.whisky_region}`,
        타입: response.whisky_type,
        숙성연도: response.whisky_age,
        도수: `${response.whisky_abv} vol`,
        상세설명: response.whisky_desc,
      });
    },
  });

  // * [위스키 디테일] 조회
  const getWhiskyDetailHandler = () => {
    getWhiskyDetailMutation.mutate(whiskyId);
  };

  // * [위스키 코멘트] 조회 useMutation
  const getWhiskyCommentMutation = useMutation(getWhiskyComment, {
    onSuccess: (response) => {
      setWhiskyComment(response);
    },
  });

  // * [위스키 코멘트] 조회
  const getWhiskyCommentHandler = () => {
    getWhiskyCommentMutation.mutate(whiskyId);
  };

  // * [위스키 보유 스토어] 조회 useMutation
  const getWhiskyStoreMutation = useMutation(getWhiskyStore, {
    onSuccess: (response) => {
      setWhiskyStore(response);
    },
  });

  // * [위스키 보유 스토어] 조회
  const getWhiskyStoreHandler = () => {
    getWhiskyStoreMutation.mutate(whiskyId);
  };

  // * 페이지가 마운트될 때 위스키 디테일 데이터 조회
  useEffect(() => {
    getWhiskyDetailHandler();
    getWhiskyStoreHandler();
    getWhiskyCommentHandler();
  }, []);

  return (
    <Layout>
      {whiskyDetail && (
        <>
          <DetailHeader korname={whiskyDetail.whisky_kor} engname={whiskyDetail.whisky_eng} />
          <ImageDiv>
            <Image
              width={'360px'}
              height={'360px'}
              src={whiskyDetail.whisky_photo}
              alt={`${whiskyDetail.whisky_kor} 사진`}
            />
          </ImageDiv>
        </>
      )}
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      <TabSection>
        {tabChosen === 'detail' && whiskyInfo && <DetailInfo info={whiskyInfo} />}
        {tabChosen === 'bar' && <DetailList type={'store'} list={whiskyStore} />}
        {tabChosen === 'comment' && <WhiskyComment comment={whiskyComment} />}
      </TabSection>
    </Layout>
  );
};

export default WhiskyDetail;

const ImageDiv = styled.div`
  width: 360px;
  padding-top: 75px;
  margin-left: -17px;
`;

const TabSection = styled.section`
  padding-top: 15px;
`;
