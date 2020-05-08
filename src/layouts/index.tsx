import React from 'react';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

const BasicLayout = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <div>{props.children}</div>
    </ConfigProvider>
  );
};

export default BasicLayout;
