import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { Layout } from '../../components';
import { getTableInfo, editTableInfo } from '../../api/table';

const StoreSeatEditPage = ({ setIsSeatEditMode, setWhichMode, setWhichTabChosen }) => {
  // 인가 정보
  const authorization = localStorage.getItem('authorization');
  const unEditedRefreshToken = localStorage.getItem('refreshToken');
  const refreshtoken = unEditedRefreshToken.replace('Bearer', '');
  const token = { authorization, refreshtoken };

  // 각 테이블 입력값 상태관리
  const [editedSeatData, setEditedSeatData] = useState({ bar_table: [], hall_table: [] });

  // useQueryClient 호출
  const queryClient = useQueryClient();

  // 스토어테이블 수정
  const editTableApi = useMutation(editTableInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTableInfo', getTableInfo);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // '+','-'버튼 클릭에 따라 상태관리 변경
  const changeSeatNumberHandler = (e) => {
    if (e.target.dataset.type === 'bar') {
      if (e.target.dataset.button === 'plus' && editedSeatData.bar_table.length < 16) {
        const newEditedSeatData = { ...editedSeatData };
        newEditedSeatData.bar_table.push(0);
        setEditedSeatData(newEditedSeatData);
      } else if (e.target.dataset.button === 'minus' && editedSeatData.bar_table.length > 0) {
        const newEditedSeatData = { ...editedSeatData };
        newEditedSeatData.bar_table.shift();
        setEditedSeatData(newEditedSeatData);
      }
    } else if (e.target.dataset.type === 'table') {
      if (e.target.dataset.button === 'plus' && editedSeatData.hall_table.length < 16) {
        const newEditedSeatData = { ...editedSeatData };
        newEditedSeatData.hall_table.push(0);
        setEditedSeatData(newEditedSeatData);
      } else if (e.target.dataset.button === 'minus' && editedSeatData.hall_table.length > 0) {
        const newEditedSeatData = { ...editedSeatData };
        newEditedSeatData.hall_table.shift();
        setEditedSeatData(newEditedSeatData);
      }
    }
  };

  // 완료버튼 핸들러 함수
  const submitTableInfo = () => {
    const payload = {
      bar_table: JSON.stringify(editedSeatData.bar_table),
      hall_table: JSON.stringify(editedSeatData.hall_table),
    };
    editTableApi.mutate({ token, editedSeatData: payload });
    setWhichTabChosen('seat');
    setWhichMode('seat');
    setIsSeatEditMode(false);
  };

  return (
    <Layout>
      <StoreSeatEditPageWrapper>
        <div>
          <button onClick={() => setIsSeatEditMode(false)} type={'button'}>
            {'이전'}
          </button>
          <h1>{'좌석 수정'}</h1>
          <button onClick={() => submitTableInfo()} type={'button'}>
            {'완료'}
          </button>
        </div>
        <div>
          <div>
            <span>{'바 좌석'}</span>
            <div>
              <button
                onClick={(e) => changeSeatNumberHandler(e)}
                data-type={'bar'}
                data-button={'minus'}
                type={'button'}
              >
                {'-'}
              </button>
              <div>{editedSeatData.bar_table.length}</div>
              <button
                onClick={(e) => changeSeatNumberHandler(e)}
                data-type={'bar'}
                data-button={'plus'}
                type={'button'}
              >
                {'+'}
              </button>
            </div>
          </div>
          <div>
            <span>{'테이블 좌석'}</span>
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
    </Layout>
  );
};

export default StoreSeatEditPage;

const StoreSeatEditPageWrapper = styled.div`
  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 74px;
    width: 100%;
    padding: 10px;
    border-bottom: 0.5px solid #eaeaea;

    h1 {
      font-size: 18px;
      font-weight: 800;
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
        margin-right: 20px;
        & > button {
          height: 20px;
          width: 20px;
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
