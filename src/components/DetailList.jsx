import React from 'react';
import { styled } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { NoneData } from '../pages/statusPage';
import Image from './Image';

// ! [props]
// * 가로로 긴 리스트로 위스키 또는 위스키바 리스트를 보여주는 컴포넌트
// * type : 보여주고 싶은 리스트가 위스키바 일 경우 type={'store'}로 설정, 위스키바 리스트 출력
// *        props를 따로 내려주지 않으면 위스키 리스트를 출력함

const DetailList = ({ type, list }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  console.log(list);

  const onListClickHandler = (id) => {
    if (url.includes('/ManagePage/user')) {
      navigate(`/UserComment/${id}`);
    } else if (url.includes('/LikeList') || url.includes('/StoreList') || url.includes('/WhiskyDetail')) {
      navigate(`/StoreDetail/${id}`);
    } else if (url.includes('/StoreDetail')) {
      navigate(`/WhiskyDetail/${id}`);
    } else if (url.includes('/ManagePage/store')) {
      navigate(`/WhiskyDetail/${id}`);
    }
  };

  return (
    <StockListDiv>
      {list &&
        list.map((item) => {
          const barTables =
            item.StoreTables && item.StoreTables.length !== 0 ? JSON.parse(item.StoreTables[0].bar_table) : [];
          const filteredBarTables = Array.isArray(barTables) ? barTables.filter((e) => e === 0).length : 0;
          const hallTables =
            item.StoreTables && item.StoreTables.length !== 0 ? JSON.parse(item.StoreTables[0].hall_table) : [];
          const filteredHallTables = Array.isArray(hallTables) ? hallTables.filter((e) => e === 0).length : 0;

          return (
            <ListDiv
              key={item.whisky_id || item.store_id}
              onClick={() =>
                onListClickHandler(
                  url.includes('/ManagePage/store') || url.includes('/StoreDetail')
                    ? item.whisky_id
                    : item.store_id
                    ? item.store_id
                    : item.whisky_id,
                )
              }
            >
              {url.includes('/ManagePage') && (
                <ImageWrapDiv>
                  <Image
                    width={'5rem'}
                    height={'5rem'}
                    borderradius={'0.313rem'}
                    src={type === 'store' ? item.biz_photo : item.whisky_photo}
                    alt={`${type === 'store' ? item.store : item.whisky_kor} 대표 사진`}
                  />
                </ImageWrapDiv>
              )}
              {!url.includes('/ManagePage') && (
                <ImageWrapDiv>
                  <Image
                    width={'5rem'}
                    height={'5rem'}
                    borderradius={'0.313rem'}
                    src={type === 'store' ? item.biz_photo : item.whisky_photo}
                    alt={`${type === 'store' ? item.store : item.whisky_kor} 대표 사진`}
                  />
                </ImageWrapDiv>
              )}
              {url.includes('/LikeList') || url.includes('/WhiskyDetail') ? (
                <StoreInfoDiv>
                  <TextH1>{item.store}</TextH1>
                  <TextH2>{item.address !== 'null' ? item.address : '입력된 주소가 없습니다'}</TextH2>
                </StoreInfoDiv>
              ) : (
                <TotalInfoDiv>
                  <TextH1>{type === 'store' ? item.store : item.whisky_kor}</TextH1>
                  <TextH2>{type === 'store' ? item.address : item.whisky_eng}</TextH2>
                  {type === 'store' ? (
                    <BarInfoDiv>
                      <button type={'button'}>{`바 ${filteredBarTables}석 | 홀 ${filteredHallTables}석`}</button>
                    </BarInfoDiv>
                  ) : (
                    <WhiskyInfoDiv>
                      <h2>{`${item.whisky_abv} vol`}</h2>
                      {/* <button type={'button'}>{url.includes('/ManagePage/store') && '삭제'}</button> */}
                    </WhiskyInfoDiv>
                  )}
                </TotalInfoDiv>
              )}
            </ListDiv>
          );
        })}
      {(!list || list.length === 0) && type === 'store' && <NoneData>{'위스키 바가 없어요'}</NoneData>}
      {(!list || list.length === 0) && type !== 'store' && <NoneData>{'위스키 데이터가 존재하지 않아요'}</NoneData>}
    </StockListDiv>
  );
};

export default DetailList;

const StockListDiv = styled.div`
  margin-top: -0.625rem;
  margin-bottom: 1.875rem;
`;

const ListDiv = styled.div`
  margin: 0.313rem 0;
  padding: 0.625rem;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const ImageWrapDiv = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 4px -5px;
`;

const StoreInfoDiv = styled.div`
  margin-left: 0.938rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TotalInfoDiv = styled.div`
  margin-left: 0.938rem;
  & h3 {
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

const TextH1 = styled.h1`
  width: 14rem;
  margin-top: 0.3rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextH2 = styled.h2`
  width: 14rem;
  margin: 0.313rem 0 0.75rem 0;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const BarInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & button {
    padding: 0.2rem 0.625rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.orange};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const WhiskyInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & h2 {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.orange};
  }
  & button {
    padding: 0.313rem 0.625rem;
    background-color: transparent;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.darkGray};
    cursor: pointer;
  }
`;
