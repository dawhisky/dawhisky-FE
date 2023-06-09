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
  useQuery('getMyQueueList', () => getMyQueueList(), {
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
              <span>{`${item.head_count}명`}</span>
            </div>
            <div>
              <span>{'대기 순서'}</span>
              <span>{`${item.myTurn}번째`}</span>
            </div>
            <div>
              <span>{'요청사항'}</span>
              <span>{item.request ? item.request : '없음'}</span>
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
        <NoneData height={'50vh'}>{'나의 줄서기 현황이 없습니다.'}</NoneData>
      )}
    </UserQueueListWrapper>
  );
};

export default UserQueueList;

const UserQueueListWrapper = styled.div`
  min-height: 220px;
`;

const IndividualQueue = styled.div`
  border: 0.5px solid #c6c3c3;
  border-radius: 8px;
  padding: 20px;
  margin-top: 10px;
  & > button:first-child {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    background-color: transparent;
    cursor: pointer;
  }
  & div:nth-child(2),
  & div:nth-child(3),
  & div:nth-child(4),
  & div:nth-child(5) {
    display: flex;
    margin-top: 6px;
    justify-content: space-between;
    font-size: 15px;
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
      font-weight: 500;
      font-size: 15px;
      transform: none;
    }
    & button:first-child {
      background-color: transparent;
      color: black;
      border: 1px solid #c6c3c3;
    }
  }
`;
