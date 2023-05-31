import React from 'react';
import { styled } from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { MdCancel } from 'react-icons/md';
import { BsChevronLeft } from 'react-icons/bs';

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

const SearchInput = ({ placeholder, searchtype, ...rest }) => {
  return (
    <InputWrapDiv>
      {searchtype === 'after' ? <LeftIcon /> : ''}
      <CommonInput searchtype={searchtype} placeholder={placeholder} />
      {searchtype === 'after' ? <CancelIcon {...rest} /> : <SearchIcon {...rest} />}
    </InputWrapDiv>
  );
};

export default SearchInput;

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
  position: absolute;
  top: 11px;
  left: 18px;
  font-size: 20px;
`;

const CancelIcon = styled(MdCancel)`
  position: absolute;
  color: #d9d9d9;
  right: 12px;
  font-size: 20px;
  cursor: pointer;
`;
