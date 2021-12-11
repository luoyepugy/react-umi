/*
 * @Author: 张晗
 * @Date: 2021-11-05 10:32:32
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-23 11:13:42
 * @Description: 列表-查询
 */
import { Button, Form, FormInstance, FormProps, Modal } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useAPI, useModalVisible } from '../../hooks';
import ProModalForm from '../ProModal';
import ProModal from '../ProModal';

interface SearchProps extends FormProps {
  children: React.ReactNode;
  api: string;
  initialValues?: any;
  hasAdvancedSearch?: boolean; // 是否配置高级搜索
  advancedSearchRender?: React.ReactNode; // 配置高级搜索表单
}

interface AdvancedSearchModalProps {
  children: React.ReactNode;
  visible: boolean;
  toggle: () => void;
}

/**
 * @param props visible 是否显示
 * @param props toggle 切换显示状态
 * @description 高级搜索弹窗
 */
function AdvancedSearchModal(props: AdvancedSearchModalProps) {
  const { visible, toggle, children } = props;
  return (
    <ProModal.Form
      width={900}
      title="高级搜索"
      visible={visible}
      toggle={toggle}
      onConfirm={() => {}}
      footerBtns={['clear', 'cancel', 'confirm']}
    >
      {children}
    </ProModal.Form>
  );
}

function Search(props: SearchProps) {
  const {
    api: searchAPI,
    initialValues,
    hasAdvancedSearch = false,
    children,
    advancedSearchRender,
    ...rest
  } = props;
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(true);
  const [visible, toggle] = useModalVisible();

  const onReset = () => {
    form.resetFields();
  };
  const onSearch = async () => {
    const formDatas = await form.validateFields();
    // useAPI(searchAPI, formDatas)
  };

  const collapseRender = () => {
    return React.Children.map(children, (item, index) => {
      const styles = { display: collapsed && index >= 2 ? 'none' : 'inherit' };
      return React.cloneElement(item as any, { style: styles });
    });
  };

  return (
    <section className="list-search">
      <Form form={form} {...rest} initialValues={initialValues}>
        {collapseRender()}
        <Form.Item className="list-search-btns" label="">
          <Button onClick={() => onReset()}>重置</Button>
          <Button type="primary" onClick={() => onSearch()}>
            查询
          </Button>
          {hasAdvancedSearch && (
            <span className="text-highlight" onClick={toggle}>
              高级搜索
            </span>
          )}
          {collapsed && (
            <span
              onClick={() => {
                setCollapsed(false);
              }}
              className="text-highlight color-primary"
            >
              展开
              <DownOutlined />
            </span>
          )}
          {!collapsed && (
            <span
              onClick={() => {
                setCollapsed(true);
              }}
              className="text-highlight color-primary"
            >
              收起
              <UpOutlined />
            </span>
          )}
        </Form.Item>
      </Form>
      {hasAdvancedSearch && (
        <AdvancedSearchModal visible={visible} toggle={toggle}>
          {advancedSearchRender}
        </AdvancedSearchModal>
      )}
    </section>
  );
}

export default Search;
