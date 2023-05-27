import React, { useState } from 'react';
import { styled } from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import { Layout, TabMenu, SearchInput, CategorySelect, LikeIcon, Image } from '../components';

const WhiskyList = () => {
  const tabGroup = [
    { name: '전체', type: 'all' },
    { name: '나라별', type: 'country' },
    { name: '재료별', type: 'ingredient' },
    { name: '블렌딩별', type: 'blending' },
  ];

  const [whichTabChosen, setWhichTabChosen] = useState(tabGroup[0].type);

  const countryTestList = ['전체', '스페이사이드', '하이랜드', '로우랜드', '캠벨타운', '아일라', '기타'];
  const ingredientTestList = ['전체', '몰트 위스키', '그레인 위스키', '블렌디드 위스키', '기타'];
  const blendingTestList = ['전체', '기타'];

  // ? setState 처리해서 넘길 때 e.preventDefault를 쓸지 말지?
  const onTabClickHandler = (type) => setWhichTabChosen(type);

  return (
    <Layout>
      <Header>
        <div>
          <p>다위스키 로고</p>
          <LikeListIcon />
        </div>
        <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      </Header>
      <TabMenu tabgroup={tabGroup} whichtabchosen={whichTabChosen} ontabclickhandler={onTabClickHandler} />
      {/* TODO 카테고리 정해지면 list 어떻게 공통화 처리할지 고민해보기 */}
      <CategorySection>
        <CategorySelect category={'지역'} list={countryTestList} />
        <CategorySelect category={'지역'} list={ingredientTestList} />
        <CategorySelect category={'지역'} list={blendingTestList} />
      </CategorySection>
      {/* TODO 작업 완료하면 image 컴포넌트로 빼기 */}
      <WhiskyListSection>
        <WhiskyDataDiv>
          <Image width={'155px'} height={'155px'} borderradius={'5px'} src={''} alt={''} />
          <h1>위스키 이름</h1>
          <div>
            <h3>Whisky name</h3>
            <h2>48% vol</h2>
          </div>
          <div>
            <LikeIcon />
          </div>
        </WhiskyDataDiv>
      </WhiskyListSection>
    </Layout>
  );
};

export default WhiskyList;

// * 헤더
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
  margin: 20px 0 40px 0;
  display: flex;
  gap: 8px;
`;

const WhiskyListSection = styled.section`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-gap: 25px 15px;
`;

const WhiskyDataDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  & div {
    display: flex;
    justify-content: space-between;
  }
  &:nth-child(1) > div:last-child {
    position: absolute;
    top: 8px;
    right: 10px;
  }
  & h1 {
    width: 155px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h2 {
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
  }
  & h3 {
    width: 100px;
    font-size: 14px;
    line-height: 16px;
    color: #8f8f8f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
