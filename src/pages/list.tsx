import React, { useState } from 'react';
import styles from './list.less';
import { Drawer, Table, Button } from 'antd';

const DrawerTest = props => {
  const { visible, onClose } = props;
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default function List() {
  const [showDrawer, setShowDrawer] = useState(false);

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>Page list</div>
      <div className={styles['content-table']}>
        <div onClick={() => setShowDrawer(true)}>测试Drawer</div>
        <Table scroll={{ y: `calc(100vh - 175px)` }} dataSource={dataSource} columns={columns} />
      </div>
      {/* <div className={styles.footer}>
        <Button type="primary">保存</Button>
        <Button>取消</Button>
      </div> */}
      {showDrawer ? <DrawerTest visible={showDrawer} onClose={() => setShowDrawer(false)} /> : null}
    </div>
  );
}
