import React from 'react';
import { styled } from 'styled-components';

const TabMenu = ({ tabgroup, whichtabchosen, ontabclickhandler }) => {
  return (
    <TabSection>
      {tabgroup &&
        tabgroup.map((item) => {
          return (
            <TabMenuButton
              type="button"
              key={item.type}
              active={item.type === whichtabchosen}
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
`;

const TabMenuButton = styled.button`
  padding: 8px 5px;
  background-color: transparent;
  border-bottom: ${({ active }) => (active ? '2px solid black' : '2px solid transparent')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
`;
