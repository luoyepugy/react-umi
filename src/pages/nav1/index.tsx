/*
 * @Author: 张晗
 * @Date: 2021-10-22 11:32:21
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-08 16:29:35
 * @Description:
 */
import React from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { List, Detail, BTable } from '../../components';

function Nav1Index() {
  const tableProps = {
    columns: [
      {
        title: 'SKU编码',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
      {
        title: 'SKU编码',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
      {
        title: 'SKU编码',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
    ],
    dataSource: [
      {
        key: '1',
        address: 'John Brown',
      },
      {
        key: '2',
        address: 'John Brown2',
      },
      {
        key: '3',
        address: 'John Brown3',
      },
    ],
    onPageChange: (page: number, pageSize: number | undefined) => {
      console.log(page);
      console.log(pageSize);
    },
  };
  return (
    <List.Layout>
      <List.Search
        hasAdvancedSearch
        api="http://www.baidu.com"
        initialValues={{ gender: 'female' }}
      >
        <Form.Item name="name" label="名称">
          <Input></Input>
        </Form.Item>
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="" allowClear>
            <Select.Option value="male">male</Select.Option>
            <Select.Option value="female">female</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input />
        </Form.Item>
      </List.Search>
      <List.Table {...tableProps} srcoll={{ y: 50 }}></List.Table>
    </List.Layout>
  );
}

export default Nav1Index;
