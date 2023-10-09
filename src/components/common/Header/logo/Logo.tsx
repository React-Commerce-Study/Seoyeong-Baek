import { Link } from 'react-router-dom';
import LogoImg from '../../../../assets/icon/Logo-hodu.png';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <h1 className={className}>
      <Link to="/">
        <img src={LogoImg} alt="로고이미지" />
      </Link>
    </h1>
  );
}
