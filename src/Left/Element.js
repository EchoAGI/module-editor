import React, { forwardRef } from 'react';
import { useGlobal, useStore } from '../hooks';
import { addItem } from '../utils';
import nanoid from 'nanoid';
import { useDrag } from 'react-dnd';
import './Element.css';

const Element = ({ text, name, schema, icon }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'box',
      dragItem: {
        parent: '#',
        schema,
        children: [],
      },
      $id: `#/${name}_${nanoid(6)}`,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const setGlobal = useGlobal();
  const { selected, flatten, onFlattenChange } = useStore();

  const handleElementClick = () => {
    const { newId, newFlatten } = addItem({
      selected,
      name,
      schema,
      flatten,
    });
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  return (
    <>
      <WidgetUI
        dragRef={dragRef}
        text={text}
        icon={icon}
        onClick={handleElementClick}
      />
    </>
  );
};

export default Element;

// 目前没有用icon，但是可以补上
const WidgetUI = ({ dragRef, text, icon, onClick }) => {
  return (
    <li ref={dragRef} className="com-item" onClick={onClick}>
      {icon && (
        <i
          className="com-item-icon"
          style={{ backgroundImage: `url(${icon})` }}
        ></i>
      )}
      <div className="com-item-name">{text}</div>
      <div className="com-item-num">0/100</div>
    </li>
  );
};
