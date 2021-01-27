// 只需写配置，方便可扩展
export const defaultCommonSettings = {
  $id: {
    title: 'ID',
    description: '数据存储的名称/英文/必填',
    type: 'string',
    'ui:widget': 'idInput',
  },
  title: {
    title: '标题',
    type: 'string',
  },
  description: {
    title: '说明',
    type: 'string',
  },
  'ui:width': {
    title: '元素宽度',
    type: 'string',
    'ui:widget': 'percentSlider',
  },
  'ui:labelWidth': {
    title: '标签宽度',
    description: '默认值120',
    type: 'number',
    'ui:widget': 'slider',
    max: 400,
    'ui:options': {
      hideNumber: true,
    },
  },
  default: {
    title: '默认值',
    type: 'string',
  },
  'ui:readonly': {
    title: '置灰',
    type: 'boolean',
  },
};

// widget 用于schema中每个元素对应的右侧配置知道用哪个setting

export const elements = [
  {
    text: '标题文本',
    name: 'title',
    icon:
      'https://img.yzcdn.cn/public_files/2019/02/12/add4829af43def85a200029c3e485d77.png',
    schema: {
      ui: {
        component: 'TitleComponent',
      },
      data: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            title: '标题内容',
          },
          description: {
            type: 'string',
            title: '描述内容',
          },
        },
      },
    },
  },
];

export const defaultSettings = [
  {
    title: '基础组件',
    components: elements,
    show: true,
    useCommon: true, // TODO: 是否将common
  },
];

export const defaultGlobalSettings = {
  type: 'object',
  properties: {
    column: {
      title: '整体布局',
      type: 'string',
      enum: [1, 2, 3],
      enumNames: ['一行一列', '一行二列', '一行三列'],
      'ui:options': {
        placeholder: '默认一行一列',
      },
    },
    labelWidth: {
      title: '标签宽度',
      type: 'number',
      'ui:widget': 'slider',
      max: 300,
      'ui:options': {
        hideNumber: true,
      },
    },
    displayType: {
      title: '标签展示模式',
      type: 'string',
      enum: ['row', 'column'],
      enumNames: ['同行', '单独一行'],
      'ui:widget': 'radio',
    },
  },
};
