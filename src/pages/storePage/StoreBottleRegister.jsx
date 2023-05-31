import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, CategorySelect } from '../../components';

const StoreBottleRegister = ({ setIsRegisterMode }) => {
  const data = [
    { id: 1, nameKor: '위스키 이름1', nameEng: 'Whisky name', abv: 45 },
    { id: 2, nameKor: '위스키 이름2', nameEng: 'Whisky name', abv: 45 },
    { id: 3, nameKor: '위스키 이름3', nameEng: 'Whisky name', abv: 45 },
    { id: 4, nameKor: '위스키 이름4', nameEng: 'Whisky name', abv: 45 },
    { id: 5, nameKor: '위스키 이름5', nameEng: 'Whisky name', abv: 45 },
    { id: 6, nameKor: '위스키 이름6', nameEng: 'Whisky name', abv: 45 },
    { id: 7, nameKor: '위스키 이름7', nameEng: 'Whisky name', abv: 45 },
  ];

  const countryFilter = ['스카치', '아이리시', '아메리칸', '재패니스', 'etc'];

  const [filteredData, setFilteredData] = useState(data);

  const onChangeHandler = (e) => {
    setFilteredData(
      data.filter((item) => {
        return item.nameKor.includes(e.target.value) || item.nameEng.includes(e.target.value);
      }),
    );
  };

  return (
    <Layout>
      <StoreBottleRegisterWrapper>
        <div>
          <div>
            <button onClick={() => setIsRegisterMode(false)} type={'button'}>
              {'이전'}
            </button>
            <div>{'주류 등록'}</div>
          </div>
          <input onChange={(e) => onChangeHandler(e)} type={'text'} placeholder={'등록할 위스키를 검색해보세요!'} />
          <div>
            <CategorySelect category={'나라별'} list={countryFilter} />
            <CategorySelect category={'지역별'} list={[1, 2, 3, 4, 5]} />
            <CategorySelect category={'재료별'} list={[1, 2, 3, 4, 5]} />
          </div>
        </div>
        <div>
          {filteredData.map((item) => {
            return (
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
                <button type={'button'}>{'등록'}</button>
              </IndividualWhisky>
            );
          })}
        </div>
      </StoreBottleRegisterWrapper>
    </Layout>
  );
};

export default StoreBottleRegister;

const StoreBottleRegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: fixed;
    height: 168px;
    background-color: white;
    border-bottom: 0.5px solid #eaeaea;

    div:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 100%;
      width: 100%;

      button {
        justify-self: left;
        position: absolute;
        left: 5%;
        background-color: transparent;
      }

      div {
        font-size: 20px;
        font-weight: 800;
      }
    }
    input {
      height: 50px;
      width: 328px;
      padding: 10px;
      border-radius: 8px;
      background-color: #f3f3f3;
      color: #72777a;
    }
    div:last-child {
      display: flex;
      margin-left: 5px;

      button {
        margin: 5px;
      }
    }
  }

  & > div:nth-child(2) {
    margin-top: 168px;
    margin-bottom: 70px;
    width: 328px;
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
      margin-right: 10px;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: column;
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

// 검색 시스템 디테일하게
