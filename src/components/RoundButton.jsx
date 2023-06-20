import React from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Image from './Image';
import { edit, defaultImage } from '../assets';

const RoundButton = ({ rest }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onWriteButtonClickHandler = () => navigate(`/UserComment/${id}`);

  return (
    <NullDiv>
      <RoundedButton>
        <Image
          width={'1.563rem'}
          height={'1.563rem'}
          src={edit || defaultImage}
          alt={'작성 버튼'}
          onClick={onWriteButtonClickHandler}
          {...rest}
        />
      </RoundedButton>
    </NullDiv>
  );
};

export default RoundButton;

const NullDiv = styled.div`
  width: 20rem;
  height: 1.25rem;
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const RoundedButton = styled.button`
  width: 3.125rem;
  height: 3.125rem;
  position: fixed;
  bottom: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
`;
