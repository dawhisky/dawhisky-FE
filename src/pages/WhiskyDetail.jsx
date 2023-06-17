import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getWhiskyDetail, getWhiskyStore, getWhiskyComment } from '../api/whisky';
import { Layout, DetailHeader, DetailInfo, DetailList, Image, TabMenu, RoundButton } from '../components';
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
  const [isWhiskyLike, setIsWhiskyLike] = useState(false);
  const [whiskyDetail, setWhiskyDetail] = useState(null);
  const [whiskyInfo, setWhiskyInfo] = useState(null);
  const [whiskyStore, setWhiskyStore] = useState(null);
  const [whiskyComment, setWhiskyComment] = useState([]);

  const onTabClickHandler = (type) => setTabChosen(type);

  // * [위스키 디테일] 조회 useMutation
  const getWhiskyDetailMutation = useMutation(getWhiskyDetail, {
    onSuccess: (response) => {
      setWhiskyDetail(response);
      setWhiskyInfo({
        지역: `${response.whiskyInfo.whisky_country || '미상'} | ${response.whiskyInfo.whisky_region || '미상'}`,
        타입: response.whiskyInfo.whisky_type || '미상',
        숙성연도: response.whiskyInfo.whisky_age || '미상',
        도수: `${response.whiskyInfo.whisky_abv} vol` || '미상',
        상세설명: response.whiskyInfo.whisky_desc,
      });
      setIsWhiskyLike(response.liked);
    },
  });

  // * [위스키 디테일] 조회
  const getWhiskyDetailHandler = () => getWhiskyDetailMutation.mutate(whiskyId);

  // * [위스키 코멘트] 조회 useMutation
  const getWhiskyCommentMutation = useMutation(getWhiskyComment, {
    onSuccess: (response) => setWhiskyComment(response),
  });

  // * [위스키 코멘트] 조회
  const getWhiskyCommentHandler = () => getWhiskyCommentMutation.mutate(whiskyId);

  // * [위스키 보유 스토어] 조회 useMutation
  const getWhiskyStoreMutation = useMutation(getWhiskyStore, {
    onSuccess: (response) => setWhiskyStore(response),
  });

  // * [위스키 보유 스토어] 조회
  const getWhiskyStoreHandler = () => getWhiskyStoreMutation.mutate(whiskyId);

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
          <DetailHeader
            korname={whiskyDetail.whiskyInfo.whisky_kor}
            engname={whiskyDetail.whiskyInfo.whisky_eng}
            like={isWhiskyLike}
            id={whiskyDetail.whiskyInfo.whisky_id}
          />
          <ImageDiv>
            <Image
              width={'360px'}
              height={'360px'}
              src={whiskyDetail.whiskyInfo.whisky_photo}
              alt={`${whiskyDetail.whiskyInfo.whisky_kor} 사진`}
            />
          </ImageDiv>
        </>
      )}
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      <TabSection>
        {tabChosen === 'detail' && whiskyInfo && <DetailInfo info={whiskyInfo} />}
        {tabChosen === 'bar' && whiskyStore && <DetailList type={'store'} list={whiskyStore} />}
        {tabChosen === 'comment' && whiskyComment && <WhiskyComment comment={whiskyComment} />}
      </TabSection>
      <RoundButton />
    </Layout>
  );
};

export default WhiskyDetail;

const ImageDiv = styled.div`
  width: 22.5rem;
  padding-top: 4.688rem;
  margin-left: -1.063rem;
`;

const TabSection = styled.section`
  padding: 0.938rem 0;
`;
