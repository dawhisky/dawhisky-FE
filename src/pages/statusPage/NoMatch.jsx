import React from 'react';
import Layout from '../../components/Layout';
import NoneData from './NoneData';

const NoMatch = () => {
  return (
    <Layout>
      <NoneData height={'90vh'}>{'일치하는 페이지를 찾을 수 없습니다'}</NoneData>
    </Layout>
  );
};

export default NoMatch;
