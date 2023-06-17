import React from 'react';
import { styled } from 'styled-components';
import Image from './Image';
import { edit, defaultImage } from '../assets';

const RoundButton = ({ rest }) => {
  return (
    <RoundedButton>
      <Image width={'1.563rem'} height={'1.563rem'} src={edit || defaultImage} alt={'작성 버튼'} {...rest} />
    </RoundedButton>
  );
};

export default RoundButton;

const RoundedButton = styled.button`
  width: 3.125rem;
  height: 3.125rem;
  position: fixed;
  bottom: 5rem;
  right: 6.875rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
`;
