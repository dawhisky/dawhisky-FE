import React, { useState } from 'react';
import { styled } from 'styled-components';
import { BsChevronDown, BsCheck2 } from 'react-icons/bs';
import Button from './Button';

// ! [props]
// * category : 카테고리 명
// * list : 카테고리 명 클릭했을 때 보여줄 세부 리스트 (배열)
// * categorychosen : 세부 리스트 중 사용자가 어떤 값을 선택했는지 (state)
// * onclickhandler : 세부 리스트 중 사용자가 선택한 값으로 setState 처리

const CategorySelect = ({ category, list, categorychosen, onclickhandler }) => {
  const [showUlList, setShowUlList] = useState(false);
  const isShowListHandler = () => setShowUlList(!showUlList);

  return (
    <>
      <SelectButton onClick={isShowListHandler}>
        {category}
        <BsChevronDown />
      </SelectButton>
      {showUlList && (
        <>
          <BackgroundDiv onClick={isShowListHandler} />
          <ListUl>
            {/* // TODO 초기 category name값 유지 */}
            <span>{category}</span>
            {list.map((item, idx) => {
              return (
                <ListLi
                  key={item}
                  active={item === categorychosen ? 'true' : 'false'}
                  onClick={() => onclickhandler(idx, item)}
                >
                  <p>{item}</p>
                  <BsCheck2 />
                </ListLi>
              );
            })}
            <ButtonWrapDiv>
              <Button location={'both'} onClick={isShowListHandler}>
                닫기
              </Button>
            </ButtonWrapDiv>
          </ListUl>
        </>
      )}
    </>
  );
};

export default CategorySelect;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const SelectButton = styled.button`
  padding: 0.5rem 0.75rem;
  display: flex;
  flex-direction: center;
  justify-content: center;
  align-items: center;
  gap: 0.313rem;
  font-size: 0.813rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.lightBrown};
  background-color: ${({ theme }) => theme.colors.lightOrange};
  border: 0.5px solid ${({ theme }) => theme.colors.mediumOrange};
  border-radius: 1rem;
  cursor: pointer;
`;

const ListUl = styled.ul`
  width: 22.5rem;
  position: fixed;
  bottom: 3.75rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.75rem 0.75rem 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  overflow-y: auto;
  animation: fadeInUp 0.7s;
  & span {
    height: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate(-50%, 100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const ListLi = styled.li`
  margin: 1rem 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  :first-child {
    font-weight: ${({ active }) => (active === 'true' ? '700' : '400')};
    width: 18.75rem;
  }
  :last-child {
    font-size: 1.25rem;
    color: ${({ theme, active }) => (active === 'true' ? theme.colors.orange : 'transparent')};
  }
`;

const ButtonWrapDiv = styled.div`
  height: 4.375rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
