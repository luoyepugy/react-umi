/*
 * @Author: 张晗
 * @Date: 2021-10-22 11:32:21
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-10 16:55:03
 * @Description:
 */
import React, { useState } from 'react';
import { Button, Form, Input, Select, Table, Radio } from 'antd';
import { List, Detail, ProTable, ProSelect, ProRadio } from '../../components';
import { FormInstance } from 'rc-field-form';
import { SettingOutlined } from '@ant-design/icons';

function Nav1Index() {
  const tableProps = {
    columns: [
      {
        title: 'SKU编码',
        dataIndex: 'sku',
        key: 'sku',
        width: 120,
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width: 120,
      },
      {
        title: '测试',
        dataIndex: 'test',
        key: 'test',
        width: 120,
      },
    ],
    dataSource: [
      {
        key: '1',
        address: 'John Brown',
        sku: 'John Brown',
        test: 'est',
      },
      {
        key: '2',
        address: 'John Brown2',
        sku: 'John Brown',
        test: 'est',
      },
      {
        key: '3',
        address: 'John Brown3',
        sku: 'John Brown',
        test: 'est',
      },
    ],
    onPageChange: (page: number, pageSize: number | undefined) => {
      console.log(page);
      console.log(pageSize);
    },
    batchOperationBtns: [
      {
        text: '启用',
        onClick: (selectedRowKeys: any[]) => {
          console.log(selectedRowKeys);
        },
      },
      {
        text: '禁用',
        onClick: (selectedRowKeys: any[]) => {
          console.log(selectedRowKeys);
        },
      },
    ],
  };

  const [form, setForm] = useState<FormInstance>();

  // let form: FormInstance;

  const advancedSearchRender = () => {
    return (
      <>
        <Form.Item name="name1" label="名称1">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name2" label="名称2">
          <Input></Input>
        </Form.Item>
        <Form.Item name="name3" label="名称3">
          <Input></Input>
        </Form.Item>
        <Form.Item className="form-item-full" name="status" label="状态">
          <ProRadio
            options={[
              { label: '全部', value: '' },
              { label: '启用', value: '0' },
              { label: '禁用', value: '1' },
            ]}
          ></ProRadio>
        </Form.Item>
      </>
    );
  };

  // const [formData, setFormData] = useFormChange();

  return (
    <List.Layout>
      <List.Search
        hasAdvancedSearch
        api="http://www.baidu.com"
        initialValues={{ gender: 'female' }}
        advancedSearchRender={advancedSearchRender}
      >
        <Form.Item name="name" label="名称">
          <Input></Input>
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <ProSelect.Grid
            // prefix={'http://'}
            // suffix={<SettingOutlined />}
            columns={[
              {
                title: '姓名',
                dataIndex: 'name',
              },
              {
                title: '地址',
                dataIndex: 'address',
              },
            ]}
            dataSource={[
              {
                name: 'aa',
                address: 'aadress',
              },
              {
                name: 'bb',
                address: 'bbdress',
              },
            ]}
            valueField="name"
            allowClear
            // options={[
            //   { label1: 'male1', val: 'male' },
            //   { label1: 'female1', val: 'female' },
            // ]}
            filterable
            // fieldNames={{ label: 'label1', value: 'val' }}
          />
        </Form.Item>
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input />
        </Form.Item>
      </List.Search>
      <List.Table {...tableProps} scroll={{ y: 50 }}></List.Table>
    </List.Layout>
  );
}

export default Nav1Index;
