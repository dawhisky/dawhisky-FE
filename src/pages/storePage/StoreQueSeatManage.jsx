import React from 'react';
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
      font-weight: 600;
      cursor: pointer;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    button:first-child {
      background-color: ${(props) =>
        props.whichMode === 'que' ? props.theme.colors.orange : props.theme.colors.white};
      border: ${(props) => (props.whichMode === 'que' ? 'none' : `1px solid ${props.theme.colors.gray}`)};
      color: ${(props) => (props.whichMode === 'que' ? props.theme.colors.white : 'black')};
    }
    button:last-child {
      background-color: ${(props) =>
        props.whichMode === 'seat' ? props.theme.colors.orange : props.theme.colors.white};
      border: ${(props) => (props.whichMode === 'que' ? `1px solid ${props.theme.colors.gray}` : 'none')};
      color: ${(props) => (props.whichMode === 'seat' ? props.theme.colors.white : 'black')};
    }
  }
`;
