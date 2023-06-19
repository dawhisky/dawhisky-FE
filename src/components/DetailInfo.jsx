import React from 'react';
import { styled } from 'styled-components';

// ! [props]
// * 사업장 상세정보나 위스키 상세정보를 보여주는 컴포넌트
// * info : 객체의 key-value 형태로 데이터를 넣어주면 해당 내용을 화면에 출력
// ex. const info = { 지역 : '아메리칸' }

const DetailInfo = ({ info }) => {
  const renderedInfo = Object.entries(info).map((item) => {
    return (
      <InfoDiv key={item[0]}>
        <InfoKeyDt>{item[0]}</InfoKeyDt>
        <InfoLine>{'|'}</InfoLine>
        <InfoValueDd>{item[1]}</InfoValueDd>
      </InfoDiv>
    );
  });

  return <div>{renderedInfo}</div>;
};

export default DetailInfo;

const InfoDiv = styled.div`
  display: flex;
  padding: 0 10px;
  margin-bottom: 1.25rem;
`;

const InfoKeyDt = styled.dt`
  width: 5rem;
  font-weight: 600;
`;

const InfoLine = styled.dd`
  width: 0.625rem;
  margin-right: 0.625rem;
  font-weight: 500;
`;

const InfoValueDd = styled.dd`
  width: calc(100% - 5.625rem);
  white-space: wrap;
  text-align: justify;
`;
