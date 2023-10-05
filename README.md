# 오픈마켓 서비스, Hodu Store

`개발 기간 : 2023.05, 2023.08 ~ 2023.09`

<br/>

## 🔗 배포 링크 및 테스트 계정

🚀 **[호두 스토어 바로가기](https://hodu-store.netlify.app)**

```
[구매자 계정]
ID: buyer1
PW: hodu0910
```

```
[판매자 계정]
ID: seller1
PW: hodu0910
```

<br/>

## 📌 서비스 소개

> ### **멋쟁이 사자처럼에서 제공된 API를 기반으로, 리액트와 타입스크립트를 사용한 SPA 오픈마켓 서비스 입니다.**
>
> <br/>

### 1. 오픈마켓 서비스 특징

- `판매자 구매자 구분` :
  이 서비스에서는 판매자와 구매자를 구별합니다. 판매자는 상품을 등록하고 관리할 수 있으며, 구매자는 상품을 검색하고 구매할 수 있습니다.

- `상품 등록 및 수정` : 판매자는 로그인하여 자신의 계정으로 상품 정보를 등록하고 필요한 경우 수정할 수 있습니다.

- `장바구니 기능` : 구매자는 원하는 상품을 찾아 상세 정보를 확인한 후 장바구니에 담을 수 있습니다. 이후 장바구니를 통해 상품을 결제할 수 있습니다.

- `결제 처리` : 구매자는 장바구니를 통해 상품을 선택하고 결제할 수 있습니다.

<br/>

### 2. 프로젝트 설명

- 구매자 서비스의 경우 회원가입, 로그인, 메인, 장바구니, 결제 페이지로 구성되어 있습니다.
- 판매자 서비스의 경우 장바구니와 결제 페이지를 제외하고 동일하며 상품등록과 판매자 센터 페이지로 구성되어 있습니다.
- 상품 관리 : REST API를 활용하여 상품에 대한 CRUD(Create, Read, Update, Delete) 기능을 구현하였습니다.
- Redux Toolkit과 localStorage를 사용하여 사용자 인증을 위한 회원가입 및 로그인 기능을 구현하였으며, 로그인 시 로그인 상태를 유지할 수 있도록 했습니다.
- PC와 태블릿, 모바일 환경을 모두 고려한 반응형 디자인을 적용하여 사용자의 편의성을 향상시킵니다.
- open Api 활용
  - 배송 정보 중 주소 검색을 위해 다음 카카오 우편 주소 검색을 사용하였습니다.
  - 메인 페이지의 캐러셀을 구현하기 위해 unsplash api(랜덤한 이미지 불러오기)를 사용하였습니다.

<br/>

## 🔨 기술 및 개발환경

### Environment

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">

### Design

 <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

### Development

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/KakaoAPI-FFCD00?style=for-the-badge&logo=kakao&logoColor=white"> <img src="https://img.shields.io/badge/unsplash-000?style=for-the-badge&logo=unsplash&logoColor=white">

### Config & Deploy

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
