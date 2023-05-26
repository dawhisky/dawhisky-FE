import React from 'react';
import { styled } from 'styled-components';

const StoreBottleManage = () => {
  const data = [
    { id: 1, nameKor: '위스키 이름1', nameEng: 'Whisky name', abv: 45 },
    { id: 2, nameKor: '위스키 이름2', nameEng: 'Whisky name', abv: 45 },
    { id: 3, nameKor: '위스키 이름3', nameEng: 'Whisky name', abv: 45 },
    { id: 4, nameKor: '위스키 이름4', nameEng: 'Whisky name', abv: 45 },
    { id: 5, nameKor: '위스키 이름5', nameEng: 'Whisky name', abv: 45 },
    { id: 6, nameKor: '위스키 이름6', nameEng: 'Whisky name', abv: 45 },
    { id: 7, nameKor: '위스키 이름7', nameEng: 'Whisky name', abv: 45 },
  ];
  return (
    <StoreBottleManageWrapper>
      <div id="whisky-list">
        {data.map((item) => (
          <div key={item.id} className="individual-whisky">
            <div>
              <div className="image-wrapper">img</div>
              <div className="individual-whisky-data">
                <p className="name-kor">{item.nameKor}</p>
                <p className="name-eng">{item.nameEng}</p>
                <p className="abv">{item.abv}% vol</p>
              </div>
            </div>
            <button className="delete-button" type="button">
              삭제
            </button>
          </div>
        ))}
      </div>
      <button id="bottle-insert" type="button">
        주류 등록
      </button>
    </StoreBottleManageWrapper>
  );
};

export default StoreBottleManage;

const StoreBottleManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  #whisky-list {
    width: 328px;
    overflow: scroll;

    .individual-whisky {
      display: flex;
      justify-content: space-between;
      padding-top: 32px;
      align-items: flex-end;

      .image-wrapper {
        height: 72px;
        width: 72px;
        background-color: #ececec;
        color: grey;
      }
      div {
        display: flex;
        .individual-whisky-data {
          display: flex;
          flex-direction: column;
          margin-left: 15px;
          .name-kor {
            font-weight: 600;
          }
          .name-eng {
            font-weight: 400;
            font-size: 11px;
            color: #818181;
          }
          .abv {
            font-size: 11px;
          }
        }
      }
      .delete-button {
        display: flex;
        width: 30px;
        height: 20px;
        background-color: transparent;
        color: #979c9e;
        font-size: 14px;
      }
    }
  }

  #bottle-insert {
    height: 40px;
    width: 326px;
    position: fixed;
    top: 500px;
    border-radius: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
`;
