import React from 'react';
import { styled } from 'styled-components';
import { NoneData } from './statusPage';

// ! [props]
// * comment : 댓글 리스트 데이터

const WhiskyComment = ({ comment }) => {
  return (
    <CommentDiv>
      {comment && comment.map((item) => <p key={item.review_id}>{item.content}</p>)}
      {!comment && <NoneData>등록된 코멘트가 없어요</NoneData>}
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
