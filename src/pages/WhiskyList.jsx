import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { getWhiskyList } from '../api/whisky';
import { Layout, Image, TabMenu, SearchInput, CategorySelect, WhiskyGrid } from '../components';
import { NoneData } from './statusPage';
import { logo } from '../assets';

const WhiskyList = () => {
  // * 나라별 탭 + 상세 카테고리
  const [categorization, setCategorization] = useState({
    page: '1',
    pageSize: '700',
    country: '',
    type: '',
    region: '',
  });

  // * 나라별 탭
  const tabGroup = [
    { name: '전체', type: 'all' },
    { name: '스카치', type: 'Scotland' },
    { name: '아메리칸', type: 'usa' },
    { name: '아이리쉬', type: 'Ireland' },
    { name: '캐내디언', type: 'Canadian' },
    { name: '재패니스', type: 'Japan' },
    { name: '그 외', type: 'etc' },
  ];

  // * 상세 카테고리
  const typeList = ['전체', '싱글 몰트', '싱글 그레인', '블렌디드 몰트', '블렌디드', '그 외'];
  const regionList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '그 외'];
  const americantList = ['전체', '버번', '라이', '테네시', '그 외'];

  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [region, setRegion] = useState(regionList[0]);
  const [blend, setBlend] = useState(typeList[0]);
  const [american, setAmerican] = useState(americantList[0]);
  const [whiskyList, setWhiskyList] = useState(null);

  const navigate = useNavigate();

  // * [나라별 tab] click 이벤트
  const onTabClickHandler = (type) => {
    setTabChosen(type);
    setCategorization((prev) => ({ ...prev, country: '', type: '', region: '' }));
    setRegion(regionList[0]);
    setBlend(typeList[0]);
    setAmerican(americantList[0]);
  };

  // * [상세 type] click 이벤트
  const onTypeClickHandler = (idx, item) => {
    setBlend(typeList[idx]);
    if (item === '전체') setCategorization((prev) => ({ ...prev, type: '' }));
    if (item === '싱글 몰트') setCategorization((prev) => ({ ...prev, type: 'Single Malt Whisky' }));
    if (item === '싱글 그레인') setCategorization((prev) => ({ ...prev, type: 'Single Grain Whisky' }));
    if (item === '블렌디드 몰트') setCategorization((prev) => ({ ...prev, type: 'Blended Malt Whisky' }));
    if (item === '블렌디드') setCategorization((prev) => ({ ...prev, type: 'Blended Whisky' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, type: 'etc' }));
  };

  const onRegionClickHandler = (idx, item) => {
    setRegion(regionList[idx]);
    if (item === '전체') setCategorization((prev) => ({ ...prev, region: '' }));
    if (item === '스페이사이드') setCategorization((prev) => ({ ...prev, region: 'Speyside' }));
    if (item === '하이랜드') setCategorization((prev) => ({ ...prev, region: 'Highlands' }));
    if (item === '로우랜드') setCategorization((prev) => ({ ...prev, region: 'Lowlands' }));
    if (item === '캠벨타운') setCategorization((prev) => ({ ...prev, region: 'Campbeltown' }));
    if (item === '아일라') setCategorization((prev) => ({ ...prev, region: 'Islay' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, region: 'etc' }));
  };

  const onAmericanClickHandler = (idx, item) => {
    setAmerican(americantList[idx]);
    if (item === '전체') setCategorization((prev) => ({ ...prev, type: '' }));
    if (item === '버번') setCategorization((prev) => ({ ...prev, type: 'Bourbon' }));
    if (item === '라이') setCategorization((prev) => ({ ...prev, type: 'Rye' }));
    if (item === '테네시') setCategorization((prev) => ({ ...prev, type: 'Rye' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, type: 'Tennessee' }));
  };

  // * 위스키 리스트 조회
  useQuery(['getStoreWhiskyList', categorization], () => getWhiskyList(categorization), {
    onSuccess: (response) => {
      setWhiskyList(response);
    },
  });

  // * 좋아요 리스트 버튼 클릭
  const onLikeListClickHandler = () => {
    navigate(`/LikeList`);
  };

  return (
    <Layout>
      <Header>
        <div>
          <Image width={'8.125rem'} height={'2.188rem'} borderradius={'none'} src={logo} alt={'DAWHISKY LOGO'} />
          <LikeListIcon onClick={onLikeListClickHandler} />
        </div>
        <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      </Header>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />

      {tabChosen === 'Scotland' && (
        <CategorySection>
          <CategorySelect
            category={blend === '전체' ? '블렌드별' : blend}
            list={typeList}
            categorychosen={blend}
            onclickhandler={onTypeClickHandler}
          />
          <CategorySelect
            category={region === '전체' ? '지역별' : region}
            list={regionList}
            categorychosen={region}
            onclickhandler={onRegionClickHandler}
          />
        </CategorySection>
      )}
      {tabChosen === 'usa' && (
        <CategorySection>
          <CategorySelect
            category={american === '전체' ? '분류' : american}
            list={americantList}
            categorychosen={american}
            onclickhandler={onAmericanClickHandler}
          />
        </CategorySection>
      )}
      {tabChosen === 'Japan' && (
        <CategorySection>
          <CategorySelect
            category={blend === '전체' ? '블렌드별' : blend}
            list={typeList}
            categorychosen={blend}
            onclickhandler={onTypeClickHandler}
          />
        </CategorySection>
      )}
      {whiskyList && (!whiskyList || whiskyList.length === 0) && (
        <NoneData>{'카테고리에 일치하는 위스키가 없어요'}</NoneData>
      )}
      {whiskyList && whiskyList.length !== 0 && <WhiskyGrid list={whiskyList} />}
    </Layout>
  );
};

export default WhiskyList;

const Header = styled.header`
  width: 22.5rem;
  margin-left: -1rem;
  padding: 2.188rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.darkBrown};
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  & div:first-child {
    padding-bottom: 0.3rem;
    padding-left: 0.188rem;
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
