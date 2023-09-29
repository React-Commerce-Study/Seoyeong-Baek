import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchImg from '../../../assets/icon/search.svg';
import { Product } from '../../../@types/types';
import { getSearchProduct } from '../../../services/ResponseApi';

export default function Search() {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [productList, setProductList] = useState<Product[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchWord(inputValue);
  };

  useEffect(() => {
    if (searchWord.length === 0) setProductList([]);
    else fetchProducts(searchWord);
  }, [searchWord]);

  async function fetchProducts(searchWord: string) {
    const productData = await getSearchProduct(searchWord);
    setProductList(productData);
  }

  // 일치하는 텍스트를 강조 표시하는 함수
  function highlightMatchedText(text: string, searchWord: string) {
    const parts = text.split(new RegExp(`(${searchWord})`, 'gi'));
    // 검색어와 일치하는 부분을 찾을 때 대소문자를 구분하지 않고 모든 일치하는 부분을 찾기 위함
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchWord.toLowerCase() ? (
            <span key={index} style={{ color: 'var(--point-color)' }}>
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/search', { state: productList });
  };

  console.log(productList);
  return (
    <SSearchForm className="search-form" onSubmit={handleOnSubmit}>
      <input type="search" placeholder="상품을 검색해보세요!" className="search-input" onChange={handleOnChange} />
      <button type="submit" className="search-btn">
        <img src={SearchImg} alt="검색버튼" />
      </button>
      {/* <button type="button" className="search-btn-mobile">
        <Link to="/search">
          <img src={SearchImg} alt="검색버튼" />
        </Link>
      </button> */}

      {productList.length > 0 && (
        <ul className="autocomplete">
          {productList.map((product) => (
            <li>
              <Link to="/product/:id" state={product} key={product.product_id}>
                {highlightMatchedText(product.product_name, searchWord)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SSearchForm>
  );
}

const SSearchForm = styled.form`
  flex-shrink: 1;
  margin-right: auto;
  max-width: 25rem;
  height: 46px;
  flex-grow: 1;
  box-sizing: border-box;
  position: relative;
  box-shadow: inset 0 0 10px red;

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

  .autocomplete {
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    z-index: 99;
    border-radius: 5px;
    border: 2px solid var(--point-color);
    background-color: #fff;

    a {
      display: block;
      font-size: var(--font-size-sm);
      padding: 0.5rem;
      box-sizing: border-box;
      border-bottom: 1px solid var(--light-gray-color);
    }
  }
`;
