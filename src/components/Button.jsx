import React from 'react';
import { styled } from 'styled-components';

// ! [props]
// * children : 버튼에 명시할 버튼 명
// * size : width를 조정하기 위한 키워드
// * color : background-color를 조정하기 위한 키워드
// * location : 사용하는 버튼이 2개여서 양쪽에 각각 보여줘야 할때는 props로 location={'both'}, 양쪽에 각각 나열시킴
// *            사용하는 버튼이 1개인 경우 location을 따로 내려주지 않아도 가운데 정렬되도록 함

const Button = ({ children, size, color, location, ...rest }) => {
  return (
    <CommonButton size={size} location={location} {...rest}>
      {children}
    </CommonButton>
  );
};

const sizeHandler = (size) => {
  switch (size) {
    case 'small':
      return 'width: 100px;';
    case 'medium':
      return 'width: 155px;';
    default:
      return 'width: 320px;';
  }
};

const locationHandler = (location) => {
  switch (location) {
    case 'both':
      return '';
    default:
      return 'bottom: 80px; left: 50%; transform: translate(-50%, -50%); z-index: 1;';
  }
};

export default Button;

const CommonButton = styled.button`
  ${(props) => sizeHandler(props.size)};
  ${(props) => locationHandler(props.location)};
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme, color }) => (color === 'white' ? theme.colors.white : theme.colors.orange)};
  color: ${({ theme, color }) => (color === 'white' ? theme.colors.darkGray : theme.colors.white)};
  cursor: pointer;
`;
