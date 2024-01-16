import { useState } from 'react';

import styled from 'styled-components';

import {
  mediaQuery,
  BREAKPOINT_PC,
  BREAKPOINT_TABLET,
} from '../../style/mediaQuery/MediaQueryType';

import Logo from './logo/Logo';
import Nav from './Nav';
import Search from './Search';

interface HeaderProps {
  page?: 'cart';
}

export default function Header({ page }: HeaderProps) {
  const [isMobileSearch, setIsMobileSearch] = useState(false);

  return (
    <SHeaderLayout>
      <SHeader>
        <Logo className={isMobileSearch ? 'hide-logo' : ''} />
        <Search
          isMobileSearch={isMobileSearch}
          setIsMobileSearch={setIsMobileSearch}
        />
        <Nav page={page} />
      </SHeader>
    </SHeaderLayout>
  );
}

const SHeaderLayout = styled.div`
  padding: 1.375rem 0;
  box-sizing: border-box;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.1);
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

    img {
      width: 100%;
      min-width: 5.8rem;
    }
  }

  .search-btn-mobile {
    display: none;
  }

  ${mediaQuery(BREAKPOINT_PC)} {
    justify-content: space-between;

    h1 {
      position: absolute;
      margin: 0 auto;
      left: 50%;
      transform: translate(-50%, 0);
      transition: all 0.25s ease-out;

      &.hide-logo {
        display: none;
      }
    }

    .search-form {
      flex-grow: 0;
      margin-right: 0;
      width: 2.3rem;
      height: 2.3rem;

      &.search-form-mobile-active {
        flex-grow: 1;
        max-width: 100%;

        .search-input,
        .search-btn {
          display: block;
          height: 100%;
        }
        .search-btn {
          right: 1.3rem;
        }
      }
      .search-input {
        padding-left: 2.7rem;
        padding-right: 2.2rem;
      }

      .search-input,
      .search-btn {
        display: none;
      }
      .search-btn {
        width: 1.35rem;
        height: 1.35rem;
        right: 50%;
        transform: translate(50%, -50%);
      }

      .search-btn-mobile {
        display: block;
      }
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 0 0.5rem 0 1rem;
  }
`;
