import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { getWhiskyList, getWhiskyCountryList } from '../api/whisky';
import { Layout, TabMenu, SearchInput, CategorySelect, WhiskyGrid } from '../components';
import isLoginCheck from '../hook/isLoginCheck';

const WhiskyList = () => {
  // * 탭 그룹
  // TODO UI 정렬 위해 5개만 출력하고 나머지 주석 처리, 추후 슬라이드 가능한지 찾아보고 적용
  const tabGroup = [
    { name: '전체', type: 'all' },
    { name: '스카치', type: 'scotch' },
    { name: '아메리칸', type: 'american' },
    { name: '아이리시', type: 'irish' },
    // { name: '캐나디안', type: 'canadian' },
    // { name: '재패니스', type: 'japanese' },
    { name: '그 외', type: 'etc' },
  ];

  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [whiskyList, setWhiskyList] = useState(null);
  const [loginStatus, setLoginStatus] = useState({
    login: false,
    userFlag: '',
  });

  const navigate = useNavigate();

  const onTabClickHandler = (type) => setTabChosen(type);

  const onLikeListClickHandler = () => {
    const getToken = isLoginCheck();
    if (!getToken) {
      alert(`로그인이 필요한 페이지입니다.`);
      navigate(`/Login`);
    } else if (getToken.userFlag === 'user') {
      navigate(`/LikeList`);
    } else {
      alert(`사업자 회원은 좋아요한 목록 내역 열람이 불가합니다.`);
    }
  };

  // * [위스키 전체 리스트] 전체 tab 조회 useMutation
  const getWhiskyListMutation = useMutation(getWhiskyList, {
    onSuccess: (response) => {
      setWhiskyList(response);
    },
  });

  // * [위스키 전체 리스트] 전체 tab 조회
  const getWhiskyListHandler = () => {
    getWhiskyListMutation.mutate();
  };

  // * [위스키 선택 리스트] 나라 선택 tab 조회 useMutation
  const getWhiskyCountryListMutation = useMutation(getWhiskyCountryList, {
    onSuccess: (response) => {
      setWhiskyList(response);
    },
  });

  // * [위스키 선택 리스트] 나라 선택 tab 조회
  useEffect(() => {
    if (tabChosen === 'all') {
      getWhiskyListMutation.mutate();
    } else if (tabChosen === 'scotch') {
      getWhiskyCountryListMutation.mutate('Scotland');
    } else if (tabChosen === 'american') {
      getWhiskyCountryListMutation.mutate('usa');
    } else if (tabChosen === 'irish') {
      getWhiskyCountryListMutation.mutate('Ireland');
    } else if (tabChosen === 'etc') {
      getWhiskyCountryListMutation.mutate('etc');
    }
  }, [tabChosen]);

  // * 페이지가 마운트될 때 전체 tab 게시글 리스트 조회
  useEffect(() => {
    getWhiskyListHandler();
  }, []);

  // TODO [2차 스코프] 카테고리 세부 리스트 및 state, onTabClickHandler
  // const regionList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '그 외'];
  // const blendList = ['전체', '싱글 몰트', '싱글 그레인', '블렌디드 몰트', '블렌디드 그레인', '블렌디드'];
  // const americantList = ['전체', '버번', '라이', '테네시', '그 외'];
  // const [region, setRegion] = useState(regionList[0]);
  // const [blend, setBlend] = useState(blendList[0]);
  // const [american, setAmerican] = useState(americantList[0]);
  // const onRegionClickHandler = (idx) => setRegion(regionList[idx]);
  // const onBlendClickHandler = (idx) => setBlend(blendList[idx]);
  // const onAmericanClickHandler = (idx) => setAmerican(americantList[idx]);

  return (
    <Layout>
      <Header>
        <div>
          <p>DA WHISKY</p>
          <LikeListIcon onClick={onLikeListClickHandler} />
        </div>
        <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      </Header>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />

      {/* // TODO [2차 스코프] 카테고리 세부 Select */}
      {/* {tabChosen === 'scotch' && (
        <CategorySection>
          <CategorySelect
            category={'지역별'}
            list={regionList}
            categorychosen={region}
            onclickhandler={onRegionClickHandler}
          />
          <CategorySelect
            category={'블렌드별'}
            list={blendList}
            categorychosen={blend}
            onclickhandler={onBlendClickHandler}
          />
        </CategorySection>
      )}
      {tabChosen === 'american' && (
        <CategorySection>
          <CategorySelect
            category={'분류'}
            list={americantList}
            categorychosen={american}
            onclickhandler={onAmericanClickHandler}
          />
        </CategorySection>
      )}
      {tabChosen === 'japanese' && (
        <CategorySection>
          <CategorySelect
            category={'블렌드별'}
            list={blendList}
            categorychosen={blend}
            onclickhandler={onBlendClickHandler}
          />
        </CategorySection>
      )} */}
      <WhiskyGrid list={whiskyList} />
    </Layout>
  );
};

export default WhiskyList;

const Header = styled.header`
  width: 360px;
  margin-left: -16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  & p {
    font-size: 18px;
    font-weight: bold;
  }
`;

const LikeListIcon = styled(AiOutlineHeart)`
  font-size: 24px;
  cursor: pointer;
`;

const CategorySection = styled.section`
  margin-bottom: 30px;
  display: flex;
  gap: 8px;
`;
