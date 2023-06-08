import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { io } from 'socket.io-client';
import { styled } from 'styled-components';
import { getTableInfo } from '../api/table';
import { Button } from '../components';

const UserQuePage = () => {
  // 소켓 연결 생성
  const socket = io('http://jjmdev.site', {
    path: '/api/socket',
  });

  // 해당 스토어 테이블정보 상태관리
  const [barTableStatus, setBarTableStatus] = useState([]);
  const [hallTableStatus, setHallTableStatus] = useState([]);
  // 잔여 좌석 상태관리
  const [restSeat, setRestSeat] = useState({});
  // 바 좌석, 홀 좌석 어떤 라디오버튼 클릭됐는지
  const [whichButtonClicked, setWhichButtonClicked] = useState('bar');
  // 줄서기 희망 인원 상태관리
  const [editedPeopleNumber, seteditedPepleNumber] = useState(0);
  // 요청사항 상태관리
  const [request, setRequest] = useState('');
  // 캐러셀 이동 픽셀 상태관리
  const [px, setPx] = useState(0);

  // 해당 스토어 테이블 정보
  const { isLoading, isError, data } = useQuery('getTableInfo', () => getTableInfo(77));

  useEffect(() => {
    if (data) {
      const barTableInfo = JSON.parse(data.bar_table).map((item, index) => {
        return item === 1 ? { id: index + 1, activated: true } : { id: index + 1, activated: false };
      });
      const hallTableInfo = JSON.parse(data.hall_table).map((item, index) => {
        return item === 1 ? { id: index + 1, activated: true } : { id: index + 1, activated: false };
      });
      const restBarSeat =
        JSON.parse(data.bar_table).length - JSON.parse(data.bar_table).filter((item) => item === 1).length;
      const restHallSeat =
        JSON.parse(data.hall_table).length - JSON.parse(data.hall_table).filter((item) => item === 1).length;
      setRestSeat({ restBarSeat, restHallSeat });
      setBarTableStatus(barTableInfo);
      setHallTableStatus(hallTableInfo);
    }
  }, [data]);

  useEffect(() => {
    // 컴포넌트 마운트 시 소켓 연결 설정
    // 이벤트 리스너 등록 등 필요한 작업 수행
    // socket.emit('message', '안녕하세요, 지민님');

    // 컴포넌트 언마운트 시 소켓 연결 해제 및 정리 작업
    return () => {
      socket.disconnect();
      // 필요한 정리 작업 수행
    };
  }, []);

  // 줄서기 인원 핸들러
  const changePeopleNumberHandler = (e) => {
    if (e.target.dataset.button === 'plus') {
      seteditedPepleNumber(editedPeopleNumber + 1);
    } else if (e.target.dataset.button === 'minus' && editedPeopleNumber > 0) {
      seteditedPepleNumber(editedPeopleNumber - 1);
    }
  };

  // 요청사항 input onChange핸들러
  const getRequest = (e) => {
    setRequest(e.target.value);
  };

  // 좌우버튼 클릭시 움직일 픽셀 핸들러
  const movCarouselPx = (e) => {
    const number = barTableStatus.length - 4;
    if (e.target.dataset.type === 'left' && px < 0) {
      setPx(px + 72);
    } else if (e.target.dataset.type === 'right' && px > -(72 * number)) {
      setPx(px - 72);
    }
  };

  const submitQueInfo = () => {};
  return (
    <UserQuePageWrapper>
      <SeatStatusArea px={px}>
        <div>
          <p>{'좌석 희망'}</p>
          <div>
            <div>
              <input
                onClick={() => setWhichButtonClicked('bar')}
                type={'radio'}
                id={'option1'}
                name={'myRadio'}
                checked
              />
              <span>{'바 좌석'}</span>
            </div>
            <span>
              {barTableStatus.length}
              {'석 중 '}
              {restSeat.restBarSeat}
              {'석 남음'}
            </span>
          </div>
        </div>
        <div>
          <button onClick={(e) => movCarouselPx(e)} data-type={'left'} type={'button'}>
            {'<'}
          </button>
          <div>
            {barTableStatus.map((item) => (
              <button key={item.id} data-activated={item.activated} type={'button'}>
                {item.id}
              </button>
            ))}
          </div>
          <button onClick={(e) => movCarouselPx(e)} data-type={'right'} type={'button'}>
            {'>'}
          </button>
        </div>
        <div>
          <div>
            <div>
              <input onClick={() => setWhichButtonClicked('hall')} type={'radio'} id={'option2'} name={'myRadio'} />
              <span>{'홀 좌석'}</span>
            </div>
            <span>
              {hallTableStatus.length}
              {'석 중 '}
              {restSeat.restHallSeat}
              {'석 남음'}
            </span>
          </div>
        </div>
      </SeatStatusArea>
      <div />
      <PeopleNumberArea>
        <p>{'인원'}</p>
        <div>
          <button onClick={(e) => changePeopleNumberHandler(e)} data-button={'minus'} type={'button'}>
            {'-'}
          </button>
          <div>{editedPeopleNumber}</div>
          <button onClick={(e) => changePeopleNumberHandler(e)} data-button={'plus'} type={'button'}>
            {'+'}
          </button>
        </div>
      </PeopleNumberArea>
      <div />
      <RequestArea>
        <div>
          <p>{'요청사항'}</p>
          <span>{'선택'}</span>
        </div>
        <input onChange={(e) => getRequest(e)} placeholder={'요청사항을 입력해주세요'} type={'text'} />
      </RequestArea>
      <Button onClick={() => submitQueInfo()} location={'both'}>
        {'줄 서기'}
      </Button>
    </UserQuePageWrapper>
  );
};

