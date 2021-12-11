/*
 * @Author: 张晗
 * @Date: 2021-11-08 10:44:30
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-17 11:13:50
 * @Description:
 */
import ProTable, { CRUDProps } from '../ProTable';

interface TableProps {
  children?: React.ReactNode;
}

function Table<T>(props: CRUDProps) {
  const defaultTable = <ProTable.CRUD {...props}></ProTable.CRUD>;

  return <section className="list-table">{props?.children || defaultTable}</section>;
}

export default Table;
