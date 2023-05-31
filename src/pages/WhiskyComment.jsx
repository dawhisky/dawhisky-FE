import React from 'react';
import { styled } from 'styled-components';

const WhiskyComment = () => {
  return (
    <CommentDiv>
      <p>Consequat proin ut sit tortor non habitasse sem fusce tincidunt.</p>
      <p>Faucibus consequat nibh elementum faucibus facilisi.</p>
      <p>Sed sed ipsum consequat maecenas non bibendum ullamcorper.</p>
    </CommentDiv>
  );
};

export default WhiskyComment;

const CommentDiv = styled.div`
  & p {
    border-bottom: 1px solid #eaeaea;
  }
  & > p:first-child {
    padding-bottom: 30px;
  }
  & > p:nth-child(n + 2) {
    padding: 30px 0;
  }
`;
