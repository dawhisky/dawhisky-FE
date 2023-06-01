import React from 'react';
import { styled } from 'styled-components';

const StoreQueManage = ({ queList }) => {
  return (
    <div>
      {queList.map((item) => {
        return (
          <IndividualQueList key={item.id}>
            <div>
              <div>{item.name}</div>
              <div>
                <span>
                  {item.preference}
                  {' 좌석 '}
                </span>
                <span>
                  {item.seat}
                  {'명'}
                </span>
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
