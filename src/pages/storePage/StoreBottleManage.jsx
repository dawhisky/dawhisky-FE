import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { Button } from '../../components';
import { getStoreWhiskyList } from '../../api/store';
import { NoneData } from '../statusPage';

const StoreBottleManage = ({ setIsRegisterMode, id }) => {
  const [whiskyList, setWhiskyList] = useState([]);

  // * 업장에 등록된 주류 내역
  useQuery('getStoreWhiskyList', () => getStoreWhiskyList(id), {
    onSuccess: (response) => {
      if (response && response.length !== 0) {
        setWhiskyList(response);
      }
    },
  });

  return (
    <StoreBottleManageWrapper>
      <div>
        {whiskyList &&
          whiskyList.length !== 0 &&
          whiskyList.map((item) => (
            <IndividualWhisky key={item.id}>
              <div>
                <div>{'img'}</div>
                <div>
                  <p>{item.nameKor}</p>
                  <p>{item.nameEng}</p>
                  <p>
                    {item.abv}
                    {'% vol'}
                  </p>
                </div>
              </div>
              <button type={'button'}>{'삭제'}</button>
            </IndividualWhisky>
          ))}
        {(!whiskyList || whiskyList.length === 0) && <NoneData>사업장에 등록된 주류가 없습니다.</NoneData>}
      </div>
      <ButtonWrapDiv>
        <Button onClick={() => setIsRegisterMode(true)}>{'주류 등록'}</Button>
      </ButtonWrapDiv>
    </StoreBottleManageWrapper>
  );
};

export default StoreBottleManage;

const StoreBottleManageWrapper = styled.div`
  display: flex;
  height: 75vh;
  position: relative;
  justify-content: center;

  & > div:first-child {
    width: 100%;
    margin-top: 25px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
    }
  }

  & > button:last-child {
    height: 40px;
    width: 326px;
    position: absolute;
    margin-left: -15px;
    bottom: 20px;
    border-radius: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const IndividualWhisky = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  align-items: flex-end;

  & > div:first-child {
    display: flex;
    div:first-child {
      height: 72px;
      width: 72px;
      background-color: #ececec;
      color: grey;
    }

    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      p:first-child {
        font-weight: 600;
      }
      p:nth-child(2) {
        font-weight: 400;
        font-size: 11px;
        color: #818181;
      }
      p:last-child {
        font-size: 11px;
      }
    }
  }
`;

const ButtonWrapDiv = styled.div`
  height: 4.375rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    position: absolute;
    bottom: 20px;
    z-index: 1;
    font-weight: 600;
  }
`;
