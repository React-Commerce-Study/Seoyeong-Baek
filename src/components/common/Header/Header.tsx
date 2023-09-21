import Nav from './Nav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchImg from '../../../assets/icon/search.svg';
import LogoImg from '../../../assets/icon/Logo-hodu.png';

import { mediaQuery, BREAKPOINT_PC, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';

interface HeaderProps {
  page?: string;
}

export default function Header({ page }: HeaderProps) {
  return (
    <SHeaderLayout>
      <SHeader>
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
          <button type="button" className="search-btn-mobile">
            <Link to="/search">
              <img src={SearchImg} alt="검색버튼" />
            </Link>
          </button>
        </form>

        <Nav page={page} />
      </SHeader>
    </SHeaderLayout>
  );
}

const SHeaderLayout = styled.div`
  padding: 22px 0;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 10px -10px;
`;

const SHeader = styled.header`
  padding: 0 1.7rem;
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1.875rem;

  h1 {
    max-width: 7.75rem;
    height: 2.375rem;

    .logo {
      width: 100%;
      min-width: 5.8rem;
    }
  }

  .search-form {
    flex-shrink: 1;
    margin-right: auto;
    /* min-width: 0; */
    max-width: 25rem;
    height: 46px;
    flex-grow: 1;
    box-sizing: border-box;
    position: relative;

    .search-input {
      width: 100%;
      padding: 13px 22px;
      border: 2px solid var(--point-color);
      border-radius: 23px;
    }

    .search-btn {
      max-width: 28px;
      max-height: 28px;
      position: absolute;
      top: 50%;
      right: 22px;
      transform: translate(0, -50%);
      transition: all 0.3s ease-in-out;
    }

    .search-btn-mobile {
      display: none;
    }
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    justify-content: space-between;

    h1 {
      position: absolute;
      margin: 0 auto;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .search-form {
      /* order: -1; */
      flex-grow: 0;
      margin-right: 0;
      /* width: 2.2rem; */
      /* height: 2.2rem; */

      .search-input,
      .search-btn {
        display: none;
      }

      .search-btn-mobile {
        display: block;
        width: 2.3rem;
        height: 2.3rem;
        padding: 0.45rem;
        border-radius: 50px;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
        transition: all 0.25s ease-in-out;

        img {
          width: 100%;
        }

        &:hover {
          background-color: #efffd2;
          box-shadow: rgba(0, 0, 0, 0.22) 0px 3px 8px;
        }
      }
    }
  }

  //
  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 0 1rem;

    h1 {
    }
  }
`;
