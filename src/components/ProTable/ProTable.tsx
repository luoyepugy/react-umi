/*
 * @Author: 张晗
 * @Date: 2021-11-08 11:46:47
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-18 14:58:37
 * @Description: 基础表格
 */

import TableCRUD from './CRUD';
import TableTabs from './Tabs';
import { Table, TableProps } from 'antd';
import './index.less';

export interface ProTableProps extends TableProps<any> {
  columns: [];
  dataSource: [];
}

function ProTable(props: any) {
  return <Table className="protable" pagination={false} {...props}></Table>;
}

ProTable.CRUD = TableCRUD;
ProTable.Tabs = TableTabs;

export default ProTable;
