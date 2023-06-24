import React, { useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { BsChevronLeft, BsThreeDots, BsCheck2 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Image, Button, Modal } from '../../components';
import { NoneData } from '../statusPage';
import { getUserComment, setUserComment, setEditUserComment, setDeleteUserComment } from '../../api/user';

const UserComment = () => {
  const [myCommentData, setMyCommnetData] = useState([]);
  const [editmode, setEditmode] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [bottomToggle, setBottomToggle] = useState(false);
  const [managementChosen, setManagementChosen] = useState(null);
  const [modalToggle, setModalToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(() => /Mobi/i.test(window.navigator.userAgent));
  const managementList = ['수정하기', '삭제하기'];

  const navigate = useNavigate();
  const focusComment = useRef();
  const { id } = useParams();

  // * 이전 버튼 클릭
  const onBeforeClickHandler = () => navigate(-1);

  // * 등록/수정모드일 때 textarea에 포커싱
  useEffect(() => {
    if (editmode) focusComment.current.focus();
  }, [editmode]);

  // * [코멘트 조회] 위스키 상세 조회 및 내가 작성한 댓글 조회
  const { refetch } = useQuery('getUserComment', () => getUserComment(id), {
    onSuccess: (response) => {
      setMyCommnetData(response);
      if (!response.content) {
        setEditmode(true);
      } else {
        setEditmode(false);
      }
    },
  });

  // * [코멘트 등록] onChange Handler
  const onCommentChangeHandler = (e) => setEditComment(e.target.value);

  // * [코멘트 등록] useMutation
  const setUserCommentMutation = useMutation(setUserComment, {
    onSuccess: () => {
      toast.success('코멘트 등록이 완료되었습니다.');
      setEditmode(false);
      navigate(`/WhiskyDetail/${id}`, { state: { idx: 2 } });
    },
  });

  // * [코멘트 수정] useMutation
  const setEditUserCommentMutation = useMutation(setEditUserComment, {
    onSuccess: () => {
      toast.success('코멘트가 수정되었습니다.');
      setEditmode(false);
      navigate(`/WhiskyDetail/${id}`, { state: { idx: 2 } });
    },
  });

  // * [코멘트 등록/수정] 버튼 click
  const onSubmitClickHandler = (flag) => {
    if (/^\s/.test(editComment) || editComment.length === 0) {
      toast.error('코멘트가 입력되지 않았습니다.');
      return;
    }
    if (editComment.length > 200) {
      toast.error('200자 이상 코멘트를 작성할 수 없습니다.');
      return;
    }
    const comment = { id, content: editComment };
    if (flag === 'submit') {
      setUserCommentMutation.mutate(comment);
    } else {
      setEditUserCommentMutation.mutate(comment);
    }
  };

  // * [코멘트 삭제] 삭제 confirm 모달 T/F
  const modalToggleHandler = () => setModalToggle(!modalToggle);

  // * [코멘트 삭제] useMutation
  const setDeleteUserCommentMutation = useMutation(setDeleteUserComment, {
    onSuccess: () => {
      toast.success('코멘트가 삭제되었습니다.');
      modalToggleHandler();
      setEditComment('');
      setEditmode(false);
      setBottomToggle(!bottomToggle);
      refetch();
    },
  });

  // * [코멘트 삭제] 버튼 click
  const onDeleteClickHandler = () => setDeleteUserCommentMutation.mutate(id);

  // * [코멘트 관리] 토글 버튼 클릭
  const onToggleClickHandler = () => {
    setBottomToggle(!bottomToggle);
    setManagementChosen(null);
  };

  // * [코멘트 관리] 수정하기, 삭제하기 버튼 클릭
  const onManagementClickHandler = (idx) => {
    setManagementChosen(managementList[idx]);
    if (idx === 0) {
      setBottomToggle(!bottomToggle);
      setManagementChosen(null);
      setEditmode(true);
    } else {
      modalToggleHandler();
    }
  };

  return (
    <Layout>
      <Header>
        <LeftIcon onClick={onBeforeClickHandler} />
        <NameDiv>
          <p>{myCommentData.whisky_kor}</p>
          <span>{myCommentData.whisky_eng}</span>
        </NameDiv>
        {!editmode && (
          <CommentSpan type={'edit'}>
            <BsThreeDots onClick={onToggleClickHandler} />
          </CommentSpan>
        )}
        {editmode && (
          <CommentSpan
            type={'submit'}
            onClick={
              myCommentData.content === '' ? () => onSubmitClickHandler('submit') : () => onSubmitClickHandler('edit')
            }
          >
            {'등록'}
          </CommentSpan>
        )}
      </Header>
      <ImageDiv>
        <Image
          width={'22.5rem'}
          height={'22.5rem'}
          src={myCommentData.whisky_photo}
          alt={`${myCommentData.whisky_kor} 사진`}
        />
      </ImageDiv>
      {!editmode && myCommentData.content !== '' && <CommentP>{myCommentData.content}</CommentP>}
      {!editmode && myCommentData.content === '' && <NoneData>{'아직 등록한 댓글이 없습니다.'}</NoneData>}
      {editmode && (
        <CommentTextarea
          type={'text'}
          ref={focusComment}
          value={editComment || myCommentData.content}
          onChange={onCommentChangeHandler}
          placeholder={'코멘트를 입력해주세요!'}
          ismobile={isMobile ? 'true' : 'false'}
        />
      )}
      {bottomToggle && (
        <>
          <BackgroundDiv onClick={onToggleClickHandler} />
          <ListUl>
            <span>{'코멘트 관리'}</span>
            {managementList.map((item, idx) => {
              return (
                <ListLi
                  key={item}
                  active={item === managementChosen ? 'true' : 'false'}
                  onClick={() => onManagementClickHandler(idx, item)}
                >
                  <p>{item}</p>
                  <BsCheck2 />
                </ListLi>
              );
            })}
            <ButtonWrapDiv>
              <Button location={'both'} onClick={onToggleClickHandler}>
                {'닫기'}
              </Button>
            </ButtonWrapDiv>
          </ListUl>
        </>
      )}
      {modalToggle && (
        <Modal
          message={'코멘트를 삭제하시겠습니까?'}
          both={'true'}
          oncancelclick={modalToggleHandler}
          onconfirmclick={onDeleteClickHandler}
        />
      )}
    </Layout>
  );
};

export default UserComment;

const Header = styled.header`
  color: black;
  background: linear-gradient(rgba(200, 200, 200, 0.5), rgba(200, 200, 200, 0.3), transparent);
  width: 22.5rem;
  height: 4.375rem;
  padding: 0.625rem 1.25rem;
  margin-left: -1.063rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const NameDiv = styled.div`
  width: 14.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  & p {
    width: 100%;
    font-size: 1.125rem;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  & span {
    width: 100%;
    display: block;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

const LeftIcon = styled(BsChevronLeft)`
  font-size: 1.25rem;
  cursor: pointer;
`;

const CommentP = styled.p`
  padding: 1.875rem 1.25rem;
  height: 13.75rem;
  overflow-y: auto;
  text-align: ${(props) => (props.data === 'none' ? 'center' : 'none')};
  &::-webkit-scrollbar {
    width: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const CommentSpan = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme, type }) => (type === 'submit' ? theme.colors.orange : '')};
  font-size: ${(props) => (props.type === 'submit' ? '1.05rem' : '')};
  font-weight: ${(props) => (props.type === 'submit' ? '600' : '')};
  cursor: pointer;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ListUl = styled.ul`
  width: 22.5rem;
  position: fixed;
  bottom: 3.75rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0.75rem 0.75rem 0 0;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  overflow-y: auto;
  animation: fadeInUp 0.7s;
  & span {
    height: 3.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate(-50%, 100%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
`;

const ListLi = styled.li`
  margin: 1rem 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  :first-child {
    font-weight: ${({ active }) => (active === 'true' ? '700' : '400')};
    width: 18.75rem;
  }
  :last-child {
    font-size: 1.25rem;
    color: ${({ theme, active }) => (active === 'true' ? theme.colors.orange : 'transparent')};
  }
`;

const ButtonWrapDiv = styled.div`
  height: 4.375rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ImageDiv = styled.div`
  width: 22.5rem;
  padding-top: 4.688rem;
  margin-left: -1.063rem;
  position: relative;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: ${(props) => (props.ismobile === 'true' ? '6.8rem' : '40vh')};
  margin: 1.25rem 0;
  padding: 1.25rem;
  &:focus {
    outline-color: ${({ theme }) => theme.colors.orange};
    border-radius: 0.625rem;
  }
  &::-webkit-scrollbar {
    width: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;
