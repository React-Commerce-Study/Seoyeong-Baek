import React from 'react';
import LinkSnsBtn from '../common/LinkSnsBtn';

export default function Footer() {
  return (
    <footer className="footer">
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

        <section className="about-hp">
          <p>(주)HODU SHOP</p>
          <address>
            <p>제주특별자치도 제주시 동광고 137</p>
            <p>제주코딩베이스캠프 사업자 번호 : 000-0000-0000 | 통신판매업</p>
          </address>
          <p>대표 : 김호두 </p>
        </section>
      </div>
    </footer>
  );
}
