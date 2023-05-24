import React from 'react';
import { styled } from 'styled-components';

const sizeHandler = (size) => {
  switch (size) {
    case 'small':
      return 'width: 100px; background-color: #fff';
    default:
      return 'width: 325px; background-color: #ececec';
  }
};

const Button = ({ children, size, ...rest }) => {
  return (
    <CommonButton size={size} {...rest}>
      {children}
    </CommonButton>
  );
};

export default Button;

const CommonButton = styled.button`
  ${(props) => sizeHandler(props.size)};
  height: 40px;
  border-radius: 20px;
  position: absolute;
  top: calc(100vh - 12%);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
