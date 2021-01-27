import React, { useRef } from 'react';
import ModuleEditor from 'module-editor';
import './index.css';

const ProductList = () => {
  return <>产品列表组件</>;
};

const defaultValue = {
  schema: {
    ui: {
      type: 'container',
    },
    data: {
      type: 'object',
      properties: {},
    },
  },
  displayType: 'row',
  showDescIcon: true,
  labelWidth: 120,
};

const settings = [
  {
    title: '基础组件',
    components: [
      {
        text: '商品',
        name: 'product',
        icon:
          'https://img.yzcdn.cn/public_files/2019/02/12/a6806f6ff8c220aa7a57eb89d253e126.png',
        schema: {
          ui: {
            component: 'ProductList',
          },
          data: {
            type: 'object',
            properties: {
              products: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: {
                      type: 'string',
                      title: '商品名称',
                    },
                    avatar: {
                      type: 'object',
                      properties: {
                        thumbUrl: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
              listStyle: {
                title: '列表样式',
                type: 'number',
                enum: [1, 2, 3, 4, 5, 6],
                enumNames: [
                  '大图',
                  '一行两个',
                  '一行三个',
                  '详细列表',
                  '一大两小',
                  '横向滚动',
                ],
                'ui:widget': 'radio',
              },
              pageMargin: {
                title: '页面边距',
                type: 'number',
                min: 0,
                max: 30,
                'ui:widget': 'slider',
              },
              productMargin: {
                title: '商品边距',
                type: 'number',
                min: 0,
                max: 30,
                'ui:widget': 'slider',
              },
              productStyle: {
                title: '商品样式',
                type: 'number',
                enum: [1, 2, 3, 4],
                enumNames: ['无边白底', '卡片投影', '描边白底', '无边透明底'],
                'ui:widget': 'radio',
              },
              productBorder: {
                title: '商品倒角',
                type: 'number',
                enum: [1, 2],
                enumNames: ['直角', '圆角'],
                'ui:widget': 'radio',
              },
              imageScale: {
                title: '图片比例',
                type: 'number',
                enum: [1, 2, 3, 4],
                enumNames: ['3:2', '1:1', '3:4', '16:9'],
                'ui:widget': 'radio',
              },
              imageFilling: {
                title: '图片填充',
                type: 'number',
                enum: [1, 2],
                enumNames: ['填充', '周边留白'],
                'ui:widget': 'radio',
              },
              fontStyle: {
                title: '文本样式',
                type: 'number',
                enum: [1, 2],
                enumNames: ['常规', '加粗'],
                'ui:widget': 'radio',
              },
              textAlign: {
                title: '文本对齐',
                type: 'number',
                enum: [1, 2, 3],
                enumNames: ['左对齐', '居中对齐', '右对齐'],
                'ui:widget': 'radio',
              },
              displayCols: {
                title: '显示内容',
                type: 'array',
                items: {
                  type: 'string',
                },
                enum: ['name', 'intro', 'price', 'btn_buy'],
                enumNames: ['商品名称', '商品描述', '商品价格', '购买按钮'],
                'ui:widget': 'multiSelect',
              },
              showProductCorner: {
                title: '商品角标',
                type: 'boolean',
              },
              productCornerType: {
                type: 'number',
                enum: [1, 2, 3, 4, 5],
                enumNames: ['新品', '热卖', 'NEW', 'HOT', 'custom'],
                'ui:widget': 'radio',
                'ui:hidden': '{{rootValue.showProductCorner === false}}',
              },
              customCornerType: {
                type: 'string',
                'ui:widget': 'upload',
                'ui:hidden': '{{rootValue.productCornerType !== 5}}',
              },
            },
          },
        },
      },
    ],
  },
];

const Demo = () => {
  const ref = useRef();

  const onClick = () => {
    ref.current.copyValue();
    window.open('https://x-render.gitee.io/form-render/playground');
  };

  const components = { ProductList };

  return (
    <div style={{ height: '100vh' }}>
      <ModuleEditor />
    </div>
  );
};

export default Demo;
