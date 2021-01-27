import React from 'react';
import { defaultSettings } from '../Settings';
import { useStore } from '../hooks';
import './index.css';
import Element from './Element';

const Left = ({ saveList, setSaveList, ...rest }) => {
  const { userProps = {} } = useStore();
  const { settings } = userProps;
  const _settings = Array.isArray(settings) ? settings : defaultSettings;

  return (
    <div className="left-layout w5-l w4">
      {Array.isArray(_settings) ? (
        _settings.map((group, idx) => {
          if (group && group.show === false) {
            return null;
          }

          return (
            <div key={idx}>
              <p className="f6 b">{group.title}</p>
              <ul className="pl0">
                {Array.isArray(group.components) ? (
                  group.components.map((component, idx) => {
                    return (
                      <Element key={idx.toString()} {...component} {...rest} />
                    );
                  })
                ) : (
                  <div>此处配置有误</div>
                )}
              </ul>
            </div>
          );
        })
      ) : (
        <div>配置错误：Setting不是数组</div>
      )}
    </div>
  );
};

export default Left;
