import React from 'react';
import { styled } from 'styled-components';

// ! [props]
// * tabgroup : tab의 name과 type을 명시  ex. tabgroup = [{ name: '전체', type: 'all' }]
// * tabchosen : 어떤 tab이 선택되었는지 명시하는 state
//   - const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
//   - tabchosen값에 따라 하단에 보여줄 페이지 분기 처리 가능
//     ex. {tabChosen === 'bar' && <DetailList />}
// * ontabclickhandler : click한 값으로 tab 선택값 변경
//   - const onTabClickHandler = (type) => setTabChosen(type);

const TabMenu = ({ tabgroup, tabchosen, ontabclickhandler }) => {
  return (
    <TabSection>
      {tabgroup &&
        tabgroup.map((item) => {
          return (
            <TabMenuButton
              type="button"
              key={item.type}
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
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TabMenuButton = styled.button`
  padding: 8px 5px;
  background-color: transparent;
  border-bottom: ${({ active }) => (active === 'true' ? '2px solid black' : '2px solid transparent')};
  font-weight: ${({ active }) => (active === 'true' ? '600' : '400')};
  cursor: pointer;
`;
