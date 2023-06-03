import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import LikeIcon from './LikeIcon';
import Image from './Image';

// ! [props]
// * list : map으로 표현할 list data

const WhiskyGrid = ({ list }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  const onWhiskyClickHandler = (id) => {
    if (url.includes('/UserManagePage')) {
      navigate(`/MyComment`);
    } else if (url === `/` || url.includes('/LikeList')) {
      navigate(`/WhiskyDetail/${id}`);
    }
  };

  return (
    <WhiskyListSection>
      {list &&
        list.map((item) => (
          <WhiskyDataDiv key={item.whisky_id} onClick={() => onWhiskyClickHandler(item.whisky_id)}>
            <Image
              width={'155px'}
              height={'155px'}
              borderradius={'5px'}
              src={item.whisky_photo}
              alt={`${item.whisky_kor} 사진`}
            />
            <h1>{item.whisky_kor}</h1>
            <div>
              <h2>{item.whisky_eng}</h2>
              <h3>{item.whisky_abv} vol</h3>
            </div>
            {url !== `/` && (
              <IconDiv>
                <LikeIcon />
              </IconDiv>
            )}
          </WhiskyDataDiv>
        ))}
    </WhiskyListSection>
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
  grid-gap: 25px 20px;
`;

const WhiskyDataDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  & div {
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
    color: #8f8f8f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h3 {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
  }
`;

const IconDiv = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
`;
