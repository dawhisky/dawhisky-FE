import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { getWhiskyList, getWhiskyCountryList } from '../api/whisky';
import { Layout, Image, TabMenu, SearchInput, CategorySelect, WhiskyGrid } from '../components';
import { logo } from '../assets';
import userFlagCheck from '../hook/userFlagCheck';

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

  const navigate = useNavigate();

  const onTabClickHandler = (type) => setTabChosen(type);

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

  const regionList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '그 외'];
  const blendList = ['전체', '싱글 몰트', '싱글 그레인', '블렌디드 몰트', '그 외'];
  const americantList = ['전체', '버번', '라이', '테네시', '그 외'];
  const [region, setRegion] = useState(regionList[0]);
  const [blend, setBlend] = useState(blendList[0]);
  const [american, setAmerican] = useState(americantList[0]);
  const onRegionClickHandler = (idx) => setRegion(regionList[idx]);
  const onBlendClickHandler = (idx) => setBlend(blendList[idx]);
  const onAmericanClickHandler = (idx) => setAmerican(americantList[idx]);

  return (
    <Layout>
      <Header>
        <div>
          <Image width={'8.125rem'} height={'2.188rem'} borderradius={'none'} src={logo} alt={'DAWHISKY LOGO'} />
          <LikeListIcon />
        </div>
        <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      </Header>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />

      {tabChosen === 'scotch' && (
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
      )}
      <WhiskyGrid list={whiskyList} />
    </Layout>
  );
};

export default WhiskyList;

const Header = styled.header`
  width: 22.5rem;
  margin-left: -1rem;
  padding: 2.188rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.darkBrown};
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const LikeListIcon = styled(AiOutlineHeart)`
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
`;

const CategorySection = styled.section`
  margin-bottom: 1.875rem;
  display: flex;
  gap: 0.5rem;
`;
