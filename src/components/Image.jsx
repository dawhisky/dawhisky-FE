import React from 'react';
import { styled } from 'styled-components';

// ! [props]
// * width, height, borderradius : 이미지의 width, height, borderradius값 (px, % 모두 가능)
// * src : 이미지 파일 또는 url의 경로
// * alt : 이미지에 대한 설명으로, 이미지 아이템의 이름값을 넣어줘도 됨 (해당 가게 명이나 해당 위스키 이름)

const Image = ({ width, height, borderradius, src, alt }) => {
  return <SetImages width={width} height={height} borderradius={borderradius} src={src} alt={alt} />;
};

const SetImages = styled.img`
  ${({ width, height }) => `width: ${width}; height: ${height};`}
  ${({ borderradius }) => `border-radius: ${borderradius};`}
  object-fit: cover;
`;

export default Image;
