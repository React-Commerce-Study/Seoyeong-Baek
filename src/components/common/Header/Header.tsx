import Nav from './Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchImg from '../../../assets/icon/search.svg';
import LogoImg from '../../../assets/icon/Logo-hodu.png';

interface HeaderProps {
  page?: string;
}

export default function Header({ page }: HeaderProps) {
  return (
    <SHeaderLayout>
      <SHeader>
        <div className="logo-input-wrapper">
          <h1>
            <Link to="/">
              <img src={LogoImg} className="logo" alt="로고 이미지" />
            </Link>
          </h1>

          <form className="search-form">
            <input type="search" placeholder="상품을 검색해보세요!" className="search-input" />
            <button type="submit" className="search-btn">
              <img src={SearchImg} alt="검색버튼" />
            </button>
          </form>
        </div>

        <Nav page={page} />
      </SHeader>
    </SHeaderLayout>
  );
}

const SHeaderLayout = styled.div`
  padding: 22px 0;
  box-sizing: border-box;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
`;

const SHeader = styled.header`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6rem;

  .logo-input-wrapper {
    display: flex;
    gap: 1.875rem;
  }

  h1 {
    flex-shrink: 0;
    width: 7.75rem;
    height: 2.375rem;

    .logo {
      width: 100%;
    }
  }

  .search-form {
    width: 25rem;
    box-sizing: border-box;
    position: relative;

    .search-input {
      width: 100%;
      padding: 13px 22px;
      border: 2px solid var(--point-color);
      border-radius: 50px;
      color: #767676;
    }

    .search-btn {
      width: 28px;
      height: 28px;
      position: absolute;
      top: 50%;
      right: 22px;
      transform: translate(0, -50%);
      padding: 0;
    }
  }
`;
