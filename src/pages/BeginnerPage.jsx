import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Image } from '../components';
import { getBeginnerWhiskyList } from '../api/whisky';

const BeginnerPage = () => {
  //* useNavigate
  const navigate = useNavigate();

  //* whiskyList 상태관리
  const [whiskyList, setWhiskyList] = useState([]);

  //* 입문자용 위스키 조회
  const { isLoading, isError, data } = useQuery('getBeginnerWhiskyList', () => getBeginnerWhiskyList());
  useEffect(() => {
    setWhiskyList(data);
  }, [data]);

  // * [위스키 디테일] click 이벤트
  const onWhiskyClickHandler = (id) => navigate(`/WhiskyDetail/${id}`);

  return (
    <WhiskyListSection>
      {whiskyList &&
        whiskyList.length !== 0 &&
        whiskyList.map((item) => (
          <WhiskyDataDiv key={item.whisky_id} onClick={() => onWhiskyClickHandler(item.whisky_id)}>
            <ImageWrapDiv>
              <Image
                width={'9.5rem'}
                height={'9.5rem'}
                borderradius={'0.313rem'}
                src={item.whisky_photo}
                alt={`${item.whisky_kor} 사진`}
              />
            </ImageWrapDiv>
            <h1>{item.whisky_kor}</h1>
            <div>
              <h2>{item.whisky_eng}</h2>
              <h3>{`${item.whisky_abv} vol`}</h3>
            </div>
          </WhiskyDataDiv>
        ))}
    </WhiskyListSection>
  );
};

export default BeginnerPage;

const WhiskyListSection = styled.section`
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(0, auto);
  grid-gap: 28px 22px;
`;

const WhiskyDataDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  & div:last-child {
    display: flex;
    justify-content: space-between;
  }
  & h1 {
    width: 155px;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h2 {
    width: 100px;
    font-size: 12px;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.darkGray};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h3 {
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.orange};
  }
`;

const ImageWrapDiv = styled.div`
  width: 155px;
  height: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 4px -5px;
`;
