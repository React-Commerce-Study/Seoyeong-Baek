import React from 'react';
import InstaImg from '../../../assets/icon/icon-insta.svg';
import FacebookImg from '../../../assets/icon/icon-fb.svg';
import YoutubeImg from '../../../assets/icon/icon-yt.svg';
import styled from 'styled-components';

export default function LinkSnsBtn() {
  return (
    <LinkBtnContainerStyle>
      <li>
        <a href="#">
          <img src={InstaImg} alt="인스타 이미지" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={FacebookImg} alt="페이스북 이미지" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={YoutubeImg} alt="유튜브 이미지" />
        </a>
      </li>
    </LinkBtnContainerStyle>
  );
}

const LinkBtnContainerStyle = styled.ul`
  box-shadow: inset 0 0 10px red;
  display: flex;
  gap: 14px;
`;
