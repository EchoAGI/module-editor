---
hero:
  title: Module Editor
  desc: 模块编辑器
  actions:
    - text: 在线Demo
      link: /playground
    - text: 开始使用
      link: /demo
---

### 安装

```bash
npm i module-editor
```

### 使用

```js
import React from 'react';
import ModuleEditor from 'module-editor';

const defaultValue = {
  schema: {
    ui: {
      component: 'ProductList',
    },
    data: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          title: '标题'
        }
      }
    }
  }
  data: {
    title: '你好',
  },
  displayType: 'row',
};

const templates = [
  {
  },
];

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <ModuleEditor defaultValue={defaultValue} templates={templates} />
    </div>
  );
};

export default Demo;
```

<!-- <code src='./Playground.jsx' className='hide-demo' /> -->
