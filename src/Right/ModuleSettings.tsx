import FormRender from 'form-render/lib/antd';

interface ModuleSettingsProps {
  value?: any;
  onChange?: (value: any) => void;
}

const ModuleSettings: React.FC<ModuleSettingsProps> = ({ value, onChange }) => {
  const schema = {
    name: '模块设置',
    type: 'object',
    properties: {
      name: {
        title: '模块名称',
        type: 'string',
      },
    },
  };

  const handleModuleSettingChange = v => {
    // 保存模块设置
    console.log('value', v);
    onChange?.(v);
  };

  return (
    <>
      <h3>自定义模块设置</h3>
      <FormRender
        displayType="row"
        schema={schema}
        formData={value}
        onChange={handleModuleSettingChange}
      />
    </>
  );
};

export default ModuleSettings;
