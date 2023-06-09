import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { styled } from 'styled-components';
import { BsTrash3 } from 'react-icons/bs';
import { Layout, DetailHeader, Image, TabMenu, Button } from '../../components';
import { getUserComment, setUserComment, setEditUserComment, setDeleteUserComment } from '../../api/user';

const MyComment = () => {
  const tabGroup = [{ name: '내 코멘트', type: 'myComment' }];
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [editmode, setEditmode] = useState(false);
  // TODO useState 초기값 기존에 작성한 댓글 값으로 넣어줘야 함
  const [editComment, setEditComment] = useState('');
  const [myCommentData, setMyCommnetData] = useState([]);
  const focusComment = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.slice(11);

  // * [위스키 코멘트] 조회
  useQuery('getUserComment', () => getUserComment(id), {
    onSuccess: (response) => {
      setMyCommnetData(response);
      setEditComment(response.content);
    },
  });

  // * 수정모드일 때 textarea에 포커싱
  useEffect(() => {
    if (editmode) {
      focusComment.current.focus();
    }
  }, [editmode]);

  // * 수정모드로 변경
  const onEditModeChangeHandler = (e) => {
    e.preventDefault();
    setEditmode(!editmode);
  };

  // * 댓글 onChange Handler
  const onCommentChangeHandler = (e) => {
    e.preventDefault();
    setEditComment(e.target.value);
  };

  // * [댓글 등록] useMutation
  const setUserCommentMutation = useMutation(setUserComment, {
    onSuccess: (response) => {
      alert(response);
    },
  });

  // * [댓글 등록] 버튼 click
  const onSubmitClickHandler = (e) => {
    e.preventDefault();
    const comment = { id, content: editComment };
    setUserCommentMutation.mutate(comment);
  };

  // * [댓글 수정] useMutation
  const setEditUserCommentMutation = useMutation(setEditUserComment, {
    onSuccess: () => {
      alert('댓글이 수정되었습니다.');
      setEditmode(!editmode);
    },
  });

  // * [댓글 수정] 버튼 click
  const onEditClickHandler = (e) => {
    e.preventDefault();
    const comment = { id, content: editComment };
    setEditUserCommentMutation.mutate(comment);
  };

  // * [댓글 삭제] useMutation
  const setDeleteUserCommentMutation = useMutation(setDeleteUserComment, {
    onSuccess: () => {
      alert('댓글이 삭제되었습니다.');
      navigate(`/UserManagePage`);
    },
  });

  // * 댓글 삭제 버튼 click
  const onDeleteClickHandler = (e) => {
    e.preventDefault();
    const confirm = window.confirm('댓글을 삭제하시겠습니까?');
    if (confirm) {
      setDeleteUserCommentMutation.mutate(id);
    }
  };

  return (
    myCommentData && (
      <Layout>
        <DetailHeader
          korname={myCommentData.whisky_kor}
          engname={myCommentData.whisky_eng}
          like={myCommentData.liked}
        />
        <ImageDiv>
          <Image
            width={'360px'}
            height={'360px'}
            src={myCommentData.whisky_photo}
            alt={`${myCommentData.whisky_kor} 사진`}
          />
        </ImageDiv>
        <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} />
        <form>
          {/* TODO editmode === 'false'이고 불러온 데이터가 없을 경우 '수정' 버튼 '등록'으로 수정, 가운데에 NoneData.jsx 출력 */}
          {tabChosen === 'myComment' && !editmode ? (
            // * 코멘트 조회
            <CommentP>{editComment}</CommentP>
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
                <Button size={'medium'} onClick={onEditModeChangeHandler}>
                  수정
                </Button>
                <button type="button" onClick={onDeleteClickHandler}>
                  <BsTrash3 />
                </button>
              </>
            ) : (
              <>
                <Button onClick={setMyCommnetData.content === '' ? onSubmitClickHandler : onEditClickHandler}>
                  등록
                </Button>
                <NullDiv />
              </>
            )}
          </ButtonWrapDiv>
        </form>
      </Layout>
    )
  );
};

export default MyComment;

const ImageDiv = styled.div`
  width: 360px;
  padding-top: 75px;
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
