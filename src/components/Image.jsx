import React from 'react';
import { styled } from 'styled-components';

// ! [props]
// * width, height, borderradius : 이미지의 width, height, borderradius값 (px, % 모두 가능)
// * src : 이미지 파일 또는 url의 경로
// * alt : 이미지에 대한 설명으로, 이미지 아이템의 이름값을 넣어줘도 됨 (해당 가게 명이나 해당 위스키 이름)

const Image = ({ width, height, borderradius, src, alt }) => {
  const defaultSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBHOW80iQrY2D3N296kfy1IMWOvgLF-zs6DFZLSE7ztNuXXwdHiJJdvhRu24K7ImhxH9Q&usqp=CAU';

  return (
    <SetImages
      width={width}
      height={height}
      borderradius={borderradius}
      src={src || defaultSrc}
      alt={alt}
      loading="lazy"
    />
  );
};

const SetImages = styled.img`
  ${({ width, height }) => `width: ${width}; height: ${height};`}
  ${({ borderradius }) => `border-radius: ${borderradius};`}
  object-fit: contain;
`;

export default Image;
