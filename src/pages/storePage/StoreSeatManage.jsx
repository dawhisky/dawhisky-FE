import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const StoreSeatManage = ({ setIsSeatEditMode }) => {
  const seatInfo = { bar: 8, table: 4 };
  const barSeatInfo = [];
  const tableSeatInfo = [];

  const makeSeatInfo = (seatData) => {
    for (let i = 1; i <= seatData.bar; i += 1) {
      barSeatInfo.push({ id: i, activated: false });
    }
    for (let i = 1; i <= seatData.table; i += 1) {
      tableSeatInfo.push({ id: i, activated: false });
    }
  };
  makeSeatInfo(seatInfo);

  const [barSeatData, setBarSeatData] = useState(barSeatInfo);
  const [tableSeatData, setTableSeatData] = useState(tableSeatInfo);
  const [isDifferent, setIsDifferent] = useState(false);

  const toggleSeatHandler = (e) => {
    if (e.target.dataset.type === 'bar') {
      const editedBarSeatData = [...barSeatData];
      editedBarSeatData[e.target.id - 1].activated = !editedBarSeatData[e.target.id - 1].activated;
      setBarSeatData(editedBarSeatData);
    } else {
      const editedTableSeatData = [...tableSeatData];
      editedTableSeatData[e.target.id - 1].activated = !editedTableSeatData[e.target.id - 1].activated;
      setTableSeatData(editedTableSeatData);
    }
  };

  useEffect(() => {
    if (
      JSON.stringify(barSeatInfo) !== JSON.stringify(barSeatData) ||
      JSON.stringify(tableSeatInfo) !== JSON.stringify(tableSeatData)
    ) {
      setIsDifferent(true);
    } else {
      setIsDifferent(false);
    }
  }, [barSeatData, tableSeatData]);

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
            {barSeatData.map((item) => (
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
            {tableSeatData.map((item) => (
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
      <button data-isDifferent={isDifferent} type={'button'}>
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
