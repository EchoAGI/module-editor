import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useSet, useStorageState } from './hooks';
import copyTOClipboard from 'copy-text-to-clipboard';
import Left from './Left';
import Right from './Right';
import {
  flattenSchema,
  idToSchema,
  getSaveNumber,
  looseJsonParse,
  isObject,
} from './utils';
import { Ctx, StoreCtx } from './context';
// import SCHEMA from './json/basic.json';
import { Modal, Input, message } from 'antd';
import { Button } from 'antd';
import FR from './FR';

const { TextArea } = Input;

function Wrapper(
  {
    schema,
    onChange,
    onSchemaChange,
    setGlobal,
    userProps = {},
    frProps = {},
    ...rootState
  },
  ref,
) {
  const [local, setState] = useSet({
    showModal: false,
    showModal2: false,
    showModal3: false,
    schemaForImport: '',
  });

  const { simple = true } = rootState;

  const { templates, submit, extraButtons = [] } = userProps;

  const [saveList, setSaveList] = useState(templates || []);

  const saveNameRef = useRef();

  const flattenWithData = flattenSchema(schema || {});

  const onFlattenChange = newFlatten => {
    const newSchema = idToSchema(newFlatten);
    console.log('onFlattenChange newFlatten', newFlatten);
    console.log('newSchema', newSchema);

    if (onSchemaChange) {
      onSchemaChange(newSchema);
    }
  };

  const onItemChange = (key, value) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData);
  };

  const toggleModal = () => setState({ showModal: !local.showModal });
  const toggleModal2 = () => setState({ showModal2: !local.showModal2 });
  const toggleModal3 = () => setState({ showModal3: !local.showModal3 });

  const clearSchema = () => {
    setGlobal({
      schema: {
        schema: {
          ui: {
            type: 'container',
          },
        },
      },
      selected: undefined,
    });
  };

  const onTextareaChange = e => {
    setState({ schemaForImport: e.target.value });
  };

  // 收口点 propsSchema 到 schema 的转换（一共就3个入口：defaultValue，importSchema，setValue）
  // TODO: 3个入口可能还是太多了，是不是考虑在外面裹一层
  // TODO2: 导入这边看看会不会传一个乱写的schema就crash
  const importSchema = () => {
    try {
      const info = looseJsonParse(local.dataForImport);
      setGlobal(state => ({
        schema: info,
        selected: undefined,
        frProps: { ...state.frProps, ...rest },
      }));
    } catch (error) {
      message.info('格式不对哦，请重新尝试'); // 可以加个格式哪里不对的提示
    }
    toggleModal2();
  };

  const copySchema = () => {
    copyTOClipboard(JSON.stringify(schema));
    message.info('复制成功');
    toggleModal();
  };

  // const handleSubmit = () => {
  //   submit(displaySchema);
  // };

  const getValue = () => {
    return JSON.stringify(schema);
  };

  // setValue 外部用于修改大schema，叫setSchema比较合适
  // TODO: 这次顶层的props传递改动和整理后，确保这个api还是正确的
  const setValue = value => {
    try {
      const { schema, ...rest } = value;

      setGlobal(state => ({
        ...state,
        schema: schema,
        selected: undefined,
        frProps: { ...state.frProps, ...rest },
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const copyValue = () => {
    copyTOClipboard(JSON.stringify(schema));
  };

  useImperativeHandle(ref, () => ({
    getValue,
    setValue,
    copyValue,
  }));

  const saveSchema = () => {
    try {
      const text = saveNameRef.current.state.value;
      const name = 'save' + getSaveNumber();
      setSaveList([...saveList, { text, name, schema }]);
      toggleModal3();
    } catch (error) {
      message.error('保存失败');
    }
  };

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData,
    onFlattenChange, // onChange + onSchemaChange = onFlattenChange
    onItemChange, // onFlattenChange 里只改一个item的flatten，使用这个方法
    userProps,
    frProps,
    ...rootState,
  };

  const module = flattenWithData['#'];

  const _extraButtons = Array.isArray(extraButtons) ? extraButtons : [];
  const _showDefaultBtns = _extraButtons.filter(
    item => item === true || item === false,
  );
  const _extraBtns = _extraButtons.filter(item => isObject(item) && item.text);

  if (simple) {
    return (
      <Ctx.Provider value={setGlobal}>
        <StoreCtx.Provider value={store}>
          <FR id="#" />
        </StoreCtx.Provider>
      </Ctx.Provider>
    );
  }

  return (
    <Ctx.Provider value={setGlobal}>
      <StoreCtx.Provider value={store}>
        <div className="fr-wrapper">
          <Left saveList={saveList} setSaveList={setSaveList} />
          <div className="mid-layout pr2">
            <div className="mv2 mh1">
              {_showDefaultBtns[1] !== false && (
                <Button className="mr2" onClick={clearSchema}>
                  清空
                </Button>
              )}
              {/* <Button className="mr2" onClick={toggleModal3}>
                  保存
                </Button> */}
              {_showDefaultBtns[2] !== false && (
                <Button className="mr2" onClick={toggleModal2}>
                  导入
                </Button>
              )}
              {_showDefaultBtns[3] !== false && (
                <Button type="primary" className="mr2" onClick={toggleModal}>
                  导出schema
                </Button>
              )}
              {_extraBtns.map((item, idx) => {
                return (
                  <Button key={idx.toString()} className="mr2" {...item}>
                    {item.text || item.children}
                  </Button>
                );
              })}
              {/* <Button type="primary" className="mr2" onClick={handleSubmit}>
                  保存
                </Button> */}
            </div>
            <div className="dnd-container">
              <div className="preview-wrap">
                <div className="preview">
                  <div className="preview-head preview-head-weapp">
                    <div className="preview-header-title">
                      {module?.data?.name || '模块名称'}
                    </div>
                  </div>
                  <div className="preview-iframe-wrap">
                    <FR id="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Right globalProps={frProps} />
          <Modal
            visible={local.showModal}
            onOk={copySchema}
            onCancel={toggleModal}
            okText="复制"
            cancelText="取消"
          >
            <div className="mt3">
              <TextArea
                style={{ fontSize: 12 }}
                value={JSON.stringify(schema)}
                autoSize={{ minRows: 10, maxRows: 30 }}
              />
            </div>
          </Modal>
          <Modal
            visible={local.showModal2}
            okText="导入"
            cancelText="取消"
            onOk={importSchema}
            onCancel={toggleModal2}
          >
            <div className="mt3">
              <TextArea
                style={{ fontSize: 12 }}
                value={local.schemaForImport}
                placeholder="贴入需要导入的schema，模样可点击导出schema参考"
                onChange={onTextareaChange}
                autoSize={{ minRows: 10, maxRows: 30 }}
              />
            </div>
          </Modal>
          <Modal
            visible={local.showModal3}
            okText="确定"
            cancelText="取消"
            onOk={saveSchema}
            onCancel={toggleModal3}
          >
            <div className="mt4 flex items-center">
              <div style={{ width: 100 }}>保存名称：</div>
              <div style={{ width: 280 }}>
                <Input
                  defaultValue={'存档' + getSaveNumber()}
                  ref={saveNameRef}
                />
              </div>
            </div>
          </Modal>
        </div>
      </StoreCtx.Provider>
    </Ctx.Provider>
  );
}

const FRWrapper = forwardRef(Wrapper);

FRWrapper.defaultProps = {
  labelWidth: 120,
};

export default FRWrapper;
