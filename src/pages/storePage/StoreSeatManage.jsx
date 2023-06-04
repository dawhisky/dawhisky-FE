import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { getTableInfo, createTableInfo, editTableInfo } from '../../api/table';

const StoreSeatManage = ({ setIsSeatEditMode }) => {
  // 인가 정보
  const authorization = localStorage.getItem('authorization');
  const unEditedRefreshToken = localStorage.getItem('refreshToken');
  const refreshtoken = unEditedRefreshToken.replace('Bearer', '');
  const token = { authorization, refreshtoken };

  // 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getTableInfo', () => getTableInfo(31));

  // 바 테이블, 홀 테이블 상태관리
  const [barSeatData, setBarSeatData] = useState([]);
  const [hallSeatData, setHallSeatData] = useState([]);
  const [entireSeatData, setEntireSeatData] = useState([]);
  // 초기 테이블 정보와 다른지 판별
  const [isDifferent, setIsDifferent] = useState(false);

  // useQueryClient hook 호출
  const queryClient = useQueryClient();

  // 스토어테이블 생성api
  const createTableApi = useMutation(createTableInfo, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('getTableInfo', getTableInfo);
      console.log(response);
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
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries('getTableInfo', getTableInfo);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      if (data.bar_table === null && data.hall_table === null) {
        createTableApi.mutate({ token, editedSeatData: { hall_table: '[]', bar_table: '[]' } });
      }
      setEntireSeatData({ bar_table: data.bar_table, hall_table: data.hall_table });
      const barSeatInfo = JSON.parse(data.bar_table);
      const hallSeatInfo = JSON.parse(data.hall_table);
      const convertedBarSeatInfo = makeSeatInfo(barSeatInfo);
      const convertedHallSeatInfo = makeSeatInfo(hallSeatInfo);
      setBarSeatData(convertedBarSeatInfo);
      setHallSeatData(convertedHallSeatInfo);
      setBarSeatData(convertedBarSeatInfo);
      setHallSeatData(convertedHallSeatInfo);
      // setEntireSeatData({ bar_table: barSeatInfo, hall_table: hallSeatInfo });
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

  // const toggleSeatHandler = (e) => {
  //   if (e.target.dataset.type === 'bar') {
  //     const editedBarSeatData = [...barSeatData];
  //     editedBarSeatData[e.target.id - 1].activated = !editedBarSeatData[e.target.id - 1].activated;
  //     setBarSeatData(editedBarSeatData);
  //     const finalBarSeatData = [];
  //     editedBarSeatData.map((item) => (item.activated ? finalBarSeatData.push(1) : finalBarSeatData.push(0)));
  //     setEntireSeatData({ bar_table: finalBarSeatData, hall_table: entireSeatData.hall_table });
  //   } else {
  //     const editedHallSeatData = [...hallSeatData];
  //     editedHallSeatData[e.target.id - 1].activated = !editedHallSeatData[e.target.id - 1].activated;
  //     setHallSeatData(editedHallSeatData);
  //     const finalHallSeatData = [];
  //     editedHallSeatData.map((item) => (item.activated ? finalHallSeatData.push(1) : finalHallSeatData.push(0)));
  //     setEntireSeatData({ bar_table: entireSeatData.bar_table, hall_table: finalHallSeatData });
  //   }
  // };

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

  // const submitSeatHandler = () => {
  //   const payload = {
  //     bar_table: JSON.stringify(entireSeatData.bar_table),
  //     hall_table: JSON.stringify(entireSeatData.hall_table),
  //   };
  //   editTableApi.mutate({
  //     token,
  //     editedSeatData: payload,
  //   });
  // };

  const submitSeatHandler = () => {
    console.log(entireSeatData);
    editTableApi.mutate({
      token,
      entireSeatData,
    });
  };

  return (
    <StoreSeatManageWrapper>
      <div>
        <div>
          <span>{'바 좌석'}</span>
          <button onClick={() => setIsSeatEditMode(true)} type={'button'}>
            {'수정'}
          </button>
        </div>
        <div>
          <div>
            {barSeatData?.map((item) => (
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
            ))}
          </div>
        </div>
      </div>
      <div>
        <span>{'테이블 좌석'}</span>
        <div>
          <div>
            {hallSeatData?.map((item) => (
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
            ))}
          </div>
        </div>
      </div>
      <button data-isDifferent={isDifferent} onClick={() => submitSeatHandler()} type={'button'}>
        {'등록'}
      </button>
    </StoreSeatManageWrapper>
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
      }
    }
    & > div:last-child {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 20px auto 20px auto;

      & > div:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 200px;

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
          background-color: #6b4eff;
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
      justify-content: center;
      width: 100%;

      div:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 200px;

        button {
          height: 25px;
          width: 25px;
          margin: 10px;
          color: white;
          border-radius: 5px;
          cursor: pointer;
        }

        button[data-activated='true'] {
          background-color: #6b4eff;
        }
      }
    }
  }
  & > button:last-child {
    width: 325px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
  }
  button[data-isDifferent='true'] {
    background-color: #6b4eff;
    color: white;
  }
`;
