import React from 'react';
import { styled } from 'styled-components';

// ! [props]
// * width, height : 모달의 width, height
// * message : 메세지만 띄우는 모달일 경우 해당 문구 출력
// * both : 취소, 확인 버튼이 있는 모달일 경우 'true', 확인 버튼만 있을 경우 작성하지 않음
// * children : 모달 내 다른 디자인을 적용할 경우 해당 children값 적용 (messgae와 이중 적용 불가)
// * oncancelclick : 취소 버튼에 적용할 클릭 이벤트가 있을 경우
// * onconfirmclick : 확인 버튼에 적용할 클릭 이벤트가 있을 경우

const Modal = ({ width, height, message, both, children, oncancelclick, onconfirmclick }) => {
  return (
    <BackgroundDiv>
      <ModalSection width={width} height={height}>
        <InfoDiv>
          {message && !children && <MessageP>{message}</MessageP>}
          {!message && children && <div>{children}</div>}
        </InfoDiv>
        <ButtonDiv>
          {both && <CancelButton onClick={oncancelclick}>{'취소'}</CancelButton>}
          <ConfirmButton onClick={onconfirmclick}>{'확인'}</ConfirmButton>
        </ButtonDiv>
      </ModalSection>
    </BackgroundDiv>
  );
};

export default Modal;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 6;
`;

const ModalSection = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  width: ${(props) => (props.width ? props.width : '300px')};
  height: ${(props) => (props.height ? props.height : '200px')};
  border-radius: 8px;
`;

const InfoDiv = styled.div`
  height: 90%;
`;

const MessageP = styled.p`
  height: 100%;
  padding: 1.25rem 2.5rem 0.625rem 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  white-space: pre-line;
`;

const ButtonDiv = styled.div`
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & > button {
    padding-bottom: 1.563rem;
    background-color: transparent;
    font-weight: 600;
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ConfirmButton = styled.button`
  color: ${({ theme }) => theme.colors.orange};
`;
