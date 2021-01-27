import React, { useEffect } from 'react';
import { useStore, useSet } from '../hooks';
import { RightOutlined } from '@ant-design/icons';
import './index.css';
import ItemSettings from './ItemSettings';
import ModuleSettings from './ModuleSettings';

export default function Right() {
  const [state, setState] = useSet({
    showRight: true,
    showItemSettings: false,
  });
  const { flatten, selected, onItemChange } = useStore();
  const { showRight, showItemSettings } = state;

  const item = flatten[selected || '#'];

  console.log('selected', selected, item);

  const handleChange = value => {
    if (!item) return;

    onItemChange(selected || '#', { ...item, data: value });
  };

  const toggleRight = () => setState({ showRight: !showRight });

  const ToggleIcon = () => (
    <div
      className="absolute top-0 left-0 pointer"
      style={{ height: 30, width: 30, padding: '8px 0 0 8px' }}
      onClick={toggleRight}
    >
      <RightOutlined className="f5" />
    </div>
  );

  const HideRightArrow = () => (
    <div
      className="absolute right-0 top-0 h2 flex-center"
      style={{ width: 40 }}
    >
      <ToggleIcon />
    </div>
  );

  // 如果没有选中任何item，或者是选中了根节点，object、list的内部，显示placeholder
  useEffect(() => {
    if ((selected && selected[0] === '0') || selected === '#' || !selected) {
      setState({ showItemSettings: false });
    } else {
      setState({ showItemSettings: true });
    }
  }, [selected]);

  return showRight ? (
    <div className="right-layout relative pl2">
      {showItemSettings ? (
        <ItemSettings />
      ) : (
        <ModuleSettings value={item?.data} onChange={handleChange} />
      )}
    </div>
  ) : (
    <HideRightArrow />
  );
}
