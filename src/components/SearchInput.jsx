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
  const onBeforeClickHandler = () => navigate(-1);

  return (
    <InputWrapDiv onClick={onSearchClickHandler}>
      {searchtype === 'after' ? <LeftIcon onClick={onBeforeClickHandler} /> : ''}
      <CommonInput searchtype={searchtype} value={value} onChange={onchange} placeholder={placeholder} {...rest} />
      <SearchIcon float={searchtype === 'after' ? 'right' : 'left'} onClick={onclick} />
    </InputWrapDiv>
  );
};

export default SearchInput;

const searchTypeHandler = (searchtype) => {
  switch (searchtype) {
    case 'before':
      return 'width: 20.625rem; padding: 0.75rem 1px 0.75rem 3rem;';
    case 'after':
      return 'width: 18.438rem; margin-left: 2rem; padding: 0.75rem 3rem 0.75rem 1rem; background-color: #f3f3f3';
    default:
      return '';
  }
};

const iconFloatHandler = (float) => {
  switch (float) {
    case 'left':
      return 'left: 1.125rem;';
    default:
      return 'right: 1.125rem; cursor: pointer;';
  }
};

const InputWrapDiv = styled.div`
  margin: 0.813rem 0;
  display: flex;
  align-items: center;
  position: relative;
`;

const CommonInput = styled.input`
  ${(props) => searchTypeHandler(props.searchtype)};
  height: 2.5rem;
  position: relative;
  border-radius: 0.75rem;
  font-size: 0.938rem;
  &:focus {
    outline: none;
  }
`;

const LeftIcon = styled(BsChevronLeft)`
  margin-right: 0.5rem;
  position: absolute;
  font-size: 1.25rem;
  cursor: pointer;
`;

const SearchIcon = styled(GrSearch)`
  ${(props) => iconFloatHandler(props.float)};
  position: absolute;
  top: 0.688rem;
  font-size: 1.25rem;
`;
