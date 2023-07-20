import React from 'react';

interface ProductImgProps {
  productImg: string;
  imgName: string;
}

export default function ProductImg({ productImg, imgName }: ProductImgProps) {
  return (
    <div className="img-box">
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
