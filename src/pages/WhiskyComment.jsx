import React from 'react';
import { styled } from 'styled-components';
import { NoneData } from './statusPage';

// ! [props]
// * comment : 댓글 리스트 데이터

const WhiskyComment = ({ comment }) => {
  return (
    <>
      {comment &&
        comment.map((item, idx) => (
          <CommentDiv key={item.review_id}>
            <CommentP idx={idx}>{item.content}</CommentP>
          </CommentDiv>
        ))}
      {!comment && <NoneData>{'등록된 코멘트가 없어요'}</NoneData>}
    </>
  );
};

export default WhiskyComment;

const CommentDiv = styled.div`
  margin: 0 0.625rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  align-items: center;
`;

const CommentP = styled.p`
  padding: ${(props) => (props.idx === 0 ? '0 1.875rem 1.875rem 1.875rem' : '1.875rem')};
`;
