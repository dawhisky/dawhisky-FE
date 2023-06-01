import React, { useCallback, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import getKeywordList from '../api/whisky';
import { Layout, SearchInput } from '../components';
import { NoneData } from './statusPage';

const SearchPage = () => {
  const [userInput, setUserInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommedList] = useState(null);

  const navigate = useNavigate();

  // * [추천검색어] 커스텀 디바운스 함수
  const debounce = (callback, delay) => {
    let timerId = null;
    // * 3. 리턴문에 의해 아래의 함수를 반환
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  // * [추천검색어] 2. 디바운스 함수 호출
  const setKeywordData = useCallback(
    debounce((inputText) => {
      setKeyword(inputText);
    }, 1000),
    [],
  );

  // * [추천검색어] 1. input 값이 바뀔 때 userInput과 디바운스 함수에 해당 값 전달
  const onUserInputChangeHandler = (e) => {
    setUserInput(e.target.value);
    setKeywordData(e.target.value);
  };

  // * [추천검색어] 조회 useMutation
  const searchKeywordMutation = useMutation(getKeywordList, {
    onSuccess: (response) => setRecommedList(response),
  });

  // * [추천검색어] 조회 useEffect : keyword값이 변동될 때마다 디바운싱 거쳐 추천검색어 조회
  useEffect(() => {
    const searchKeywordHandler = async () => {
      if (!/^[ㄱ-ㅎ가-힣0-9]*$|^[a-zA-Z0-9]*$/g.test(userInput)) {
        alert(`검색어는 한글과 영문을 혼합하거나 특수문자, 공백을 포함할 수 없습니다.`);
      } else if (keyword) {
        searchKeywordMutation.mutate(keyword);
      }
    };
    searchKeywordHandler();
  }, [keyword]);

  // * 추천검색어 click : 해당 위스키 상세 페이지로 이동
  const onRecommendClickHandler = (id) => navigate(`/WhiskyDetail/${id}`);

  // * [키워드 검색]
  const onSearchClickHandler = () => searchKeywordMutation.mutate(userInput);

  return (
    <Layout>
      <SearchInput
        searchtype={'after'}
        value={userInput}
        onchange={onUserInputChangeHandler}
        onclick={onSearchClickHandler}
        placeholder={'위스키를 검색해보세요!'}
      />
      <RecommendUl>
        {recommendList && recommendList.length === 0 && <NoneData>일치하는 검색어가 없어요</NoneData>}
        {recommendList &&
          recommendList.length !== 0 &&
          recommendList.map((item) => (
            <RecommendLi key={item.whisky_id} onClick={() => onRecommendClickHandler(item.whisky_id)}>
              <GrSearch />
              <p>{item.whisky_eng ? item.whisky_eng : item.whisky_kor}</p>
            </RecommendLi>
          ))}
      </RecommendUl>
    </Layout>
  );
};

export default SearchPage;

const RecommendUl = styled.ul`
  margin-top: 30px;
  margin-left: 5px;
`;

const RecommendLi = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  cursor: pointer;
`;
