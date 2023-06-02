import React from 'react';
import { styled } from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// ! [props]
// * placeholder : input에 넣을 placeholder
// * searchtype : before은 검색 input, after는 검색 상세페이지로 넘어간 후의 input

const SearchInput = ({ searchtype, value, onchange, onclick, placeholder, ...rest }) => {
  const navigate = useNavigate();

  const onSearchClickHandler = () => navigate(`/SearchPage`);
  // TODO 검색 내역이 여러개일 경우 -1이 원하는 이전 페이지로 가지 않아 추후 리팩토링 필요
  const onBeforeClickHandler = () => navigate(-1);

  return (
    <InputWrapDiv onClick={onSearchClickHandler}>
      {searchtype === 'after' ? <LeftIcon onClick={onBeforeClickHandler} /> : ''}
      <CommonInput searchtype={searchtype} value={value} onChange={onchange} placeholder={placeholder} />
      <SearchIcon float={searchtype === 'after' ? 'right' : 'left'} onClick={onclick} />
    </InputWrapDiv>
  );
};

export default SearchInput;

const searchTypeHandler = (searchtype) => {
  switch (searchtype) {
    case 'before':
      return 'width: 330px; padding: 12px 16px 12px 48px;';
    case 'after':
      return 'width: 295px; margin-left: 32px; padding: 12px 48px 12px 16px; background-color: #f3f3f3';
    default:
      return '';
  }
};

const iconFloatHandler = (float) => {
  switch (float) {
    case 'left':
      return 'left: 18px;';
    default:
      return 'right: 18px; cursor: pointer;';
  }
};

const InputWrapDiv = styled.div`
  margin: 20px 0 10px 0;
  display: flex;
  align-items: center;
  position: relative;
`;

const CommonInput = styled.input`
  ${(props) => searchTypeHandler(props.searchtype)};
  height: 40px;
  position: relative;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
`;

const LeftIcon = styled(BsChevronLeft)`
  margin-right: 8px;
  position: absolute;
  font-size: 20px;
  cursor: pointer;
`;

const SearchIcon = styled(GrSearch)`
  ${(props) => iconFloatHandler(props.float)};
  position: absolute;
  top: 11px;
  font-size: 20px;
`;
