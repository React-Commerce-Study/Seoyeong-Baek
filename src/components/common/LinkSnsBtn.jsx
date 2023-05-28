import React from 'react';
import InstaImg from '../../assets/icon/icon-insta.svg';
import FacebookImg from '../../assets/icon/icon-fb.svg';
import YoutubeImg from '../../assets/icon/icon-yt.svg';

export default function LinkSnsBtn() {
  return (
    <ul className="link-sns-nav">
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
    </ul>
  );
}
