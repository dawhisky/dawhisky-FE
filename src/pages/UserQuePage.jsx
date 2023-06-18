import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { getTableInfo } from '../api/table';
import { getMyQueue, postMyQueue, editMyQueue, deleteMyQueue } from '../api/queue';
import { Button } from '../components';

const UserQuePage = () => {
  // useParams 호출
  const params = useParams();
  const storeId = params.id;

  // useQueryClient 호출
  const queryClient = useQueryClient();

  // 해당 스토어 테이블정보 상태관리
  const [barTableStatus, setBarTableStatus] = useState([]);
  const [hallTableStatus, setHallTableStatus] = useState([]);
  // 잔여 좌석 상태관리
  const [restSeat, setRestSeat] = useState({});
  // 바 좌석, 홀 좌석 어떤 라디오버튼 클릭됐는지
  const [whichButtonClicked, setWhichButtonClicked] = useState('');
  // 줄서기 희망 인원 상태관리
  const [editedPeopleNumber, setEditedPeopleNumber] = useState(0);
  // 요청사항 상태관리
  const [request, setRequest] = useState('');
  // 해당스토어 내 줄서기 현황
  const [myQueData, setMyQueData] = useState({});
  // 유저가 이미 줄서기를 한 상태인지
  const [queued, setQueued] = useState(false);
  // 캐러셀 이동 픽셀 상태관리
  const [px, setPx] = useState(0);

  // 해당 스토어 테이블 정보
  const {
    isLoading: isLoadingTable,
    isError: isErrorTable,
    data: tableData,
  } = useQuery('getTableInfo', () => getTableInfo(storeId));

  // 해당 스토어 내 줄서기 정보
  const {
    isLoading: isLoadingQue,
    isError: isErrorQue,
    data: myQueInfo,
  } = useQuery('getMyQueue', () => getMyQueue(storeId));

  // 줄서기요청api
  const postMyQueueApi = useMutation(postMyQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries('getMyQueue', getMyQueue(storeId));
      toast.success('줄서기를 완료하셨습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 줄서기수정api
  const editMyQueueApi = useMutation(editMyQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries('getMyQueue', getMyQueue(storeId));
      toast.success('줄서기 수정을 완료하셨습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 줄서기삭제api
  const deleteMyQueueApi = useMutation(deleteMyQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries('getMyQueue', getMyQueue(storeId));
      toast.success('줄서기 삭제를 완료하셨습니다.');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (tableData) {
      const barTableInfo = JSON.parse(tableData.bar_table).map((item, index) => {
        return item === 1 ? { id: index + 1, activated: true } : { id: index + 1, activated: false };
      });
      const hallTableInfo = JSON.parse(tableData.hall_table).map((item, index) => {
        return item === 1 ? { id: index + 1, activated: true } : { id: index + 1, activated: false };
      });
      const restBarSeat =
        JSON.parse(tableData.bar_table).length - JSON.parse(tableData.bar_table).filter((item) => item === 1).length;
      const restHallSeat =
        JSON.parse(tableData.hall_table).length - JSON.parse(tableData.hall_table).filter((item) => item === 1).length;
      setRestSeat({ restBarSeat, restHallSeat });
      setBarTableStatus(barTableInfo);
      setHallTableStatus(hallTableInfo);
    }
  }, [tableData]);

  useEffect(() => {
    if (myQueInfo && Object.keys(myQueInfo).length !== 0) {
      setQueued(true);
    } else {
      setQueued(false);
    }
    setMyQueData(myQueInfo);
  }, [myQueInfo]);

  useEffect(() => {
    if (myQueData && Object.keys(myQueData).length !== 0) {
      setWhichButtonClicked(myQueData.want_table);
      setEditedPeopleNumber(myQueData.head_count);
      setRequest(myQueData.request);
    }
  }, [myQueData]);

  console.log(myQueData);

  // 줄서기 인원 핸들러
  const changePeopleNumberHandler = (e) => {
    if (e.target.dataset.button === 'plus') {
      setEditedPeopleNumber(editedPeopleNumber + 1);
    } else if (e.target.dataset.button === 'minus' && editedPeopleNumber > 0) {
      setEditedPeopleNumber(editedPeopleNumber - 1);
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

  // 줄서기 제출 핸들러
  const submitQueInfo = () => {
    // 작성된 줄서기 정보
    const editedQueue = {
      want_table: whichButtonClicked,
      head_count: editedPeopleNumber,
      request,
      device_token: '',
    };
    console.log(editedQueue.device_token);
    postMyQueueApi.mutate({ storeId, editedQueue });
  };

  // 줄서기 수정 핸들러
  const editQueInfo = () => {
    const queId = myQueData.que_id;
    const editedQueue = {
      want_table: whichButtonClicked,
      head_count: editedPeopleNumber,
      request,
      device_token: '',
    };
    editMyQueueApi.mutate({ queId, editedQueue });
  };

  // 줄서기 삭제 핸들러
  const deleteQueInfo = () => {
    const queId = myQueData.que_id;
    deleteMyQueueApi.mutate(queId);
    setWhichButtonClicked('');
    setEditedPeopleNumber(0);
    setRequest('');
  };

  // 라디오 버튼 선택 상태 확인 함수
  const isRadioButtonChecked = (buttonType) => {
    return whichButtonClicked === buttonType;
  };

  return (
    <UserQuePageWrapper>
      <SeatStatusArea px={px}>
        <div>
          <p>{'좌석 희망'}</p>
          <div>
            <div>
              <input
                onClick={() => setWhichButtonClicked('bar')}
                checked={isRadioButtonChecked('bar')}
                type={'radio'}
                id={'option1'}
                name={'myRadio'}
              />
              <span>{'바 좌석'}</span>
            </div>
            <span>
              {barTableStatus.length}
              {'좌석 중 '}
              {restSeat.restBarSeat}
              {'좌석 남음'}
            </span>
          </div>
        </div>
        <div>
          <button onClick={(e) => movCarouselPx(e)} data-type={'left'} type={'button'}>
            {'<'}
          </button>
          <div>
            {barTableStatus.length === 0 ? (
              <p>{'입력된 좌석정보가 없습니다.'}</p>
            ) : (
              barTableStatus.map((item) => (
                <button key={item.id} data-activated={item.activated} type={'button'}>
                  {item.id}
                </button>
              ))
            )}
          </div>
          <button onClick={(e) => movCarouselPx(e)} data-type={'right'} type={'button'}>
            {'>'}
          </button>
        </div>
        <div>
          <div>
            <div>
              <input
                onClick={() => setWhichButtonClicked('hall')}
                checked={isRadioButtonChecked('hall')}
                type={'radio'}
                id={'option2'}
                name={'myRadio'}
              />
              <span>{'홀 좌석'}</span>
            </div>

            <span>
              {hallTableStatus.length}
              {'테이블 중 '}
              {restSeat.restHallSeat}
              {'테이블 남음'}
            </span>
          </div>
        </div>
        <div>
          <input
            onClick={() => setWhichButtonClicked('dontcare')}
            checked={isRadioButtonChecked('dontcare')}
            type={'radio'}
            id={'option3'}
            name={'myRadio'}
          />
          <span>{'상관없음'}</span>
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
        <input onChange={(e) => getRequest(e)} value={request} placeholder={'요청사항을 입력해주세요'} type={'text'} />
      </RequestArea>
      {queued ? (
        <div>
          <Button data-type={'edit'} onClick={() => editQueInfo()} location={'both'}>
            {'줄 서기 수정'}
          </Button>
          <Button data-type={'delete'} onClick={() => deleteQueInfo()} location={'both'}>
            {'줄 서기 삭제'}
          </Button>
        </div>
      ) : (
        <Button data-type={'post'} onClick={() => submitQueInfo()} location={'both'}>
          {'줄 서기'}
        </Button>
      )}
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
  & > div:last-child {
    display: flex;
    width: 100%;

    button[data-type='post'] {
      background-color: #ff8b00;
    }
    button[data-type='edit'] {
      background-color: #ff8b00;
    }
    button[data-type='delete'] {
    }
  }
  & > button {
    margin-top: 15px;
  }
`;

const SeatStatusArea = styled.div`
  margin-bottom: 24px;
  input {
    margin-right: 10px;
    cursor: pointer;
  }
  & > div:first-child,
  & > div:nth-child(3) {
    & > div {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;

      & > span {
        font-size: 13px;
      }
    }
  }
  & > div:last-child {
    margin-top: 15px;
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
    & > div {
      width: 100%;
      text-align: center;
      & > p {
        font-size: 13px;
        font-weight: 500;
      }
    }
    & > button {
      position: absolute;
      background-color: transparent;
      z-index: 1;
    }
    & > button:first-child {
      left: 15px;
      cursor: pointer;
    }
    & > button:last-child {
      right: 15px;
      cursor: pointer;
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
  margin: 10px 0 10px 0;

  & > div {
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
      cursor: pointer;
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
