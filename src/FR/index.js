import React from 'react';
import { useStore } from '../hooks';
import ComponentPreview from './ComponentPreview';
import RenderChildren from './RenderChildren';
import Wrapper from './Wrapper';

const FR = ({ id }) => {
  const { flatten, frProps = {} } = useStore();
  const { column } = frProps;
  const item = flatten[id];

  if (!item) return null;

  const { schema } = item;
  const isObj = schema.ui.type === 'container';
  const isComplex = isObj;
  const width = schema.ui['ui:width'];
  let containerClass = `fr-field w-100 ${isComplex ? 'fr-field-complex' : ''}`;
  let labelClass = 'fr-label mb2';
  let contentClass = 'fr-content';

  let columnStyle = {};
  if (!isComplex && width) {
    columnStyle = {
      width,
      paddingRight: '12px',
    };
  } else if (!isComplex && column > 1) {
    columnStyle = {
      width: `calc(100% /${column})`,
      paddingRight: '12px',
    };
  }

  const componentProps = {
    $id: id,
    item,
    labelClass,
    contentClass,
    isComplex,
  };

  const childrenProps = {
    children: item.children,
  };

  const childrenElement =
    item.children && item.children.length > 0 ? (
      <ul className={`flex flex-wrap pl0`}>
        <RenderChildren {...childrenProps} />
      </ul>
    ) : null;

  const isEmpty = Object.keys(flatten).length < 2; // 只有一个根元素 # 的情况
  if (isEmpty) {
    return (
      <Wrapper style={columnStyle} $id={id} item={item}>
        <div
          className={`${containerClass} h-100 f4 black-40 flex items-center justify-center`}
        >
          点击/拖拽左侧栏的组件进行添加
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={columnStyle} $id={id} item={item}>
      <div className={containerClass}>
        <ComponentPreview {...componentProps}>
          {isObj && (
            <Wrapper $id={id} item={item} inside>
              {childrenElement || <div className="h2" />}
            </Wrapper>
          )}
        </ComponentPreview>
      </div>
    </Wrapper>
  );
};

export default FR;
