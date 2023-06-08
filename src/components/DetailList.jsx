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

  const onListClickHandler = (id) => {
    if (url.includes('/UserManagePage')) {
      navigate(`/MyComment`);
    } else if (url.includes('/LikeList') || url.includes('/StoreList') || url.includes('/WhiskyDetail')) {
      navigate(`/StoreDetail/${id}`);
    } else if (url.includes('/StoreDetail')) {
      navigate(`/WhiskyDetail/${id}`);
    }
  };

  return (
    <StockListDiv>
      {list &&
        list.map((item) => (
          <ListDiv
            key={item.store_id || list.whisky_id}
            onClick={() => onListClickHandler(item.store_id ? item.store_id : list.whisky_id)}
          >
            <Image width={'80px'} height={'80px'} src={''} alt={`${item.store} 사진`} />
            <TotalInfoDiv>
              <h1>{type === 'store' ? item.store : list.whisky_kor}</h1>
              <h2>{type === 'store' ? item.address : list.whisky_eng}</h2>
              {type === 'store' ? (
                <BarInfoDiv>
                  <button type="button">잔여 좌석 2</button>
                  <h3>60m</h3>
                </BarInfoDiv>
              ) : (
                <WhiskyInfoDiv>
                  <h2>{list.whisky_abv} vol</h2>
                  {/* TODO 아래 버튼은 코멘트 등록, 주류 등록 페이지에서는 버튼 / 주류관리 페이지에서는 삭제, 나머지 페이지는 출력 X */}
                  <button type="button">등록</button>
                </WhiskyInfoDiv>
              )}
            </TotalInfoDiv>
          </ListDiv>
        ))}
      {(!list || list.length === 0) && type === 'store' && <NoneData>위스키 바가 없어요</NoneData>}
      {(!list || list.length === 0) && type !== 'store' && <NoneData>위스키 데이터가 존재하지 않아요</NoneData>}
    </StockListDiv>
  );
};

export default DetailList;

const StockListDiv = styled.div`
  margin-bottom: 30px;
`;

const ListDiv = styled.div`
  margin: 5px 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const TotalInfoDiv = styled.div`
  margin-left: 15px;
  & h1 {
    width: 225px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & h2 {
    width: 225px;
    margin: 5px 0 12px 0;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #818181;
  }
  & h3 {
    font-size: 14px;
    font-weight: 600;
  }
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

const WhiskyInfoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & button {
    padding: 5px 10px;
    font-size: 12px;
    background-color: transparent;
    cursor: pointer;
  }
`;
