import React from 'react';
import { useStore } from '../hooks';
import FormRender from 'form-render/lib/antd';

interface ItemSettingsProps {
  value?: any;
  onChange?: (value: any) => void;
}

const ItemSettings: React.FC<ItemSettingsProps> = ({}) => {
  const { selected, flatten, onItemChange, userProps } = useStore();
  const { widgets } = userProps;

  const onDataChange = newData => {
    if (selected) {
      try {
        const item = flatten[selected];
        if (item && item.schema) {
          onItemChange(selected, { ...item, data: newData });
        }
      } catch (error) {
        console.log(error, 'catch');
      }
    }
  };

  // setting该显示什么的计算，要把选中组件的schema和它对应的widgets的整体schema进行拼接
  let itemSelected;
  try {
    itemSelected = flatten[selected];
    console.log('selected', selected, flatten[selected]);
  } catch (error) {
    console.log(error);
  }

  console.log('widgets fuck', widgets);

  return (
    <FormRender
      schema={itemSelected?.schema?.data}
      widgets={widgets}
      formData={itemSelected?.data}
      onChange={onDataChange}
    />
  );
};

export default ItemSettings;
