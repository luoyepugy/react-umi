/*
 * @Author: 张晗
 * @Date: 2021-11-08 11:46:47
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-08 15:38:28
 * @Description: 基础表格
 */

import TableCRUD from './CRUD';
import TableTabs from './Tabs';
import { Table } from 'antd';
import './index.less';

export interface BTableProps {
  columns: [];
  dataSource: [];
}

function BTable(props: any) {
  return <Table className="btable" pagination={false} {...props}></Table>;
}

BTable.CRUD = TableCRUD;
BTable.Tabs = TableTabs;

export default BTable;
