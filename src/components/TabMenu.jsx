import React from 'react';
import { styled } from 'styled-components';
import { useLocation } from 'react-router-dom';

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

  return (
    <TabSection url={url}>
      {tabgroup &&
        tabgroup.map((item) => {
          return (
            <TabMenuButton
              type="button"
              key={item.type}
              url={url}
              active={item.type === tabchosen ? 'true' : 'false'}
              onClick={() => ontabclickhandler(item.type)}
            >
              {item.name}
            </TabMenuButton>
          );
        })}
    </TabSection>
  );
};

export default TabMenu;

const TabSection = styled.section`
  width: 22.5rem;
  margin-left: -1rem;
  margin-bottom: 1.25rem;
  justify-content: ${({ url }) => (url === '/' ? 'none' : 'space-around')};
  padding-top: ${({ url }) => (url === '/' ? '0' : '0.625rem')};
  padding-left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  background-color: ${({ theme, url }) => (url === '/' ? theme.colors.darkBrown : 'transperant')};
  // ! 임시 주석 처리
  /* overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  } */
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
  font-weight: ${({ active }) => (active === 'true' ? '500' : '400')};
  color: ${({ theme, active, url }) =>
    active === 'true' && url === '/'
      ? theme.colors.white
      : active === 'true'
      ? theme.colors.orange
      : url === '/'
      ? '#947A6B'
      : theme.colors.darkGray};
  cursor: pointer;
`;
