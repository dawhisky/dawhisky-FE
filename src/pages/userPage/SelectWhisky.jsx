import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { SearchInput, CategorySelect, DetailList } from '../../components';
import { getWhiskyList } from '../../api/whisky';

const SelectWhisky = () => {
  // * 위스키 카테고리
  const countryList = ['전체', '스카치', '아메리칸', '아이리쉬', '캐내디언', '재패니스', '그 외'];
  const regionList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '그 외'];
  const typeList = ['전체', '싱글 몰트', '싱글 그레인', '블렌디드 몰트', '블렌디드', '그 외'];

  const [country, setCountry] = useState(countryList[0]);
  const [region, setRegion] = useState(regionList[0]);
  const [type, setType] = useState(typeList[0]);
  const [categorization, setCategorization] = useState({
    page: '1',
    pageSize: '700',
    country: '',
    type: '',
    region: '',
  });
  const [whiskyList, setWhiskyList] = useState(null);

  // * [위스키 조회] 위스키 전체/카테고리별 조회
  useQuery(['getStoreWhiskyList', categorization], () => getWhiskyList(categorization), {
    onSuccess: (response) => {
      setWhiskyList(response);
    },
  });

  // * [상세 카테고리] click 이벤트
  const onCountryClickHandler = (idx, item) => {
    setCountry(countryList[idx]);
    if (item === '전체') setCategorization((prev) => ({ ...prev, country: '' }));
    if (item === '스카치') setCategorization((prev) => ({ ...prev, country: 'Scotland' }));
    if (item === '아메리칸') setCategorization((prev) => ({ ...prev, country: 'usa' }));
    if (item === '아이리쉬') setCategorization((prev) => ({ ...prev, country: 'Ireland' }));
    if (item === '캐내디언') setCategorization((prev) => ({ ...prev, country: 'Japan' }));
    if (item === '재패니스') setCategorization((prev) => ({ ...prev, country: 'Canada' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, country: 'etc' }));
  };
  const onTypeClickHandler = (idx, item) => {
    setType(typeList[idx]);
    if (item === '전체') setCategorization((prev) => ({ ...prev, type: '' }));
    if (item === '싱글 몰트') setCategorization((prev) => ({ ...prev, type: 'Single Malt Whisky' }));
    if (item === '싱글 그레인') setCategorization((prev) => ({ ...prev, type: 'Single Grain Whisky' }));
    if (item === '블렌디드 몰트') setCategorization((prev) => ({ ...prev, type: 'Blended Malt Whisky' }));
    if (item === '블렌디드') setCategorization((prev) => ({ ...prev, type: 'Blended Whisky' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, type: 'etc' }));
  };
  const onRegionClickHandler = (idx, item) => {
    setRegion(regionList[idx]);
    if (item === '전체') setCategorization((prev) => ({ ...prev, type: '' }));
    if (item === '버번') setCategorization((prev) => ({ ...prev, type: 'Bourbon' }));
    if (item === '라이') setCategorization((prev) => ({ ...prev, type: 'Rye' }));
    if (item === '테네시') setCategorization((prev) => ({ ...prev, type: 'Rye' }));
    if (item === '그 외') setCategorization((prev) => ({ ...prev, type: 'Tennessee' }));
  };

  return (
    <>
      <SearchInput searchtype={'before'} color={'gray'} placeholder={'코멘트를 남길 위스키를 검색해보세요!'} />
      <CategorySection>
        <CategorySelect
          category={country === '전체' ? '나라별' : country}
          list={countryList}
          categorychosen={country}
          onclickhandler={onCountryClickHandler}
        />
        <CategorySelect
          category={type === '전체' ? '블렌드별' : type}
          list={typeList}
          categorychosen={type}
          onclickhandler={onTypeClickHandler}
        />
        <CategorySelect
          category={region === '전체' ? '지역별' : region}
          list={regionList}
          categorychosen={region}
          onclickhandler={onRegionClickHandler}
        />
      </CategorySection>
      {whiskyList && <DetailList list={whiskyList} />}
    </>
  );
};

export default SelectWhisky;

const CategorySection = styled.section`
  margin-bottom: 1.875rem;
  display: flex;
  gap: 0.5rem;
`;
