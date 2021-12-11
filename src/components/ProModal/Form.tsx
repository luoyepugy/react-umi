/*
 * @Author: 张晗
 * @Date: 2021-11-17 15:22:55
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-17 16:18:20
 * @Description:
 */

import React from 'react';
import { Form, Button } from 'antd';
import _ from 'lodash';
import ProModal, { ProModalProps } from './index';
import './index.less';

/**
 * @description 清空 | 取消 | 确认
 */
type ModalFooterBtnType = 'clear' | 'cancel' | 'confirm';

interface ProModalFormProps extends ProModalProps {
  onConfirm: (formVals: any) => void;
  footerBtns?: ModalFooterBtnType[];
}

const ModalFooterBtnMap = {
  clear: '清空',
  cancel: '取消',
  confirm: '确定',
};

function ProModalForm(props: ProModalFormProps) {
  const [form] = Form.useForm();
  const {
    visible,
    toggle,
    children,
    onConfirm: onCustomConfirm,
    footerBtns = ['cancel', 'confirm'],
    ...rest
  } = props;

  const handleEvent = async (eventName: string) => {
    switch (eventName) {
      case 'clear':
        form.resetFields();
        break;
      case 'cancel':
        toggle();
        break;
      case 'confirm':
        const vals = await form.validateFields();
        onCustomConfirm(vals);
        toggle();
        break;
    }
  };

  const footerRender = _.map(footerBtns, (item) => {
    return (
      <Button onClick={() => handleEvent(item)} type={item === 'confirm' ? 'primary' : 'default'}>
        {ModalFooterBtnMap[item]}
      </Button>
    );
  });

  return (
    <ProModal visible={visible} toggle={toggle} footer={footerRender} {...rest}>
      <Form form={form}>{children}</Form>
    </ProModal>
  );
}

export default ProModalForm;
