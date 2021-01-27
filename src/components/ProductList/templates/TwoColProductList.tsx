import React from 'react';
import styles from '../index.less';

export const TwoColProductList: React.FC<any> = ({
  products,
  pageMargin = 0,
  productMargin = 0,
}) => {
  return (
    <ul
      style={{
        listStyle: 'none',
        marginLeft: pageMargin,
        marginRight: pageMargin,
      }}
    >
      {products?.map((product, index) => (
        <li
          key={index}
          style={{
            listStyle: 'none',
            float: 'left',
            width: '50%',
          }}
        >
          <a
            style={{ margin: `${3.5 + productMargin}px` }}
            className={styles['product-layout-item']}
          >
            <div className={styles.image}>
              <div className={styles.wrap} style={{ paddingTop: '100%' }}>
                <div
                  className={styles.cover}
                  style={{
                    backgroundImage: `url(${product.avatar.thumbUrl})`,
                  }}
                />
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles['title-wrap']}>
                <h3 className={styles.title}>{product.title}</h3>
              </div>
              <div className={styles.price}>
                <div className={styles['price-info']}>
                  <span className={styles['sale-price']}>
                    <span className={styles['price-tag']}>¥</span>$
                    {product.price}
                  </span>
                </div>
                <div className={styles['btn-wrap']}>
                  <i className={styles['btn-buy']} />
                </div>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};
