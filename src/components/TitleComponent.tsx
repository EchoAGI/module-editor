import React from 'react';

const TitleComponent: React.FC<any> = ({ data }) => {
  console.log('TitleComponent data', data);
  return <>{data?.title}</>;
};

export default TitleComponent;
