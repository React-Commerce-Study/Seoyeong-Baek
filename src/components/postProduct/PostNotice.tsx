import styled from 'styled-components';

export default function PostNotice() {
  return (
    <SNoticeArticle>
      <h3>*상품 등록 주의사항</h3>
      <div className="notice-contents">
        <p>- 너무 귀여운 사진은 심장이 아파올 수 있습니다.</p>
        <p>
          - 유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다. 이상의 가지에 사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음
          가치를 황금시대의 있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의 속에서 이것은 피가 보배를 황금시대의 싹이 사막이다.
        </p>
        <p>
          - 자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며, 위하여서, 평화스러운 광야에서 그리하였는가? 소담스러운 위하여
          인도하겠다는 어디 무엇을 이상을 같지 따뜻한 청춘 칼이다.
        </p>
        <p>
          - 가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다. 희망의 것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고,
          이것이다.
        </p>
      </div>
    </SNoticeArticle>
  );
}

const SNoticeArticle = styled.article`
  line-height: normal;
  min-width: 15rem;

  h3 {
    color: #eb5757;
    font-weight: var(--font-weight-middle);
    margin-bottom: 0.625rem;
  }

  .notice-contents {
    width: 100%;
    border-radius: 5px;
    background-color: #ffefe8;
    padding: 1.25rem;
    box-sizing: border-box;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);

    p:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;
