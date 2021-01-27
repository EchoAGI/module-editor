import React from 'react';

const TitleComponent: React.FC<any> = ({ value }) => {
  console.log('TitleComponent data', value);
  return <>{value?.title}</>;
};

export default TitleComponent;
