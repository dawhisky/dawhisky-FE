import React from 'react';
import { styled } from 'styled-components';

const SetInfoModal = ({ height, width, children }) => {
  return (
    <ModalWrapper>
      <ModalWindow height={height} width={width}>
        {children}
      </ModalWindow>
    </ModalWrapper>
  );
};

export default SetInfoModal;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 360px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const ModalWindow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 25px 0 20px 0;
  border-radius: 15px;
  background-color: white;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
`;
