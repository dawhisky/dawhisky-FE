import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { getTableInfo, createTableInfo, editTableInfo } from '../../api/table';
import { Modal } from '../../components';
import StoreSeatEditPage from './StoreSeatEditPage';
import { NoneData } from '../statusPage';

const StoreSeatManage = () => {
  const storeId = localStorage.getItem('store_id');
  // 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getTableInfo', () => getTableInfo(storeId));

  // 바 테이블, 홀 테이블 상태관리
  const [barSeatData, setBarSeatData] = useState([]);
  const [hallSeatData, setHallSeatData] = useState([]);
  const [entireSeatData, setEntireSeatData] = useState([]);
  // 초기 테이블 정보와 다른지 판별
  const [isDifferent, setIsDifferent] = useState(false);
  // 모달창이 열렸는지 여부 상태관리
  const [modalToggle, setModalToggle] = useState(false);

  // useQueryClient hook 호출
  const queryClient = useQueryClient();

  // 스토어테이블 생성api
  const createTableApi = useMutation(createTableInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTableInfo', getTableInfo(storeId));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // [0,0,0]과 같은 데이터를 [{id:1, activated:false},{id:2, activated:false},{id:3, activated:false}]로
  const makeSeatInfo = (seatData) => {
    const arr = [];
    for (let i = 0; i < seatData.length; i += 1) {
      if (seatData[i] === 0) {
        arr.push({ id: i + 1, activated: false });
      } else {
        arr.push({ id: i + 1, activated: true });
      }
    }
    return arr;
  };

  // 스토어테이블 수정api
  const editTableApi = useMutation(editTableInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTableInfo', getTableInfo(storeId));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      if (data === null) {
        createTableApi.mutate({ editedSeatData: { hall_table: '[]', bar_table: '[]' } });
      }
      // 서버 데이터 반영
      if (data && data.bar_table && data.hall_table) {
        setEntireSeatData({ bar_table: data.bar_table, hall_table: data.hall_table });
        const barSeatInfo = JSON.parse(data.bar_table);
        const hallSeatInfo = JSON.parse(data.hall_table);
        const convertedBarSeatInfo = makeSeatInfo(barSeatInfo);
        const convertedHallSeatInfo = makeSeatInfo(hallSeatInfo);
        setBarSeatData(convertedBarSeatInfo);
        setHallSeatData(convertedHallSeatInfo);
        setBarSeatData(convertedBarSeatInfo);
        setHallSeatData(convertedHallSeatInfo);
      }
    }
  }, [isLoading, isError, data]);

  useEffect(() => {
    if (!isLoading && !isError) {
      if (
        JSON.stringify(data.bar_table) !== JSON.stringify(entireSeatData.bar_table) ||
        JSON.stringify(data.hall_table) !== JSON.stringify(entireSeatData.hall_table)
      ) {
        setIsDifferent(true);
      } else {
        setIsDifferent(false);
      }
    }
  }, [entireSeatData]);

  // 각 테이블버튼 클릭 토글 핸들러함수
  const toggleSeatHandler = (e) => {
    if (e.target.dataset.type === 'bar') {
      const editedBarSeatData = [...barSeatData];
      editedBarSeatData[e.target.id - 1].activated = !editedBarSeatData[e.target.id - 1].activated;
      setBarSeatData(editedBarSeatData);
      const finalBarSeatData = [];
      editedBarSeatData.map((item) => (item.activated ? finalBarSeatData.push(1) : finalBarSeatData.push(0)));
      setEntireSeatData({ bar_table: JSON.stringify(finalBarSeatData), hall_table: entireSeatData.hall_table });
    } else {
      const editedHallSeatData = [...hallSeatData];
      editedHallSeatData[e.target.id - 1].activated = !editedHallSeatData[e.target.id - 1].activated;
      setHallSeatData(editedHallSeatData);
      const finalHallSeatData = [];
      editedHallSeatData.map((item) => (item.activated ? finalHallSeatData.push(1) : finalHallSeatData.push(0)));
      setEntireSeatData({ bar_table: entireSeatData.bar_table, hall_table: JSON.stringify(finalHallSeatData) });
    }
  };

  // 등록버튼핸들러 함수
  const submitSeatHandler = () => {
    if (
      JSON.stringify(data.bar_table) !== JSON.stringify(entireSeatData.bar_table) ||
      JSON.stringify(data.hall_table) !== JSON.stringify(entireSeatData.hall_table)
    ) {
      editTableApi.mutate({ editedSeatData: entireSeatData });
    }
  };

  // 각 테이블 입력값 상태관리
  const [editedSeatData, setEditedSeatData] = useState({ bar_table: [], hall_table: [] });

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

  const submitTableInfo = () => {
    const payload = {
      bar_table: JSON.stringify(editedSeatData.bar_table),
      hall_table: JSON.stringify(editedSeatData.hall_table),
    };
    editTableApi.mutate({ editedSeatData: payload });
    setModalToggle(false);
  };

  return (
    <>
      {' '}
      <StoreSeatManageWrapper>
        <div>
          <div>
            <span>{'바 좌석'}</span>
            <button onClick={() => setModalToggle(true)} type={'button'}>
              {'수정'}
            </button>
          </div>
          <div>
            <div>
              {barSeatData.length !== 0 ? (
                barSeatData.map((item) => (
                  <button
                    onClick={(e) => toggleSeatHandler(e)}
                    type={'button'}
                    id={item.id}
                    key={item.id}
                    data-type={'bar'}
                    data-activated={item.activated}
                  >
                    {item.id}
                  </button>
                ))
              ) : (
                <NoneData>{'바 좌석정보가 없습니다.'}</NoneData>
              )}
            </div>
          </div>
        </div>
        <div>
          <span>{'홀 좌석'}</span>
          <div>
            <div>
              {hallSeatData.length !== 0 ? (
                hallSeatData.map((item) => (
                  <button
                    onClick={(e) => toggleSeatHandler(e)}
                    type={'button'}
                    id={item.id}
                    key={item.id}
                    data-type={'table'}
                    data-activated={item.activated}
                  >
                    {item.id}
                  </button>
                ))
              ) : (
                <NoneData>{'홀 좌석 정보가 없습니다.'}</NoneData>
              )}
            </div>
          </div>
        </div>
        <button data-isDifferent={isDifferent} onClick={() => submitSeatHandler()} type={'button'}>
          {'등록'}
        </button>
      </StoreSeatManageWrapper>
      {modalToggle && (
        <Modal
          height={'18rem'}
          both={'true'}
          onconfirmclick={submitTableInfo}
          oncancelclick={() => setModalToggle(false)}
        >
          <StoreSeatEditPage
            editedSeatData={editedSeatData}
            setEditedSeatData={setEditedSeatData}
            changeSeatNumberHandler={changeSeatNumberHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default StoreSeatManage;

const StoreSeatManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:first-child {
    width: 100%;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > span {
        margin: 0 15px 0 15px;
        font-weight: 800;
        font-size: 20px;
      }
      & > button {
        font-size: 15px;
        color: grey;
        background-color: transparent;
        margin: 0 15px 0 15px;
        cursor: pointer;
      }
    }
    & > div:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 20px auto;

      & > div:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        width: 180px;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 25px;
          width: 25px;
          margin: 10px;
          color: white;
          border-radius: 5px;
          flex-shrink: 0;
          cursor: pointer;
        }

        button[data-activated='true'] {
          background-color: ${({ theme }) => theme.colors.orange};
        }
      }
    }
  }
  & > div:nth-child(2) {
    margin: 20px auto 20px auto;
    width: 100%;
    span {
      margin: 0 15px 0 15px;
      font-weight: 800;
      font-size: 20px;
    }
    & > div:last-child {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;

      div:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        width: 180px;

        button {
          height: 25px;
          width: 25px;
          margin: 10px;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }

        button[data-activated='true'] {
          background-color: ${({ theme }) => theme.colors.orange};
        }
      }
    }
  }
  & > button:last-child {
    width: 325px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
  }
  button[data-isDifferent='true'] {
    background-color: ${({ theme }) => theme.colors.orange};
    color: white;
    font-weight: 600;
  }
`;
