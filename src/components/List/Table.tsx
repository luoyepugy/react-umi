/*
 * @Author: 张晗
 * @Date: 2021-11-08 10:44:30
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-08 15:08:07
 * @Description:
 */
import BTable, { CRUDProps } from '../BTable';

interface TableProps {
  children?: React.ReactNode;
}

function Table<T>(props: CRUDProps) {
  const defaultTable = <BTable.CRUD {...props}></BTable.CRUD>;

  return <section className="list-table">{props?.children || defaultTable}</section>;
}

export default Table;
