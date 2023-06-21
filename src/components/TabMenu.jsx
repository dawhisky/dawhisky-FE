import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { BsChevronCompactRight } from 'react-icons/bs';
import { AiOutlineCaretRight } from 'react-icons/ai';
import throttle from '../hooks/throttle';

// ! [props]
// * tabgroup : tab의 name과 type을 명시  ex. tabgroup = [{ name: '전체', type: 'all' }]
// * tabchosen : 어떤 tab이 선택되었는지 명시하는 state
//   - const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
//   - tabchosen값에 따라 하단에 보여줄 페이지 분기 처리 가능
//     ex. {tabChosen === 'bar' && <DetailList />}
// * ontabclickhandler : click한 값으로 tab 선택값 변경
//   - const onTabClickHandler = (type) => setTabChosen(type);

const TabMenu = ({ tabgroup, tabchosen, ontabclickhandler }) => {
  const location = useLocation();
  const url = location.pathname;

  // scrollLeft값을 얻기 위해 useRef를 사용하여 DOM에 접근
  const scrollRef = useRef(0);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  // 캐러셀 아이콘
  const [rightIcon, setRightIcon] = useState(true);

  const onDragStartHandler = (e) => {
    e.preventDefault();
    setIsDrag(true);
    // [scrollLeft] 스크롤의 가장 왼쪽 (DOM.scrollLeft = 0)부터 이동한 스크롤 길이
    // [mouseEvent.pageX] onMouseDown 시 x 좌표
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEndHandler = () => setIsDrag(false);

  // [startX] 현재 클릭한 pageX와 움직인 스크롤의 길이 scrollLeft를 합친 값
  const onDragMoveHandler = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        // 가장 왼쪽일 때, 움직이고 있는 마우스의 x좌표 === startX
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        // 가장 오른쪽일 때, 움직이고 있는 마우스의 x좌표 + 현재 스크롤된 길이 scrollLeft
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  // * tab menu 우측 추가메뉴 인지할 수 있도록 아이콘 추가
  useEffect(() => {
    if (scrollRef.current.scrollLeft === 0) {
      setRightIcon(true);
    } else if (scrollRef.current.scrollLeft > 0) {
      setRightIcon(false);
    }
  }, [scrollRef.current.scrollLeft]);

  const onThrottleMoveHandler = throttle(onDragMoveHandler, 100);

  return (
    <TabSection
      url={url}
      ref={scrollRef}
      onMouseDown={onDragStartHandler}
      onMouseMove={isDrag ? onThrottleMoveHandler : null}
      onMouseUp={onDragEndHandler}
      onMouseLeave={onDragMoveHandler}
    >
      {tabgroup &&
        tabgroup.map((item) => {
          return (
            <TabMenuButton
              type={'button'}
              key={item.type}
              url={url}
              active={item.type === tabchosen ? 'true' : 'false'}
              onClick={() => ontabclickhandler(item.type)}
            >
              {item.name}
            </TabMenuButton>
          );
        })}
      {rightIcon && <TabRightIcon />}
    </TabSection>
  );
};

export default TabMenu;

const TabSection = styled.section`
  width: 22.5rem;
  margin-left: -1rem;
  margin-bottom: 1.25rem;
  justify-content: ${({ url }) => (url === '/' ? 'none' : 'space-around')};
  padding: 0.3rem 1rem 0 1rem;
  display: flex;
  gap: 0.625rem;
  position: relative;
  background-color: ${({ theme, url }) => (url === '/' ? theme.colors.darkBrown : 'transperant')};
  white-space: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabMenuButton = styled.button`
  padding: 0.5rem 0.313rem;
  background-color: transparent;
  border-bottom: ${({ theme, active, url }) =>
    active === 'true' && url === '/'
      ? `0.125rem solid ${theme.colors.white}`
      : active === 'true'
      ? `0.125rem solid ${theme.colors.orange}`
      : url === '/'
      ? '0.125rem solid transparent'
      : ''};
  font-weight: ${({ active }) => (active === 'true' ? '700' : '500')};
  color: ${({ theme, active, url }) =>
    active === 'true' && url === '/'
      ? theme.colors.white
      : active === 'true'
      ? theme.colors.orange
      : url === '/'
      ? theme.colors.brown
      : theme.colors.darkGray};
  cursor: pointer;
`;

const TabRightIcon = styled(AiOutlineCaretRight)`
  position: absolute;
  font-size: 1.125rem;
  top: 0.875rem;
  right: 0.125rem;
  color: ${({ theme }) => theme.colors.white};
`;
