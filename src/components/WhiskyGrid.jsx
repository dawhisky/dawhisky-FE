import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { NoneData } from '../pages/statusPage';
import Image from './Image';

// ! [props]
// * list : map으로 표현할 list data

const WhiskyGrid = ({ list }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const onWhiskyClickHandler = (id) => {
    if (url.includes('/ManagePage')) {
      navigate(`/UserComment/${id}`);
    } else if (url === `/` || url.includes('/LikeList')) {
      navigate(`/WhiskyDetail/${id}`);
    }
  };

  return (
    <>
      <WhiskyListSection>
        {list &&
          list.length !== 0 &&
          list.map((item) => (
            <WhiskyDataDiv key={item.whisky_id} onClick={() => onWhiskyClickHandler(item.whisky_id)}>
              <ImageWrapDiv>
                <Image
                  width={'150px'}
                  height={'150px'}
                  borderradius={'5px'}
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
      <div>{(!list || list.length === 0) && <NoneData>{'조회된 위스키가 없어요'}</NoneData>}</div>
    </>
  );
};

export default WhiskyGrid;

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
    margin-top: 8pxm;
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
