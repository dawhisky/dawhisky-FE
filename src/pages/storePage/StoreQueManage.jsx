import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { io } from 'socket.io-client';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { notifyEntrance, rejectEntrance, deleteMyQueue } from '../../api/queue';

const StoreQueManage = ({ storeId }) => {
  // 줄서기 리스트 상태관리
  const [queueList, setQueueList] = useState([]);
  // 소켓 연결 생성
  const socket = io('https://jjmdev.site', {
    path: '/socket.io', // 서버에서 설정한 경로와 일치해야 합니다.
    transports: ['websocket'],
  });

  useEffect(() => {
    // 컴포넌트 마운트 시 소켓 연결 설정
    // 이벤트 리스너 등록 등 필요한 작업 수행
    socket.on('connect', () => {
      socket.emit('enter', storeId);
    });

    socket.on('getQueData', (response) => {
      if (JSON.stringify(queueList) !== JSON.stringify(response)) {
        console.log(JSON.stringify(queueList));
        console.log(JSON.stringify(response));
        setQueueList(response);
        toast.info('새로운 줄서기 요청이 있습니다.');
      }
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제 및 정리 작업
    return () => {
      socket.disconnect();
      // 필요한 정리 작업 수행
    };
  }, [storeId]);

  // 입장 알림api
  const notifyEntranceApi = useMutation(notifyEntrance, {
    onSuccess: () => {
      toast.success('입장알림 메시지를 송신했습니다. 화면반영에는 약간의 시간이 소요될 수 있습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 입장 거절api
  const rejectEntranceApi = useMutation(rejectEntrance, {
    onSuccess: () => {
      toast.success('입장거절 메시지를 송신했습니다. 화면반영에는 약간의 시간이 소요될 수 있습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 줄서기 삭제api
  const deleteQueueApi = useMutation(deleteMyQueue, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  // 입장 알림 핸들러함수
  const notifyEntranceHandler = (e) => {
    notifyEntranceApi.mutate(e.target.dataset.queid);
    deleteQueueApi.mutate(e.target.dataset.queid);
  };

  // 입장 거절 핸들러함수
  const rejectEntranceHandler = (e) => {
    rejectEntranceApi.mutate(e.target.dataset.queid);
    deleteQueueApi.mutate(e.target.dataset.queid);
  };

  return (
    <div>
      {queueList.length === 0 && (
        <NullDiv>
          <p>유저의 줄서기 내역이 이곳에 표시됩니다.</p>
        </NullDiv>
      )}
      {queueList.length !== 0 &&
        queueList.map((item) => {
          return (
            <IndividualQueList key={item?.que_id}>
              <div>
                <QueUserNamdH1>{item?.user_name}</QueUserNamdH1>
                <QueCommentDiv>
                  {item?.want_table === 'dontCare' ? (
                    <span>{'좌석 상관없음 / '}</span>
                  ) : (
                    <span>
                      {item?.want_table}
                      {' 좌석 / '}
                    </span>
                  )}

                  <span>
                    {item?.head_count}
                    {'명'}
                  </span>
                  <p>{item.request}</p>
                </QueCommentDiv>
              </div>
              <ButtonWrapDiv>
                <button onClick={(e) => notifyEntranceHandler(e)} data-queId={item?.que_id} type={'button'}>
                  {'입장알림'}
                </button>
                <button onClick={(e) => rejectEntranceHandler(e)} data-queId={item?.que_id} type={'button'}>
                  {'입장거절'}
                </button>
              </ButtonWrapDiv>
            </IndividualQueList>
          );
        })}
    </div>
  );
};

export default StoreQueManage;

const NullDiv = styled.div`
  border: 1px solid lightgrey;
  min-height: 200px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: lightgrey;
  }
`;

const IndividualQueList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border: 0.5px solid #d3d3d3;
  border-radius: 10px;
  margin: 5px 0 20px 0;
  padding: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  text-align: justify;
  font-size: 15px;
  & > div:first-child {
    width: 70%;
    div:first-child {
      font-weight: 800;
      font-size: 20px;
    }
  }
  div:last-child {
    button {
      width: 74px;
      height: 30px;
      border-radius: 14px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
    }
  }
`;

const QueUserNamdH1 = styled.h1`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const QueCommentDiv = styled.div`
  margin-right: 15px;
  span:first-child {
    font-weight: 600;
  }
  span:nth-child(2) {
    height: 100%;
    font-weight: 600;
  }
  p {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    word-break: break-word;
  }
`;

const ButtonWrapDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  :first-child {
    background-color: ${({ theme }) => theme.colors.orange};
    color: white;
  }
  :last-child {
    background-color: ${({ theme }) => theme.colors.lightGray};
    color: black;
  }
`;
