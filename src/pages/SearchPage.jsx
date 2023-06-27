import React, { useCallback, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { getKeywordList, getTrendingList } from '../api/whisky';
import { Layout, SearchInput, DetailList } from '../components';

const SearchPage = () => {
  const [userInput, setUserInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommedList] = useState(null);
  const [trendingList, setTrendingList] = useState(null);

  // * [인기검색어] 조회
  const { data } = useQuery('getTrendingList', () => getTrendingList());

  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    if (url === '/SearchPage' && data) {
      setTrendingList(data);
    }
  }, [data]);

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
    if (e.target.value.length === 0) {
      setUserInput('');
      setKeywordData('');
      setRecommedList(null);
    }
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
        toast.error(`검색어는 한글과 영문을 혼합하거나 특수문자, 공백을 포함할 수 없습니다.`);
      } else if (keyword) {
        searchKeywordMutation.mutate(keyword);
      }
    };
    searchKeywordHandler();
  }, [keyword]);

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
      {((trendingList && !recommendList) || !userInput) && (
        <>
          <TrendingH1>{'인기검색어 Top 10'}</TrendingH1>
          <DetailList list={trendingList} />
        </>
      )}
      {recommendList && <DetailList list={recommendList} />}
    </Layout>
  );
};

export default SearchPage;

const TrendingH1 = styled.h1`
  margin: 20px 0 15px 10px;
  font-size: 20px;
  font-weight: 700;
`;
