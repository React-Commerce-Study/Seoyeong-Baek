import { Link } from 'react-router-dom';
import LogoImg from '../../../../assets/icon/Logo-hodu.png';

export default function Logo() {
  return (
    <h1>
      <Link to="/">
        <img src={LogoImg} alt="로고이미지" />
      </Link>
    </h1>
  );
}
