import React from 'react';
import { styled } from 'styled-components';
import { Image } from '../components';

const WhiskyStockList = () => {
  return (
    <>
      <StockListDiv>
        <ImageDiv>
          <Image width={'80px'} height={'80px'} src={''} alt={''} />
        </ImageDiv>
        <h1>위스키바 이름</h1>
        <h3>서울특별시 강남구 강남대로 7</h3>
        <BarInfoDiv>
          <button type="button">잔여 좌석 2</button>
          <h2>60m</h2>
        </BarInfoDiv>
      </StockListDiv>
      <StockListDiv>
        <ImageDiv>
          <Image width={'80px'} height={'80px'} src={''} alt={''} />
        </ImageDiv>
        <h1>위스키바 이름</h1>
        <h3>서울특별시 강남구 강남대로 7</h3>
        <BarInfoDiv>
          <button type="button">잔여 좌석 2</button>
          <h2>60m</h2>
        </BarInfoDiv>
      </StockListDiv>
    </>
  );
};

export default WhiskyStockList;

const StockListDiv = styled.div`
  margin-bottom: 30px;
  & h1 {
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h2 {
    font-size: 14px;
    font-weight: 600;
  }
  & h3 {
    width: 225px;
    margin: 5px 0 17px 0;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #818181;
  }
`;

const ImageDiv = styled.div`
  float: left;
  margin-right: 15px;
`;

const BarInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & button {
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 12px;
  }
`;
