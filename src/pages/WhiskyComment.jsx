import React from 'react';
import { styled } from 'styled-components';
import { NoneData } from './statusPage';

// ! [props]
// * comment : 댓글 리스트 데이터

const WhiskyComment = ({ comment }) => {
  const myComment = comment.filter((item) => item.mine === true)[0];
  console.log(myComment);
  return (
    <>
      {comment.length === 0 && <NoneData>{'등록된 코멘트가 없어요'}</NoneData>}

      {comment && (
        <div>
          {myComment && (
            <CommentDiv key={myComment.review_id}>
              <CommentP idx={0}>{myComment.content}</CommentP>
              <TimeStampP>{myComment.createdAt.slice(0, 10).replace(/-/g, '.')}</TimeStampP>
              <MineLabel>{'MY'}</MineLabel>
            </CommentDiv>
          )}
          {comment
            .filter((item) => item.mine !== true)
            .map((item, idx) => (
              <CommentDiv key={item.review_id}>
                <CommentP idx={idx + 1}>{item.content}</CommentP>
                <TimeStampP>{item.createdAt.slice(0, 10).replace(/-/g, '.')}</TimeStampP>
              </CommentDiv>
            ))}
        </div>
      )}
    </>
  );
};

export default WhiskyComment;

const CommentDiv = styled.div`
  margin: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  display: flex;
  position: relative;
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

const MineLabel = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 35px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.orange};
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