export default UserQuePage;

const UserQuePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > div:nth-child(2) {
    width: 90%;
    border-bottom: 0.5px solid #d3d3d3;
  }
  & > div:nth-child(4) {
    width: 90%;
    border-bottom: 0.5px solid #d3d3d3;
  }
  p {
    font-size: 20px;
    font-weight: 800;
  }

  & > button:last-child {
    margin-top: 18px;
    background-color: #ff8b00;
  }
`;

const SeatStatusArea = styled.div`
  margin-bottom: 24px;
  input {
    margin-right: 10px;
  }
  & > div:first-child {
    & > div:nth-child(2) {
      & > span {
        font-size: 13px;
      }
    }
    & > div:last-child {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
    }
  }
  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    margin: 24px auto 24px auto;
    padding: 0 20px 0 20px;
    height: 46px;
    width: 328px;
    border: 1px solid #d3d3d3;
    border-radius: 8px;
    overflow: hidden;
    white-space: nowrap;
    & > button {
      position: absolute;
      background-color: transparent;
      z-index: 1;
    }
    & > button:first-child {
      left: 15px;
    }
    & > button:last-child {
      right: 15px;
    }
    & > div {
      ${(props) => `transform : translateX(${props.px}px)`};
      transition: transform 1s;
      & > button {
        height: 24px;
        width: 24px;
        border-radius: 12px;
        margin: auto 24px auto 24px;
      }
      button[data-activated='true'] {
        background-color: black;
        color: white;
      }
    }
  }

  & > div:last-child {
    & > div {
      display: flex;
      justify-content: space-between;
      & > span {
        font-size: 13px;
      }
    }
  }
`;

const PeopleNumberArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 328px;
  margin: 24px auto 24px auto;
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 0.5px solid #e3e5e6;
    border-radius: 8px;
    width: 100px;
    height: 32px;
    & > button {
      height: 20px;
      width: 20px;
      background-color: white;
      color: #ff8b00;
    }
  }
`;

const RequestArea = styled.div`
  padding-top: 24px;
  width: 328px;
  & > div:first-child {
    display: flex;
    align-items: flex-end;
    & > span {
      margin-left: 10px;
    }
  }
  input {
    margin-top: 12px;
    height: 46px;
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 8px;
    padding-left: 15px;
  }
`;
