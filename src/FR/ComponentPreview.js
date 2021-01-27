import React from 'react';
import { useStore } from '../hooks';

const DummyComponent = () => {
  return <>没有找到对应组件</>;
};

const ComponentPreview = ({
  $id,
  item,
  labelClass,
  contentClass,
  isComplex,
  children,
}) => {
  const { schema, data } = item;
  const { onItemChange, components, frProps = {} } = useStore();
  const { displayType, showDescIcon, showValidate } = frProps;
  const { title, description, required } = schema;
  const isRequired = required && required.length > 0;

  let componentName = schema.ui.component;
  if (!componentName) {
    if (schema.ui.type === 'container') {
      componentName = 'MapComponent';
    }
  }

  let Component = components[componentName];

  if (!Component) {
    Component = DummyComponent;
  }

  const onChange = value => {
    const newItem = { ...item };
    newItem.data = value;
    onItemChange($id, newItem);
  };

  // TODO: useMemo
  const usefulWidgetProps = {
    disabled: schema.ui.disabled,
    readonly: schema.ui.readonly,
    hidden: schema.ui.hidden,
    options: schema.ui.options,
    labelWidth: schema.ui.labelWidth,
    width: schema.ui.width,
  };

  return (
    <>
      {schema.title ? (
        <div className={labelClass} style={labelStyle}>
          <label className={`fr-label-title`} title={title}>
            {isRequired && <span className="fr-label-required"> *</span>}
            <span
              className={`${isComplex ? 'b' : ''} ${
                displayType === 'column' ? 'flex-none' : ''
              }`}
            >
              {title}
            </span>
            {description &&
              (showDescIcon ? (
                <span className="fr-tooltip-toggle" aria-label={description}>
                  <i className="fr-tooltip-icon" />
                  <div className="fr-tooltip-container">
                    <i className="fr-tooltip-triangle" />
                    {description}
                  </div>
                </span>
              ) : (
                <span className="fr-desc ml2">(&nbsp;{description}&nbsp;)</span>
              ))}
            {displayType !== 'row' && showValidate && (
              <span className="fr-validate">validation</span>
            )}
          </label>
        </div>
      ) : null}
      <div className={contentClass}>
        <Component
          data={data}
          onChange={onChange}
          schema={schema}
          {...usefulWidgetProps}
          children={children}
        />
      </div>
    </>
  );
};

export default ComponentPreview;
