import LinkSnsBtn from './LinkSnsBtn';
import styled from 'styled-components';
import { mediaQuery, BREAKPOINT_TABLET } from '../../style/mediaQuery/MediaQueryType';

export default function Footer() {
  return (
    <FooterStyle>
      <div className="container">
        <section className="link-section">
          <ul className="link-footer-nav">
            <li>
              <a href="#">호두샵 소개</a>
            </li>
            <li>
              <a href="#">이용약관</a>
            </li>
            <li>
              <a href="#">개인정보처리방침</a>
            </li>
            <li>
              <a href="#">전자금융거래약관</a>
            </li>
            <li>
              <a href="#">청소년보호정책</a>
            </li>
            <li>
              <a href="#">제휴문의</a>
            </li>
          </ul>
          <LinkSnsBtn />
        </section>

        <section className="about-section">
          <strong>(주)HODU SHOP</strong>
          <br />
          제주특별자치도 제주시 동광고 137 제주코딩베이스캠프 <br />
          사업자 번호 : 000-0000-0000 | 통신판매업
          <br />
          대표 : 김호두{' '}
        </section>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  padding: 3.75rem 1.7rem 3.9rem;
  box-sizing: border-box;
  background-color: #f2f2f2;

  .container {
    max-width: 80rem;
    margin: 0 auto;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);

    .link-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 22px;
      gap: 1.5rem;
      flex-wrap: wrap;

      .link-footer-nav {
        display: flex;
        color: #000;

        & > li {
          flex-shrink: 0;
        }
        li:not(:last-child) {
          border-right: 1px solid #000;
          padding-right: 14px;
        }
        li:not(:first-child) {
          padding-left: 14px;
        }
      }
    }

    .about-section {
      border-top: 1px solid var(--middle-gray-color);
      padding-top: 20px;
      color: var(--dark-gray-color);
      line-height: 24px;

      strong {
        font-weight: var(--font-weight-bold);
      }
    }
  }

  ${mediaQuery(BREAKPOINT_TABLET)} {
    padding: 3rem 1rem 3rem;

    .container {
      .link-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.2rem;

        .link-footer-nav {
          flex-wrap: wrap;
          gap: 0.7rem;

          li:not(:first-child) {
            padding-left: 0;
          }
        }
      }
    }
  }
`;
