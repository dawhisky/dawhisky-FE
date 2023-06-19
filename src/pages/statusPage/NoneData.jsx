import React from 'react';
import { styled } from 'styled-components';
import { CiFaceMeh } from 'react-icons/ci';
import { useLocation } from 'react-router-dom';

const NoneData = ({ children }) => {
  const location = useLocation();

  // * 로그인 하러 가기는 pathname으로 구분하여 show or hide
  return (
    <InformDiv>
      <FaceIcon />
      <p>{children}</p>
      {location.pathname === '' ? <p>{'로그인 하러 가기'}</p> : ''}
    </InformDiv>
  );
};

export default NoneData;

const InformDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #797979;
`;

const FaceIcon = styled(CiFaceMeh)`
  font-size: 88px;
`;
