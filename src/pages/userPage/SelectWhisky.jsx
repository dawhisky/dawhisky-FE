import React from 'react';
import { useQuery } from 'react-query';
import { SearchInput, DetailList } from '../../components';
import { getWhiskyList } from '../../api/whisky';

const SelectWhisky = () => {
  const { data } = useQuery('getWhiskyList', () => getWhiskyList());

  return (
    <>
      <SearchInput searchtype={'before'} placeholder={'위스키를 검색해보세요!'} />
      {data && <DetailList list={data} />}
    </>
  );
};

export default SelectWhisky;
