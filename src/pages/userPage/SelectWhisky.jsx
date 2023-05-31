import React, { useState } from 'react';
import { styled } from 'styled-components';
import { SearchInput, CategorySelect, DetailList } from '../../components';

const SelectWhisky = () => {
  const countryList = ['전체', '스카치', '아메리칸', '아이리시', '캐나디안', '재패니스', '그 외'];
  const regionList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '그 외'];
  const blendList = ['전체', '싱글 몰트', '싱글 그레인', '블렌디드 몰트', '블렌디드 그레인', '블렌디드'];
  const americantList = ['전체', '버번', '라이', '테네시', '그 외'];

  const [country, setCountry] = useState(countryList[0]);
  const [region, setRegion] = useState(regionList[0]);
  const [blend, setBlend] = useState(blendList[0]);
  const [american, setAmerican] = useState(americantList[0]);

  const onCountryClickHandler = (idx) => setCountry(countryList[idx]);
  const onRegionClickHandler = (idx) => setRegion(regionList[idx]);
  const onBlendClickHandler = (idx) => setBlend(blendList[idx]);
  const onAmericanClickHandler = (idx) => setAmerican(americantList[idx]);

  return (
    <>
      <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      <CategorySection>
        <CategorySelect
          category={'나라'}
          list={countryList}
          categorychosen={country}
          onclickhandler={onCountryClickHandler}
        />
        {country === '스카치' && (
          <CategorySelect
            category={'지역별'}
            list={regionList}
            categorychosen={region}
            onclickhandler={onRegionClickHandler}
          />
        )}
        {(country === '스카치' || country === '재패니스') && (
          <CategorySelect
            category={'블렌드별'}
            list={blendList}
            categorychosen={blend}
            onclickhandler={onBlendClickHandler}
          />
        )}
        {country === '아메리칸' && (
          <CategorySelect
            category={'분류'}
            list={americantList}
            categorychosen={american}
            onclickhandler={onAmericanClickHandler}
          />
        )}
      </CategorySection>
      <DetailList />
    </>
  );
};

export default SelectWhisky;

const CategorySection = styled.section`
  margin-bottom: 30px;
  display: flex;
  gap: 8px;
`;
