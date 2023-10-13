import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchImg from '../../../assets/icon/search.svg';
import { Product } from '../../../@types/types';
import { getSearchProduct } from '../../../services/ResponseApi';
import BackBtn from '../../../assets/icon/icon-rhigt-arrow.svg';

interface SearchFormProps {
  isMobileSearch: boolean;
  setIsMobileSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({ isMobileSearch, setIsMobileSearch }: SearchFormProps) {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [productList, setProductList] = useState<Product[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchWord(inputValue);
  };

  useEffect(() => {
    if (searchWord === '') setProductList([]);
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
    navigate(`/product/${productList[0].product_id}`, { state: productList[0] });
    handleLinkClick();
  };

  const handleLinkClick = () => {
    setProductList([]);
  };

  console.log(productList);

  const handleMobileSearchBtn = () => {
    if (isMobileSearch) {
      setIsMobileSearch(false);
      setSearchWord(''); // 검색어 지우기
    } else setIsMobileSearch(true);
  };

  return (
    <SSearchForm className={`search-form ${isMobileSearch ? 'search-form-mobile-active' : ''}`} onSubmit={handleOnSubmit}>
      <input
        type="search"
        placeholder="상품을 검색해보세요!"
        className="search-input"
        onChange={handleOnChange}
        value={searchWord}
      />
      <button type="submit" className="search-btn">
        <img src={SearchImg} alt="검색버튼" />
      </button>

      <button type="button" className="search-btn-mobile" onClick={handleMobileSearchBtn}>
        <img src={isMobileSearch ? BackBtn : SearchImg} className={isMobileSearch ? 'back-btn' : ''} alt="검색버튼" />
      </button>

      {productList.length > 0 && (
        <ul className="autocomplete">
          {productList.map((product) => (
            <li>
              <Link to={`/product/${product.product_id}`} state={product} key={product.product_id} onClick={handleLinkClick}>
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
  transition: all 0.25s ease-in-out;

  .search-input {
    width: 100%;
    padding: 0.8125rem 3.3rem 0.8125rem 1.375rem;
    border: 2px solid var(--point-color);
    border-radius: 23px;
  }

  .search-btn {
    width: 1.75rem;
    height: 1.75rem;
    position: absolute;
    top: 50%;
    right: 1.375rem;
    transform: translate(0, -50%);
    transition: all 0.3s ease-in-out;
  }

  .search-btn-mobile {
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
      transition: width 0.25s ease-in-out;
    }

    .back-btn {
      transform: rotate(180deg);
      width: 100%;
      height: 90%;
    }

    &:hover {
      background-color: #efffd2;
      box-shadow: rgba(0, 0, 0, 0.22) 0px 3px 8px;
    }
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
