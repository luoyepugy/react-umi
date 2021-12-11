/*
 * @Author: 张晗
 * @Date: 2021-11-08 11:44:51
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-18 15:04:58
 * @Description: 增删改查表格
 */
import { useState } from 'react';
import ProTable from './ProTable';
import { Pagination, Button, Tooltip, TableProps } from 'antd';
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import ProModal from '../ProModal';
import { useModalVisible } from '../../hooks';
import ColumnSetting from './ColumnSetting';
import _ from 'lodash';

interface BatchOperationBtnsProps {
  // name: string;
  text: string;
  onClick: (selectedRow: any[]) => void;
}

export interface CRUDProps extends TableProps<any> {
  onPageChange: (page: number, pageSize?: number) => void;
  AddModalFormItems?: React.ReactNode;
  batchOperationBtns?: BatchOperationBtnsProps[];
}

function CRUD(props: CRUDProps) {
  const { onPageChange, batchOperationBtns, columns } = props;
  const [selectedRow, setSelectedRow] = useState([]);
  const [visible, toggleModal] = useModalVisible();
  const [updatedColumns, setUpdatedColumns] = useState(columns);

  function AddModalForm() {
    return (
      <ProModal.Form
        title="新增"
        width={600}
        visible={visible}
        toggle={toggleModal}
        onConfirm={() => {}}
      >
        {props?.AddModalFormItems}
      </ProModal.Form>
    );
  }

  const OperationBtns = () => {
    return (
      <section className="protable-crud-operation-btns">
        <span>
          <CloseOutlined className="text-highlight" onClick={() => setSelectedRow([])} />
          已选择&nbsp;<b className="color-primary">{selectedRow.length || 0}</b>&nbsp;项
        </span>
        {batchOperationBtns &&
          _.map(batchOperationBtns, (item, index) => {
            return (
              <span
                key={index}
                onClick={() => item.onClick(selectedRow)}
                className="text-highlight btn"
              >
                {item.text}
              </span>
            );
          })}
      </section>
    );
  };

  const DefaultBtns = () => {
    return (
      <section className="protable-crud-default-btns">
        <Button>导入</Button>
        <Button type="primary" onClick={() => toggleModal()}>
          新增
        </Button>
        <Tooltip className="text-highlight" title="刷新">
          <ReloadOutlined />
        </Tooltip>
        <ColumnSetting
          onChange={(checkedList) => {
            const newColumns: any = _.filter(columns, (item: any) => {
              if (checkedList.indexOf(item.dataIndex) > -1) {
                return item;
              }
            });
            setUpdatedColumns(newColumns);
          }}
          columns={columns}
        />
      </section>
    );
  };

  return (
    <section className="protable-crud">
      {selectedRow.length > 0 ? <OperationBtns /> : <DefaultBtns />}
      <ProTable
        rowSelection={{
          type: 'checkbox',
          onSelect: (record: any, selected: any, selectedRow: any) => {
            setSelectedRow(selectedRow);
          },
        }}
        {...props}
        columns={updatedColumns}
      ></ProTable>
      <Pagination
        showQuickJumper
        showSizeChanger
        showTotal={(total) => `共 ${total} 条`}
        pageSizeOptions={['20', '50', '100']}
        total={500}
        defaultPageSize={20}
        onChange={onPageChange}
      />
      {AddModalForm()}
    </section>
  );
}

export default CRUD;
