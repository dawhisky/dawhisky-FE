import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import { BsTrash3 } from 'react-icons/bs';
import { Layout, DetailHeader, Image, TabMenu, Button, Modal } from '../../components';
import { getUserComment, setUserComment, setEditUserComment, setDeleteUserComment } from '../../api/user';
import { NoneData } from '../statusPage';

const MyComment = () => {
  const tabGroup = [{ name: '내 코멘트', type: 'myComment' }];
  const [tabChosen, setTabChosen] = useState(tabGroup[0].type);
  const [myCommentData, setMyCommnetData] = useState([]);
  const [editmode, setEditmode] = useState(false);
  const [editComment, setEditComment] = useState('');
  const [modalToggle, setModalToggle] = useState(false);
  const focusComment = useRef();
  const { id } = useParams();

  // * [위스키 코멘트] 위스키 상세 조회 및 내가 작성한 댓글 조회
  const { refetch } = useQuery('getUserComment', () => getUserComment(id), {
    onSuccess: (response) => setMyCommnetData(response),
  });

  // * 수정모드일 때 textarea에 포커싱
  useEffect(() => {
    if (editmode) focusComment.current.focus();
  }, [editmode]);

  // * 등록 <-> 수정모드 변경
  const onEditModeChangeHandler = (e) => {
    e.preventDefault();
    setEditmode(!editmode);
  };

  // * 댓글 onChange Handler
  const onCommentChangeHandler = (e) => setEditComment(e.target.value);

  // * [댓글 등록] useMutation
  const setUserCommentMutation = useMutation(setUserComment, {
    onSuccess: () => {
      toast.success('코멘트 등록이 완료되었습니다.');
      setEditmode(!editmode);
      refetch();
    },
  });

  // * [댓글 수정] useMutation
  const setEditUserCommentMutation = useMutation(setEditUserComment, {
    onSuccess: () => {
      toast.success('댓글이 수정되었습니다.');
      setEditmode(!editmode);
      refetch();
    },
  });

  // * [댓글 등록] 버튼 click
  const onSubmitClickHandler = (flag, e) => {
    e.preventDefault();
    if (/^\s/.test(editComment) || editComment.length === 0) {
      toast.error('댓글이 입력되지 않았습니다.');
      return;
    }
    const comment = { id, content: editComment };
    if (flag === 'submit') {
      setUserCommentMutation.mutate(comment);
    } else {
      setEditUserCommentMutation.mutate(comment);
    }
  };

  // * [댓글 삭제] useMutation
  const setDeleteUserCommentMutation = useMutation(setDeleteUserComment, {
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.');
      setModalToggle(!modalToggle);
      refetch();
    },
  });

  // * [댓글 삭제] 삭제 confirm 모달 T/F
  const modalToggleHandler = () => setModalToggle(!modalToggle);

  // * [댓글 삭제] 버튼 click
  const onDeleteClickHandler = () => setDeleteUserCommentMutation.mutate(id);

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
            width={'22.5rem'}
            height={'22.5rem'}
            src={myCommentData.whisky_photo}
            alt={`${myCommentData.whisky_kor} 사진`}
          />
        </ImageDiv>
        <TabMenu tabgroup={tabGroup} tabchosen={tabChosen} />
        <form>
          {!editmode && myCommentData.content !== '' && <CommentP>{myCommentData.content}</CommentP>}
          {!editmode && myCommentData.content === '' && <NoneData>{'아직 등록한 댓글이 없습니다.'}</NoneData>}
          {editmode && (
            <CommentTextarea
              type={'text'}
              rows={6}
              ref={focusComment}
              value={editComment || myCommentData.content}
              onChange={onCommentChangeHandler}
            />
          )}
          <ButtonWrapDiv>
            {!editmode && !myCommentData.content && (
              <>
                <Button onClick={onEditModeChangeHandler}>{'코멘트 작성하기'}</Button>
                <NullDiv />
              </>
            )}
            {!editmode && myCommentData.content !== '' && (
              <>
                <Button size={'medium'} onClick={onEditModeChangeHandler}>
                  {'코멘트 수정하기'}
                </Button>
                <button type={'button'} onClick={modalToggleHandler}>
                  <BsTrash3 />
                </button>
              </>
            )}
            {editmode && (
              <>
                <Button
                  onClick={
                    myCommentData.content === ''
                      ? (e) => onSubmitClickHandler('submit', e)
                      : (e) => onSubmitClickHandler('edit', e)
                  }
                >
                  {'코멘트 등록하기'}
                </Button>
                <NullDiv />
              </>
            )}
          </ButtonWrapDiv>
        </form>
        {modalToggle && (
          <Modal
            message={'코멘트를 삭제하시겠습니까?'}
            both={'true'}
            oncancelclick={modalToggleHandler}
            onconfirmclick={onDeleteClickHandler}
          />
        )}
      </Layout>
    )
  );
};

export default MyComment;

const ImageDiv = styled.div`
  width: 22.5rem;
  padding-top: 4.688rem;
  margin-left: -1.063rem;
  position: relative;
`;

const CommentP = styled.p`
  padding: 1.875rem 1.25rem;
  text-align: ${(props) => (props.data === 'none' ? 'center' : 'none')};
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  margin: 1.25rem 0;
  padding: 1.875rem 1.25rem;
  &:focus {
    outline-color: ${({ theme }) => theme.colors.orange};
    border-radius: 0.625rem;
  }
`;

const ButtonWrapDiv = styled.div`
  & > button:nth-child(1) {
    position: absolute;
    z-index: 1;
    font-weight: 600;
  }
  & > button:last-child {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.438rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 6.25rem;
    right: 1.25rem;
    background-color: #ececec;
    font-size: 1.438rem;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
  }
`;

const NullDiv = styled.div`
  width: 1.25rem;
  height: 1.25rem;
`;
