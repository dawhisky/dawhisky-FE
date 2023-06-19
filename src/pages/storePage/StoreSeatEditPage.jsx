import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { getTableInfo, editTableInfo } from '../../api/table';

const StoreSeatEditPage = ({ storeId, editedSeatData, changeSeatNumberHandler }) => {
  // useQueryClient 호출
  const queryClient = useQueryClient();

  // 스토어테이블 수정
  const editTableApi = useMutation(editTableInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTableInfo', getTableInfo(storeId));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 완료버튼 핸들러 함수
  // const submitTableInfo = () => {
  //   const payload = {
  //     bar_table: JSON.stringify(editedSeatData.bar_table),
  //     hall_table: JSON.stringify(editedSeatData.hall_table),
  //   };
  //   editTableApi.mutate({ editedSeatData: payload });
  //   setIsSeatEditMode(false);
  // };

  return (
    <StoreSeatEditPageWrapper>
      <div>
        <h1>{'좌석 수정'}</h1>
      </div>
      <div>
        <div>
          <span>{'바 좌석'}</span>
          <div>
            <button onClick={(e) => changeSeatNumberHandler(e)} data-type={'bar'} data-button={'minus'} type={'button'}>
              {'-'}
            </button>
            <div>{editedSeatData.bar_table.length}</div>
            <button onClick={(e) => changeSeatNumberHandler(e)} data-type={'bar'} data-button={'plus'} type={'button'}>
              {'+'}
            </button>
          </div>
        </div>
        <div>
          <span>{'홀 좌석'}</span>
          <div>
            <button
              onClick={(e) => changeSeatNumberHandler(e)}
              data-type={'table'}
              data-button={'minus'}
              type={'button'}
            >
              {'-'}
            </button>
            <div>{editedSeatData.hall_table.length}</div>
            <button
              onClick={(e) => changeSeatNumberHandler(e)}
              data-type={'table'}
              data-button={'plus'}
              type={'button'}
            >
              {'+'}
            </button>
          </div>
        </div>
      </div>
    </StoreSeatEditPageWrapper>
  );
};

export default StoreSeatEditPage;

const StoreSeatEditPageWrapper = styled.div`
  padding: 10px;
  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    width: 250px;
    margin: 15px 10px 10px 10px;
    border-bottom: 0.5px solid #eaeaea;

    h1 {
      font-size: 18px;
      font-weight: 800;
      margin-left: 8px;
    }
    button {
      background-color: transparent;
    }
  }
  & > div:nth-child(2) {
    margin-top: 30px;

    & > div {
      display: flex;
      justify-content: space-between;
      margin: 30px auto 30px auto;
      & > span {
        font-weight: 800;
        font-size: 18px;
        margin-left: 20px;
      }
      & > div {
        display: flex;
        gap: 7px;
        margin-right: 20px;
        & > button {
          height: 20px;
          width: 20px;
          cursor: pointer;
        }
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;
