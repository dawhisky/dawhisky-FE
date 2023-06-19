import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { Button, Modal, DetailList } from '../../components';
import { getStoreWhiskyList, setStoreWhisky } from '../../api/store';
import { getKeywordList } from '../../api/whisky';
import { NoneData } from '../statusPage';

const StoreBottleManage = ({ id }) => {
  const [whiskyList, setWhiskyList] = useState();
  const [modalToggle, setModalToggle] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [recommendList, setRecommedList] = useState(null);

  // * [위스키 리스트 조회] 업장에 등록된 주류 내역
  useQuery('getStoreWhiskyList', () => getStoreWhiskyList(id), {
    onSuccess: (response) => {
      if (response && response.length !== 0) {
        setWhiskyList(response);
      }
    },
  });

  // * [모달] 모달창 ON, OFF
  const modalToggleHandler = () => {
    setModalToggle((prev) => {
      if (!prev) {
        setUserInput('');
        setKeyword('');
      }
      return !prev;
    });
  };

  // * [추천검색어] 커스텀 디바운스 함수
  const debounce = (callback, delay) => {
    let timerId = null;
    // * 3. 리턴문에 의해 아래의 함수를 반환
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  // * [추천검색어] 2. 디바운스 함수 호출
  const setKeywordData = useCallback(
    debounce((inputText) => {
      setKeyword(inputText);
    }, 1000),
    [],
  );

  // * [추천검색어] 1. input 값이 바뀔 때 userInput과 디바운스 함수에 해당 값 전달
  const onUserInputChangeHandler = (e) => {
    setUserInput(e.target.value);
    setKeywordData(e.target.value);
  };

  // * [추천검색어] 조회 useMutation
  const searchKeywordMutation = useMutation(getKeywordList, {
    onSuccess: (response) => setRecommedList(response),
  });

  // * [추천검색어] 조회 useEffect : keyword값이 변동될 때마다 디바운싱 거쳐 추천검색어 조회
  useEffect(() => {
    const searchKeywordHandler = async () => {
      if (!/^[ㄱ-ㅎ가-힣0-9]*$|^[a-zA-Z0-9]*$/g.test(userInput)) {
        toast.error('검색어는 한글과 영문을 혼합하거나 특수문자, 공백을 포함할 수 없습니다.');
      } else if (keyword) {
        searchKeywordMutation.mutate(keyword);
      }
    };
    searchKeywordHandler();
  }, [keyword]);

  // * [위스키 등록] 스토어 보유 위스키 useMutation
  const setStoreWhiskyMutation = useMutation(setStoreWhisky, {
    onSuccess: () => {
      toast.success('보유 중인 위스키 목록이 추가되었습니다.');
      setUserInput('');
      setKeywordData('');
    },
    onError: (error) => {
      if (error.response.status === 412) {
        toast.error('이미 보유 중인 위스키입니다.');
      }
    },
  });

  // * [위스키 등록] 스토어 보유 위스키 등록
  const setStoreWhiskyHandler = (itemId) => {
    const whiskyId = { whisky_id: itemId };
    setStoreWhiskyMutation.mutate(whiskyId);
  };

  return (
    <>
      <DetailList list={whiskyList} />
      {/* // TODO 버튼 상대위치 걸기 */}
      <ButtonWrapDiv>
        <Button onClick={modalToggleHandler}>{'주류 등록'}</Button>
      </ButtonWrapDiv>

      {modalToggle && (
        <Modal height={'400px'} both={'true'} oncancelclick={() => setModalToggle(false)}>
          <ModalInnerDiv>
            <WhiskyInput
              type={'text'}
              value={userInput}
              onChange={onUserInputChangeHandler}
              placeholder={'위스키를 검색해보세요!'}
            />
            <RecommendUl>
              {recommendList && recommendList.length === 0 && <NoneData>{'일치하는 검색어가 없어요'}</NoneData>}
              {recommendList &&
                recommendList.length !== 0 &&
                recommendList.map((item) => (
                  <RecommendLi key={item.whisky_id}>
                    <div>
                      <SearchIcon />
                    </div>
                    <RecommendP>{item.whisky_eng ? item.whisky_eng : item.whisky_kor}</RecommendP>
                    <InsertButtonWrap>
                      <button type={'button'} onClick={() => setStoreWhiskyHandler(item.whisky_id)}>
                        {'등록'}
                      </button>
                    </InsertButtonWrap>
                  </RecommendLi>
                ))}
            </RecommendUl>
          </ModalInnerDiv>
        </Modal>
      )}
    </>
  );
};

export default StoreBottleManage;

const ButtonWrapDiv = styled.div`
  border: 1px solid red;
  height: 4.375rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    position: absolute;
    bottom: 20px;
    z-index: 1;
    font-weight: 600;
  }
`;

const ModalInnerDiv = styled.div`
  height: 330px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WhiskyInput = styled.input`
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: 250px;
  height: 35px;
  margin-left: 25px;
  padding: 10px;
  border-radius: 7px;
  &:focus {
    outline: none;
  }
`;

const RecommendUl = styled.ul`
  height: 100%;
  padding: 3px 10px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.125rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray};
    background-clip: padding-box;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const RecommendLi = styled.li`
  width: 255px;
  margin: 0 10px 15px 10px;
  display: flex;
  font-size: 15px;
`;

const SearchIcon = styled(GrSearch)`
  padding: 0;
  font-size: 16px;
`;

const RecommendP = styled.p`
  flex-grow: 1;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InsertButtonWrap = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 30px;
    font-size: 13px;
    background-color: transparent;
    cursor: pointer;
  }
  button:hover {
    color: ${({ theme }) => theme.colors.orange};
  }
`;
