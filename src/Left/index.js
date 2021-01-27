import React from 'react';
import { defaultSettings } from '../Settings';
import { useStore } from '../hooks';
import './index.css';
import Element from './Element';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const Left = ({ saveList, setSaveList, ...rest }) => {
  const { userProps = {} } = useStore();
  const { settings } = userProps;
  const _settings = Array.isArray(settings) ? settings : defaultSettings;

  return (
    <div className="left-layout w5-l w4">
      <Collapse className="com-collapse" defaultActiveKey={['0']} ghost>
        {Array.isArray(_settings) ? (
          _settings.map((group, idx) => {
            if (group && group.show === false) {
              return null;
            }

            return (
              <Panel header={group.title} key={idx}>
                {Array.isArray(group.components) ? (
                  group.components.map((component, idx) => {
                    return (
                      <Element key={idx.toString()} {...component} {...rest} />
                    );
                  })
                ) : (
                  <div>此处配置有误</div>
                )}
              </Panel>
            );
          })
        ) : (
          <div>配置错误：Setting不是数组</div>
        )}
      </Collapse>
    </div>
  );
};

export default Left;
