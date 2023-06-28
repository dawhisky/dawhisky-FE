import React, { useEffect, useState, useRef } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiArrowUp } from 'react-icons/fi';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { setWhiskySelect, getWhiskySelect } from '../selectors/whiskySelectSelector';
import { getWhiskyList } from '../api/whisky';
import { Layout, Image, TabMenu, SearchInput, CategorySelect } from '../components';
import { NoneData } from './statusPage';
import BeginnerPage from './BeginnerPage';
import { logo } from '../assets';

const WhiskyList = () => {
  // * 나라별 탭 + 상세 카테고리
  const [categorization, setCategorization] = useState({
    page: '1',
    pageSize: '10',
    like: 'n',
    country: '',
    type: '',
    region: '',
  });

  // * 나라별 탭
  const tabGroup = [
    { name: '전체', type: 'all' },
    { name: '입문자 추천', type: 'beginner' },
    { name: '스카치', type: 'Scotland' },
    { name: '아메리칸', type: 'usa' },
    { name: '아이리쉬', type: 'Ireland' },
    { name: '캐내디언', type: 'Canada' },
    { name: '재패니스', type: 'Japan' },
    { name: '그 외', type: 'etc' },
  ];

  // * 상세 카테고리
  const likeList = ['기본순', '좋아요순'];
  const typeList = ['전체', '싱글 몰트', '싱글 그레인', '블렌디드 몰트', '블렌디드', '그 외'];
  const regionList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '그 외'];
  const americantList = ['전체', '버번', '라이', '테네시', '그 외'];

  const getWhiskyValue = useRecoilValue(getWhiskySelect);
  const setWhiskyValue = useSetRecoilState(setWhiskySelect);
  const [tabChosen, setTabChosen] = useState(tabGroup[getWhiskyValue].type);
  const [like, setLike] = useState(likeList[0]);
  const [region, setRegion] = useState(regionList[0]);
  const [blend, setBlend] = useState(typeList[0]);
  const [american, setAmerican] = useState(americantList[0]);
  const [whiskyList, setWhiskyList] = useState([]);
  const [observerRef, inView] = useInView();
  const [lastPage, setLastPage] = useState(null);

  const navigate = useNavigate();
  const whiskyListSection = useRef(null);

  // * [to the top] click 이벤트
  const toTheTopEvent = () => whiskyListSection.current.scrollIntoView({ top: 0, behavior: 'smooth' });

  // * [나라별 tab] click 이벤트
  const onTabClickHandler = (type) => {
    setTabChosen(type);
    if (type === 'all') {
      setCategorization((prev) => ({
        ...prev,
        page: '1',
        like: 'n',
        country: '',
        type: '',
        region: '',
      }));
    } else {
      setCategorization((prev) => ({
        ...prev,
        page: '1',
        like: 'n',
        country: type,
        type: '',
        region: '',
      }));
    }
    setWhiskyList([]);
    setWhiskyValue(tabGroup.findIndex((item) => item.type === type));
    setLike(likeList[0]);
    setRegion(regionList[0]);
    setBlend(typeList[0]);
    setAmerican(americantList[0]);
  };

  // * [상세 type] click 이벤트
  const onLikeClickHandler = (idx, item) => {
    setLike(likeList[idx]);
    if (item === '기본순') setCategorization((prev) => ({ ...prev, like: 'n', page: '1' }));
    if (item === '좋아요순') setCategorization((prev) => ({ ...prev, like: 'y', page: '1' }));
  };

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
    if (item === '테네시') setCategorization((prev) => ({ ...prev, type: 'Tennessee' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, type: 'etc' }));
  };

  // * [좋아요 내역] click 이벤트
  const onLikeListClickHandler = () => navigate(`/LikeList`);

  // * [위스키 디테일] click 이벤트
  const onWhiskyClickHandler = (id) => navigate(`/WhiskyDetail/${id}`);

  // * [위스키 리스트] 조회 & 무한 스크롤
  const getInfiniteData = {
    fetchWithScroll: async (pageParam, category) => {
      const list = await getWhiskyList(category);
      const listData = list.filter((_, idx) => idx <= list.length - 2);
      const getLastPage = list[list.length - 1];
      setLastPage(getLastPage);
      return { list: listData, nextPage: +pageParam + 1, lastPage: getLastPage };
    },
  };

  const { fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['getStoreWhiskyList', categorization],
    ({ pageParam = categorization.page }) => getInfiniteData.fetchWithScroll(pageParam, categorization),
    {
      onSuccess: (response) => {
        const currentPage = response.pages[0];
        if (inView && currentPage && lastPage !== 0) {
          setWhiskyList((prev) => [...prev, ...currentPage.list]);
          setCategorization((prev) => ({ ...prev, page: currentPage.nextPage }));
        }
      },
      retry: false,
    },
  );

  useEffect(() => {
    if (inView && !isFetchingNextPage && lastPage !== 0 && categorization.page <= lastPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, categorization.page, lastPage]);

  return (
    <Layout>
      <div ref={whiskyListSection}>{''}</div>
      <Header>
        <div>
          <Image width={'130px'} height={'35px'} borderradius={'none'} src={logo} alt={'DAWHISKY LOGO'} />
          <LikeListIcon onClick={onLikeListClickHandler} />
        </div>
        <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      </Header>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />

      {/* // ! 06-26 무한스크롤 + 카테고리 중복 적용 시 api 이중 호출 오류로 임시 주석 처리 */}
      {/* {tabChosen === 'all' && (
        <CategorySection>
          <CategorySelect category={like} list={likeList} categorychosen={like} onclickhandler={onLikeClickHandler} />
        </CategorySection>
      )}
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
      )} */}
      {tabChosen === 'beginner' && <BeginnerPage>{'gg'}</BeginnerPage>}
      {whiskyList.length === 0 && tabChosen !== 'beginner' && (
        <NoneData height={'50vh'}>{'카테고리에 일치하는 위스키가 없어요'}</NoneData>
      )}
      <WhiskyListSection>
        {whiskyList &&
          whiskyList.length !== 0 &&
          whiskyList.map((item) => (
            <WhiskyDataDiv key={item.whisky_id} onClick={() => onWhiskyClickHandler(item.whisky_id)}>
              <ImageWrapDiv>
                <Image
                  width={'150px'}
                  height={'150px'}
                  borderradius={'5px'}
                  src={item.whisky_photo}
                  alt={`${item.whisky_kor} 사진`}
                />
              </ImageWrapDiv>
              <h1>{item.whisky_kor}</h1>
              <div>
                <h2>{item.whisky_eng}</h2>
                <h3>{`${item.whisky_abv} vol`}</h3>
              </div>
            </WhiskyDataDiv>
          ))}
      </WhiskyListSection>
      <div ref={observerRef} />
      <ToTheTopButton button={'button'} onClick={() => toTheTopEvent()}>
        <FiArrowUp />
      </ToTheTopButton>
    </Layout>
  );
};

export default WhiskyList;

const Header = styled.header`
  width: 360px;
  margin-left: -16px;
  padding: 35px 16px 0 16px;
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
    padding-bottom: 5px;
    padding-left: 3px;
  }
`;

const LikeListIcon = styled(AiOutlineHeart)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const CategorySection = styled.section`
  margin-bottom: 30px;
  display: flex;
  gap: 8px;
`;

const WhiskyListSection = styled.section`
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-gap: 30px 22px;
`;

const WhiskyDataDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  & div:last-child {
    display: flex;
    justify-content: space-between;
  }
  & h1 {
    width: 155px;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h2 {
    width: 100px;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.darkGray};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h3 {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const ImageWrapDiv = styled.div`
  width: 155px;
  height: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 4px -5px;
`;

const ToTheTopButton = styled.button`
  width: 50px;
  height: 50px;
  padding-top: 5.5px;
  position: fixed;
  right: 50%;
  bottom: 10%;
  border-radius: 13px;
  background-color: rgba(144, 126, 11, 0.2);
  transform: translateX(calc(336px / 2));
  opacity: 0.6;
  cursor: pointer;
  & {
    font-size: 30px;
  }
`;
