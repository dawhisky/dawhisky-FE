import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Layout, TabMenu, WhiskyGrid } from '../../components';
import SelectWhisky from './SelectWhisky';

const UserManagePage = () => {
  const tabGroup = [
    { name: '코멘트 관리', type: 'getComment' },
    { name: '코멘트 등록', type: 'setComment' },
    { name: '내 정보', type: 'myInfo' },
  ];
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const onTabClickHandler = (type) => setTabChosen(type);

  return (
    <Layout>
      <UserNameP>닉네임</UserNameP>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} ontabclickhandler={onTabClickHandler} />
      {tabChosen === 'getComment' && <WhiskyGrid />}
      {tabChosen === 'setComment' && <SelectWhisky />}
      {tabChosen === 'myInfo' && '와이어프레임 미정'}
    </Layout>
  );
};

export default UserManagePage;

const UserNameP = styled.header`
  margin-left: -16px;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
`;
