import React from 'react';
import { useStore } from '../hooks';
import FormRender from 'form-render/lib/antd';

interface ItemSettingsProps {
  value?: any;
  onChange?: (value: any) => void;
}

const ItemSettings: React.FC<ItemSettingsProps> = ({}) => {
  const { selected, flatten, onItemChange } = useStore();

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

  // TODO2: 这边开放

  return (
    <div style={{ paddingRight: 24 }}>
      <FormRender
        schema={itemSelected?.schema?.data}
        formData={itemSelected?.data}
        onChange={onDataChange}
      />
    </div>
  );
};

export default ItemSettings;
