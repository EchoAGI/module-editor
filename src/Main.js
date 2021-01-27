import React, { useEffect, forwardRef } from 'react';
import { useSet } from './hooks';
import FRWrapper from './FRWrapper';
import { components as defaultComponents } from './components';
import './atom.css';
import './Main.css';
import 'antd/dist/antd.css';

const DEFAULT_SCHEMA = {
  schema: {
    schema: {
      ui: {
        type: 'container',
      },
    },
  },
};

// TODO: formData 不存在的时候会报错：can't find # of undefined
function App(
  {
    defaultValue,
    templates,
    submit,
    transformer,
    extraButtons,
    settings,
    commonSettings,
    globalSettings,
    components = {},
  },
  ref,
) {
  let transformFrom = a => a;
  let transformTo = a => a;
  try {
    if (typeof transformer.from === 'function') {
      transformFrom = transformer.from;
    }
    if (typeof transformer.to === 'function') {
      transformTo = transformer.to;
    }
  } catch (error) {}

  const [state, setState] = useSet({
    schema: {
      schema: {
        ui: {
          type: 'container',
        },
      },
    },
    frProps: {
      displayType: 'row',
    }, // form-render 的全局props等
    hovering: undefined, // 目前没有用到
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
  });

  // 收口点 propsSchema 到 schema 的转换 (一共3处，其他两个是 importSchema 和 setValue，在 FRWrapper 文件)
  useEffect(() => {
    setState({
      schema: defaultValue || DEFAULT_SCHEMA,
    });
  }, [defaultValue]);

  const { schema, frProps, hovering, selected } = state;

  const { displayType } = frProps;
  const showDescIcon = displayType === 'row' ? true : false;
  const _frProps = { ...frProps, showDescIcon };

  const onChange = data => {
    setState({ schema: data });
  };

  const onSchemaChange = newSchema => {
    setState({ schema: newSchema });
  };

  const rootState = {
    simple: false,
    components: { ...defaultComponents, ...components },
    selected,
    hovering,
  };

  const userProps = {
    templates,
    submit,
    transformFrom,
    transformTo,
    extraButtons,
    settings,
    commonSettings,
    globalSettings,
  };

  const allProps = {
    schema,
    onChange,
    setGlobal: setState,
    onSchemaChange,
    ...rootState, // 顶层的state
    userProps, // 用户传入的props
    frProps: _frProps, // fr顶层的props
  };

  return <FRWrapper ref={ref} {...allProps} />;
}

export default forwardRef(App);
