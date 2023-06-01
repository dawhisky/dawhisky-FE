import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout } from '../../components';

const StoreSeatEditPage = ({ setIsSeatEditMode }) => {
  const [editedSeatData, setEditedSeatData] = useState({ bar: 0, table: 0 });

  const changeSeatNumberHandler = (e) => {
    if (e.target.dataset.type === 'bar') {
      if (e.target.dataset.button === 'plus') {
        setEditedSeatData({ ...editedSeatData, bar: editedSeatData.bar + 1 });
      } else if (editedSeatData.bar > 0) {
        setEditedSeatData({ ...editedSeatData, bar: editedSeatData.bar - 1 });
      }
    } else if (e.target.dataset.type === 'table') {
      if (e.target.dataset.button === 'plus') {
        setEditedSeatData({ ...editedSeatData, table: editedSeatData.table + 1 });
      } else if (editedSeatData.table > 0) {
        setEditedSeatData({ ...editedSeatData, table: editedSeatData.table - 1 });
      }
    }
  };

  return (
    <Layout>
      <StoreSeatEditPageWrapper>
        <div>
          <button onClick={() => setIsSeatEditMode(false)} type={'button'}>
            {'이전'}
          </button>
          <h1>{'좌석 수정'}</h1>
          <button type={'button'}>{'완료'}</button>
        </div>
        <div>
          <div>
            <span>{'바 좌석'}</span>
            <div>
              <button
                onClick={(e) => changeSeatNumberHandler(e)}
                data-type={'bar'}
                data-button={'minus'}
                type={'button'}
              >
                {'-'}
              </button>
              <div>{editedSeatData.bar}</div>
              <button
                onClick={(e) => changeSeatNumberHandler(e)}
                data-type={'bar'}
                data-button={'plus'}
                type={'button'}
              >
                {'+'}
              </button>
            </div>
          </div>
          <div>
            <span>{'테이블 좌석'}</span>
            <div>
              <button
                onClick={(e) => changeSeatNumberHandler(e)}
                data-type={'table'}
                data-button={'minus'}
                type={'button'}
              >
                {'-'}
              </button>
              <div>{editedSeatData.table}</div>
              <button
                onClick={(e) => changeSeatNumberHandler(e)}
                data-type={'table'}
                data-button={'plus'}
                type={'button'}
              >
                {'+'}
              </button>
            </div>
          </div>
        </div>
      </StoreSeatEditPageWrapper>
    </Layout>
  );
};

export default StoreSeatEditPage;

const StoreSeatEditPageWrapper = styled.div`
  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 74px;
    width: 100%;
    padding: 10px;
    border-bottom: 0.5px solid #eaeaea;

    h1 {
      font-size: 18px;
      font-weight: 800;
    }
    button {
      background-color: transparent;
    }
  }
  & > div:nth-child(2) {
    margin-top: 30px;

    & > div {
      display: flex;
      justify-content: space-between;
      margin: 30px auto 30px auto;
      & > span {
        font-weight: 800;
        font-size: 18px;
        margin-left: 20px;
      }
      & > div {
        display: flex;
        margin-right: 20px;
        & > button {
          height: 20px;
          width: 20px;
        }
        & > div {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;
