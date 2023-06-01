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
    if (url === `/UserManagePage`) {
      navigate(`/MyComment`);
    } else if (url === `/` || url === `/LikeList`) {
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
              {/* TODO API 수정되면 영어 이름 연결 */}
              <h3>Whisky name</h3>
              <h2>{item.whisky_abv} vol</h2>
            </div>
            <IconDiv>
              <LikeIcon />
            </IconDiv>
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
    font-size: 13px;
    font-weight: 600;
    line-height: 16px;
  }
  & h3 {
    width: 100px;
    font-size: 13px;
    line-height: 16px;
    color: #8f8f8f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const IconDiv = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
`;
