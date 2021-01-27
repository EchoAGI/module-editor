import React from 'react';

export const BigPicProductList: React.FC<any> = ({ products, pageMargin }) => {
  return (
    <ul style={{ listStyle: 'none' }}>
      {products?.map((product, index) => (
        <li
          key={index}
          style={{
            listStyle: 'none',
            marginLeft: pageMargin,
            marginRight: pageMargin,
          }}
        >
          <img src={product.avatar?.thumbUrl} style={{ width: '100%' }} />
        </li>
      ))}
    </ul>
  );
};
