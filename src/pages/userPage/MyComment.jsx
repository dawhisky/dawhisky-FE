import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { BsTrash3 } from 'react-icons/bs';
import { Layout, DetailHeader, Image, TabMenu, Button } from '../../components';

const MyComment = () => {
  const tabGroup = [{ name: '내 코멘트', type: 'myComment' }];
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [editmode, setEditmode] = useState(false);
  // TODO useState 초기값 기존에 작성한 댓글 값으로 넣어줘야 함
  const [editComment, setEditComment] = useState('');
  const focusComment = useRef();

  // * 수정모드일 때 textarea에 포커싱
  useEffect(() => {
    if (editmode) {
      focusComment.current.focus();
    }
  }, [editmode]);

  // * 수정모드로 변경
  const onSubmitClickHandler = (e) => {
    e.preventDefault();
    setEditmode(!editmode);
  };

  // * 댓글 수정 버튼 click
  const onCommentChangeHandler = (e) => {
    e.preventDefault();
    setEditComment(e.target.value);
  };

  // * 댓글 삭제 버튼 click
  const onDeleteClickHandler = (e) => {
    e.preventDefault();
    // 삭제 alert 또는 모달 호출
  };

  return (
    <Layout>
      <DetailHeader korname={'위스키 이름'} engname={'Whisky name'} />
      <ImageDiv>
        <Image width={'360px'} height={'360px'} src={''} alt={''} />
      </ImageDiv>
      <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} />
      <form>
        {/* TODO editmode === 'false'이고 불러온 데이터가 없을 경우 '수정' 버튼 '등록'으로 수정, 가운데에 NoneData.jsx 출력 */}
        {tabChosen === 'myComment' && !editmode ? (
          // * 코멘트 조회
          <CommentP>Consequat proin ut sit tortor non habitasse sem fusce tincidunt.</CommentP>
        ) : (
          // * 코멘트 수정
          <CommentTextarea
            type="text"
            rows="5"
            ref={focusComment}
            value={editComment}
            onChange={onCommentChangeHandler}
          />
        )}
        <ButtonWrapDiv>
          {!editmode ? (
            <>
              <Button size={'medium'} onClick={onSubmitClickHandler}>
                수정
              </Button>
              <button type="button" onClick={onDeleteClickHandler}>
                <BsTrash3 />
              </button>
            </>
          ) : (
            <>
              <Button onClick={onSubmitClickHandler}>등록</Button>
              <NullDiv />
            </>
          )}
        </ButtonWrapDiv>
      </form>
    </Layout>
  );
};

export default MyComment;

const ImageDiv = styled.div`
  width: 360px;
  margin-left: -17px;
  position: relative;
`;

const CommentP = styled.p`
  padding: 30px 0;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  margin: 20px 0;
  padding: 10px 10px 10px 0;
`;

const ButtonWrapDiv = styled.div`
  & > button:nth-child(1) {
    position: absolute;
    z-index: 1;
    font-weight: 600;
  }
  & > button:last-child {
    width: 40px;
    height: 40px;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 100px;
    right: 20px;
    background-color: #ececec;
    font-size: 23px;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
  }
`;

const NullDiv = styled.div`
  width: 20px;
  height: 20px;
`;
