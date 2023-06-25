import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { CategorySelect, DetailList } from '../../components';
import { getWhiskyList } from '../../api/whisky';

const StoreBottleRegister = ({ setIsRegisterMode }) => {
  const { data } = useQuery('getWhiskyList', () => getWhiskyList());

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
      {data && <DetailList list={data} />}
    </StoreBottleRegisterWrapper>
  );
};

export default StoreBottleRegister;

const StoreBottleRegisterWrapper = styled.div`
  border: 2px solid blue;
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
