import React from 'react';

import { BigPicProductList } from './templates/BigPicProductList';
import { TwoColProductList } from './templates/TwoColProductList';

const listTemplates = {
  1: props => <BigPicProductList {...props} />,
  2: props => <TwoColProductList {...props} />,
};

const ProductList: React.FC<any> = ({ data }) => {
  const listTemplate = listTemplates[data?.listStyle];

  return (
    <>
      {listTemplate
        ? listTemplate(data)
        : `没有找到对应商品模版, listStyle: ${data?.listStyle}`}
    </>
  );
};

export default ProductList;
