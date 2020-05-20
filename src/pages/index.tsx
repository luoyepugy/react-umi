import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import styles from './index.less';

// import 'moment/locale/zh-cn';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const LayoutIndex: React.FC = props => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout id="antLayout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo} />
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Iteom 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <AppstoreOutlined />
                <span>Navigation Two</span>
              </span>
            }
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className={styles['site-layout']}>
        <Header className={styles['site-layout-background']} style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => setCollapsed(!collapsed)}
              className={`${styles.trigger} c-color-hover`}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => setCollapsed(!collapsed)}
              className={`${styles.trigger} c-color-hover`}
            />
          )}
        </Header>
        <Content
          className={styles['site-layout-background']}
          style={{
            minHeight: 280,
          }}
        >
          <iframe
            title="hello"
            className={styles.iframe}
            src="http://localhost:8000/report/list"
          ></iframe>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutIndex;
