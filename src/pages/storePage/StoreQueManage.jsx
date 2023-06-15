import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { styled } from 'styled-components';

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
      setQueueList(response);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제 및 정리 작업
    return () => {
      socket.disconnect();
      // 필요한 정리 작업 수행
    };
  }, []);

  useEffect(() => {}, [queueList]);

  return (
    <div>
      {queueList.map((item) => {
        return (
          <IndividualQueList key={item?.que_id}>
            <div>
              <div>{item?.User?.name}</div>
              <div>
                <span>
                  {item?.want_table}
                  {' 좌석 '}
                </span>
                <span>
                  {item?.head_count}
                  {'명'}
                </span>
                <p>
                  {'요청사항 : '}
                  {item.request}
                </p>
              </div>
            </div>
            <button type={'button'}>{'입장알림'}</button>
          </IndividualQueList>
        );
      })}
    </div>
  );
};

export default StoreQueManage;

const IndividualQueList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-bottom: 0.5px solid #d3d3d3;
  & > div:first-child {
    div:first-child {
      font-weight: 800;
      font-size: 20px;
    }
    span {
    }
  }
  button {
    width: 74px;
    height: 24px;
    border-radius: 14px;
    background-color: #c2c2c2;
  }
`;
