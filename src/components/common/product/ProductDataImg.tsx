interface ProductImgProps {
  productImg: string;
  imgName: string;
  handleClick?: () => void;
}

export default function ProductImg({ productImg, imgName, handleClick }: ProductImgProps) {
  return (
    <div className="img-box" onClick={handleClick}>
      <img src={productImg} alt={imgName} />
    </div>
  );
}

// const ProductImg: React.FC<ProductImgProps> = ({ productImg, imgName }) => {
//     return (
//       <div className="img-box">
//         {/* `productImg` prop을 사용하여 이미지 URL을 설정합니다. */}
//         <img src={productImg} alt={imgName} />
//       </div>
//     );
//   };

//   export default ProductImg;
