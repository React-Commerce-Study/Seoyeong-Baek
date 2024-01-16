import styled from 'styled-components';

import FacebookImg from '../../../assets/icon/icon-fb.svg';
import InstaImg from '../../../assets/icon/icon-insta.svg';
import YoutubeImg from '../../../assets/icon/icon-yt.svg';

export default function LinkSnsBtn() {
  const snsLinks = [
    { key: '인스타 이미지', value: InstaImg, link: 'https://www.instagram.com/' },
    { key: '페이스북 이미지', value: FacebookImg, link: 'https://www.facebook.com/' },
    { key: '유튜브 이미지', value: YoutubeImg, link: 'https://www.youtube.com/' },
  ];

  return (
    <LinkBtnContainerStyle>
      {snsLinks.map((snsLink, index) => {
        return (
          <li key={index}>
            <a href={snsLink.link}>
              <img src={snsLink.value} alt={snsLink.key} />
            </a>
          </li>
        );
      })}
    </LinkBtnContainerStyle>
  );
}

const LinkBtnContainerStyle = styled.ul`
  display: flex;
  gap: 14px;

  li {
    width: 32px;
    height: 32px;
  }
`;
