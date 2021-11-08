/*
 * @Author: 张晗
 * @Date: 2021-11-08 11:44:51
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-08 16:51:55
 * @Description: 增删改查表格
 */
import { useState } from 'react';
import BTable from './BTable';
import { Pagination, Button, Tooltip } from 'antd';
import { ReloadOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons';

export interface CRUDProps {
  onPageChange: (page: number, pageSize?: number) => void;
  [props: string]: any;
}

function CRUD(props: CRUDProps) {
  const { onPageChange } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const OperationBtns = () => {
    return (
      <section>
        <span>
          <CloseOutlined className="text-highlight" onClick={() => setSelectedRowKeys([])} />
          已选择{selectedRowKeys.length || 0}项
        </span>
        <span className="text-highlight">删除</span>
      </section>
    );
  };

  const DefaultBtns = () => {
    return (
      <section className="btable-crud-default-btns">
        <Button>导入</Button>
        <Button type="primary">新增</Button>
        <Tooltip className="text-highlight" title="刷新">
          <ReloadOutlined />
        </Tooltip>
        <Tooltip className="text-highlight" title="列设置">
          <SettingOutlined />
        </Tooltip>
      </section>
    );
  };

  return (
    <section className="btable-crud">
      {selectedRowKeys.length > 0 ? <OperationBtns /> : <DefaultBtns />}
      <BTable
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (values: never[]) => setSelectedRowKeys(values),
        }}
        {...props}
      ></BTable>
      <Pagination
        showQuickJumper
        showSizeChanger
        showTotal={(total) => `共 ${total} 条`}
        pageSizeOptions={['20', '50', '100']}
        total={500}
        defaultPageSize={20}
        onChange={onPageChange}
      />
    </section>
  );
}

export default CRUD;
