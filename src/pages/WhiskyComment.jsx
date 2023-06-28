import React from 'react';
import { styled } from 'styled-components';
import { NoneData } from './statusPage';

// ! [props]
// * comment : 댓글 리스트 데이터

const WhiskyComment = ({ comment }) => {
  console.log(comment);
  return (
    <>
      {comment.length === 0 && <NoneData>{'등록된 코멘트가 없어요'}</NoneData>}
      {comment &&
        comment.map((item, idx) => (
          <CommentDiv key={item.review_id}>
            <CommentP idx={idx}>{item.content}</CommentP>
            <TimeStampP>{item.createdAt.slice(0, 10).replace(/-/g, '.')}</TimeStampP>
          </CommentDiv>
        ))}
    </>
  );
};

export default WhiskyComment;

const CommentDiv = styled.div`
  margin: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  flex-direction: column;
`;

const CommentP = styled.p`
  padding: ${(props) => (props.idx === 0 ? '0 4px 5px 10px' : '20px 4px 5px 10px')};
  text-align: justify;
  word-break: break-all;
  white-space: pre-wrap;
`;

const TimeStampP = styled.p`
  padding: 0 20px 20px 10px;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 11px;
`;
