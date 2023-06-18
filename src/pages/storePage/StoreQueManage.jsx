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
      console.log('이건 연결됐을 때, 쏘는 스토어아이디 : ', storeId);
      socket.emit('enter', storeId);
    });

    socket.on('getQueData', (response) => {
      console.log(response);
      setQueueList(response);
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제 및 정리 작업
    return () => {
      socket.disconnect();
      // 필요한 정리 작업 수행
    };
  }, [storeId]);

  console.log(queueList);

  return (
    <div>
      {queueList.map((item) => {
        return (
          <IndividualQueList key={item?.que_id}>
            <div>
              <div>{item?.User?.name}</div>
              <div>
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
  border: 0.5px solid #d3d3d3;
  border-radius: 10px;
  margin: 5px 0 5px 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  & > div:first-child {
    width: 70%;
    div:first-child {
      font-weight: 800;
      font-size: 20px;
    }
  }
  button {
    width: 74px;
    height: 24px;
    border-radius: 14px;
    background-color: #ff8b00;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    font-weight: 600;
  }
`;
