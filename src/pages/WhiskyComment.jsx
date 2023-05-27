import React from 'react';
import { styled } from 'styled-components';

const WhiskyComment = () => {
  return (
    <div>
      <CommentP>Consequat proin ut sit tortor non habitasse sem fusce tincidunt.</CommentP>
      <CommentP>Faucibus consequat nibh elementum faucibus facilisi.</CommentP>
      <CommentP>Sed sed ipsum consequat maecenas non bibendum ullamcorper.</CommentP>
    </div>
  );
};

export default WhiskyComment;

const CommentP = styled.p`
  padding: 32px 0;
  border-bottom: 1px solid #eaeaea;
`;
