import React from 'react';
import { styled } from 'styled-components';

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
