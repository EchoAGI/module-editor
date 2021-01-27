import React from 'react';

import { BigPicProductList } from './templates/BigPicProductList';
import { TwoColProductList } from './templates/TwoColProductList';

export interface ProductListProps {
  value?: any;
}

const listTemplates = {
  1: props => <BigPicProductList {...props} />,
  2: props => <TwoColProductList {...props} />,
};

const ProductList: React.FC<ProductListProps> = ({ value }) => {
  const listTemplate = listTemplates[value?.listStyle];

  return (
    <>
      {listTemplate
        ? listTemplate(value)
        : `没有找到对应商品模版, listStyle: ${value?.listStyle}`}
    </>
  );
};

export default ProductList;
