import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { getMyQueueList, deleteMyQueue } from '../../api/queue';
import { Button } from '../../components';
import { NoneData } from '../statusPage';

const UserQueueList = () => {
  // * useNavigate hook
  const navigate = useNavigate();
  // * useQueryClient hook
  const queryClient = useQueryClient();
  // * 유저 본인의 줄서기 데이터 상태관리
  const [userQueueData, setUserQueueData] = useState([]);
  // * [마이페이지] 유저 본인의 줄서기 데이터 조회
  const { myQueueList } = useQuery('getMyQueueList', () => getMyQueueList(), {
    onSuccess: (response) => setUserQueueData(response),
  });

  // 줄서기삭제api
  const deleteMyQueueApi = useMutation(deleteMyQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries('getMyQueueList', () => getMyQueueList());
      toast.success('줄서기 삭제를 완료했습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // const editButtonHandler = (storeId) => {
  //   navigate(`/StoreDetail/${storeId}`, {
  //     onCompleted: () => {
  //       // setTabChosen('que');
  //     },
  //   });
  // };

  const editButtonHandler = (storeId) => {
    navigate(`/StoreDetail/${storeId}`, { state: { idx: 2 } });
  };

  return (
    <UserQueueListWrapper>
      {userQueueData.length > 0 ? (
        userQueueData.map((item) => (
          <IndividualQueue key={item.que_id}>
            <button type={'button'} onClick={() => navigate(`/StoreDetail/${item.store_id}`)}>
              {item.store}
              {' >'}
            </button>
            <div>
              <span>{'좌석'}</span>
              <span>{item.want_table === 'bar' ? '바' : item.want_table === 'hall' ? '홀' : '상관없음'}</span>
            </div>
            <div>
              <span>{'인원'}</span>
              <span>{item.head_count}</span>
            </div>
            <div>
              <span>{'요청사항'}</span>
              <span>{item.request}</span>
            </div>
            <div>
              <Button onClick={() => deleteMyQueueApi.mutate(item.que_id)}>{'줄서기 취소'}</Button>
              <Button onClick={() => editButtonHandler(item.store_id)} size={'medium'} location={'both'}>
                {'수정'}
              </Button>
            </div>
          </IndividualQueue>
        ))
      ) : (
        <NoneData>{'나의 줄서기 현황이 없습니다.'}</NoneData>
      )}
    </UserQueueListWrapper>
  );
};

export default UserQueueList;

const UserQueueListWrapper = styled.div`
  border: 0.5px solid #c6c3c3;
  border-radius: 8px;
  min-height: 220px;
  padding: 5px 5px 15px 5px;
`;

const IndividualQueue = styled.div`
  border: 0.5px solid #c6c3c3;
  border-radius: 8px;
  padding: 10px 10px;
  margin-top: 10px;
  & > button:first-child {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    background-color: transparent;
  }
  & div:nth-child(2),
  & div:nth-child(3),
  & div:nth-child(4) {
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
    & span:first-child {
      font-weight: 500;
    }
    & span:last-child {
      max-width: 75%;
    }
  }
  & div:last-child {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    & button {
      border-radius: 8px;
      width: 48%;
      font-weight: 400;
      font-size: 18px;
      transform: none;
    }
    & button:first-child {
      background-color: transparent;
      color: black;
      border: 1px solid #c6c3c3;
    }
  }
`;
