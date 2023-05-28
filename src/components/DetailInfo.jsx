import React from 'react';
import { styled } from 'styled-components';

const DetailInfo = ({ info }) => {
  const renderedInfo = Object.entries(info).map((item) => {
    return (
      <InfoDiv key={item[0]}>
        <InfoKeyDt>{item[0]}</InfoKeyDt>
        <InfoValueDd>{item[1]}</InfoValueDd>
      </InfoDiv>
    );
  });

  return <div>{renderedInfo}</div>;
};

export default DetailInfo;

const InfoDiv = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InfoKeyDt = styled.dt`
  width: 90px;
  font-weight: 600;
`;

const InfoValueDd = styled.dd`
  width: calc(100% - 90px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
