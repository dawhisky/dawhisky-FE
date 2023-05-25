import React from 'react';
import { styled } from 'styled-components';

const sizeHandler = (size) => {
  switch (size) {
    case 'small':
      return 'width: 100px;';
    case 'medium':
      return 'width: 155px;';
    default:
      return 'width: 325px;';
  }
};

const colorHandler = (color) => {
  switch (color) {
    case 'white':
      return 'background-color: #fff;';
    default:
      return 'background-color: #ececec;';
  }
};

const locationHandler = (location) => {
  switch (location) {
    case 'both':
      return '';
    default:
      return 'top: calc(100vh - 12%); left: 50%; transform: translate(-50%, -50%); z-index: 1;';
  }
};

const Button = ({ children, size, color, location, ...rest }) => {
  return (
    <CommonButton size={size} color={color} location={location} {...rest}>
      {children}
    </CommonButton>
  );
};

export default Button;

const CommonButton = styled.button`
  ${(props) => sizeHandler(props.size)};
  ${(props) => colorHandler(props.color)};
  ${(props) => locationHandler(props.location)};
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
`;
