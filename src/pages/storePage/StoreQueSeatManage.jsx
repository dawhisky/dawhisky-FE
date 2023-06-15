import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import StoreQueManage from './StoreQueManage';
import StoreSeatManage from './StoreSeatManage';

const StoreQueSeatManage = ({ setIsSeatEditMode, whichMode, setWhichMode, storeId }) => {
  return (
    <StoreQueSeatManageWrapper whichMode={whichMode}>
      <div>
        <button onClick={() => setWhichMode('que')} type={'button'}>
          {'줄서기 대기'}
        </button>
        <button onClick={() => setWhichMode('seat')} type={'button'}>
          {'좌석 현황'}
        </button>
      </div>
      {whichMode === 'que' ? (
        <StoreQueManage storeId={storeId} />
      ) : (
        <StoreSeatManage setIsSeatEditMode={setIsSeatEditMode} />
      )}
    </StoreQueSeatManageWrapper>
  );
};

export default StoreQueSeatManage;

const StoreQueSeatManageWrapper = styled.div`
  margin-top: 90px;
  width: 100%;

  & > div:first-child {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 108px;
    margin-top: 10px;

    button {
      width: 156px;
      height: 60px;
      border-radius: 8px;
    }
    button:first-child {
      ${(props) => props.whichMode === 'que' && 'background-color : #A5A5A5'}
    }
    button:last-child {
      ${(props) => props.whichMode === 'seat' && 'background-color : #A5A5A5'}
    }
  }
`;
