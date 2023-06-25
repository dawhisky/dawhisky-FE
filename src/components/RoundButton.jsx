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
  width: 320px;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const RoundedButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange};
  cursor: pointer;
`;
