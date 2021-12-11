/*
 * @Author: 张晗
 * @Date: 2021-11-17 10:08:31
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-17 16:09:33
 * @Description:
 */
import React from 'react';
import { Modal, ModalProps } from 'antd';
import _ from 'lodash';
import ProModalForm from './Form';
import './index.less';

export interface ProModalProps extends ModalProps {
  children: React.ReactNode;
  visible: boolean;
  toggle: () => void;
}

function ProModal(props: ProModalProps) {
  const { visible, toggle, children, ...rest } = props;
  return (
    <Modal
      className="pro-modal"
      visible={visible}
      maskClosable={false}
      onCancel={() => toggle()}
      {...rest}
    >
      {children}
    </Modal>
  );
}

ProModal.Form = ProModalForm;

export default ProModal;
