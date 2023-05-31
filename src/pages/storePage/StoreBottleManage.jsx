import React from 'react';
import { styled } from 'styled-components';
import { Button } from '../../components';

const StoreBottleManage = ({ setIsRegisterMode }) => {
  const data = [
    { id: 1, nameKor: '위스키 이름1', nameEng: 'Whisky name', abv: 45 },
    { id: 2, nameKor: '위스키 이름2', nameEng: 'Whisky name', abv: 45 },
    { id: 3, nameKor: '위스키 이름3', nameEng: 'Whisky name', abv: 45 },
    { id: 4, nameKor: '위스키 이름4', nameEng: 'Whisky name', abv: 45 },
    { id: 5, nameKor: '위스키 이름5', nameEng: 'Whisky name', abv: 45 },
    { id: 6, nameKor: '위스키 이름6', nameEng: 'Whisky name', abv: 45 },
    { id: 7, nameKor: '위스키 이름7', nameEng: 'Whisky name', abv: 45 },
    { id: 8, nameKor: '위스키 이름8', nameEng: 'Whisky name', abv: 45 },
    { id: 9, nameKor: '위스키 이름9', nameEng: 'Whisky name', abv: 45 },
    { id: 10, nameKor: '위스키 이름10', nameEng: 'Whisky name', abv: 45 },
    { id: 11, nameKor: '위스키 이름11', nameEng: 'Whisky name', abv: 45 },
    { id: 12, nameKor: '위스키 이름12', nameEng: 'Whisky name', abv: 45 },
    { id: 13, nameKor: '위스키 이름13', nameEng: 'Whisky name', abv: 45 },
    { id: 14, nameKor: '위스키 이름14', nameEng: 'Whisky name', abv: 45 },
  ];
  return (
    <StoreBottleManageWrapper>
      <div>
        {data.map((item) => (
          <IndividualWhisky key={item.id}>
            <div>
              <div>{'img'}</div>
              <div>
                <p>{item.nameKor}</p>
                <p>{item.nameEng}</p>
                <p>
                  {item.abv}
                  {'% vol'}
                </p>
              </div>
            </div>
            <button type={'button'}>{'삭제'}</button>
          </IndividualWhisky>
        ))}
      </div>
      <Button onClick={() => setIsRegisterMode(true)} location={'both'}>
        {'주류 등록'}
      </Button>
    </StoreBottleManageWrapper>
  );
};

export default StoreBottleManage;

const StoreBottleManageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 80px;
  padding-left: 20px;

  & > div:first-child {
    width: 100%;
    overflow-y: scroll;
  }

  & > button:last-child {
    height: 40px;
    width: 326px;
    position: fixed;
    top: 500px;
    border-radius: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;

const IndividualWhisky = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
  align-items: flex-end;

  & > div:first-child {
    display: flex;
    div:first-child {
      height: 72px;
      width: 72px;
      background-color: #ececec;
      color: grey;
    }

    div:nth-child(2) {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      p:first-child {
        font-weight: 600;
      }
      p:nth-child(2) {
        font-weight: 400;
        font-size: 11px;
        color: #818181;
      }
      p:last-child {
        font-size: 11px;
      }
    }
  }
  button {
    display: flex;
    width: 30px;
    height: 20px;
    background-color: transparent;
    color: #979c9e;
    font-size: 14px;
  }
`;
