import React from 'react';
import { queryList } from '@/services/report';
import constsReport from '@/consts/report';
import constsCommon from '@/consts/common';
import GridTable, { ToolBarOptionType } from '@/components/GridTable/GridTable';
import styles from './list.less';
import { ToolBarOptionProps, DrawerSearchOptionProps } from '@/components/GridTable';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    checked: 3,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    checked: 1,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    checked: 1,
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    checked: 2,
    ellipsis: true,
  },
];
const operatebarBtns = [
  {
    ...constsReport.BUTTON_AUTH.delete,
    onClick: (key: string, rows: any) => {
      console.log(key);
      console.log(rows);
    },
  },
  {
    ...constsReport.BUTTON_AUTH.submit,
    onClick: (key: string, rows: any) => {
      console.log(key);
      console.log(rows);
    },
  },
];
const rowBtns = [
  {
    ...constsReport.BUTTON_AUTH.delete,
    onClick: (key: string, rows: any) => {
      console.log(key);
      console.log(rows);
    },
  },
  {
    ...constsReport.BUTTON_AUTH.edit,
    onClick: (key: string, rows: any) => {
      console.log(key);
      console.log(rows);
    },
  },
  {
    ...constsReport.BUTTON_AUTH.detail,
    onClick: (key: string, rows: any) => {
      console.log(key);
      console.log(rows);
    },
  },
];

const toolbar: Array<ToolBarOptionProps> = [
  {
    type: 'Select',
    options: constsReport.STATUS_ALL,
    default: 0,
    key: 'status',
  },
  {
    type: 'DateRange',
    default: ['2019-12-09', '2020-03-09'],
    key: ['startDate', 'endDate'],
  },
  {
    type: 'InputSearch',
    placeholder: '请输入关键字搜索',
    key: 'searchKey',
  },
  {
    type: 'Text',
    key: 'advancedSearch',
  },
  {
    type: 'Button',
    key: 'export',
    exportApi: queryList,
  },
  {
    type: 'ButtonPrimary',
    key: 'add',
    title: '新增',
    onClick: () => {},
  },
];

const advancedSearch: Array<DrawerSearchOptionProps> = [
  {
    type: 'Input',
    key: 'no',
    title: '合同编号',
    default: '',
  },
  {
    type: 'DateRange',
    key: ['startDate', 'endDate'],
    title: '合同日期',
    default: ['2019-12-09', '2020-03-09'],
  },
  {
    type: 'Select',
    key: 'region',
    title: '大区',
    options: constsCommon.OPTION_ALL.concat(constsReport.STATUS),
  },
  {
    type: 'SelectRemote',
    key: 'shopNo',
    title: '所属卖场',
  },
  {
    type: 'Radio',
    options: constsCommon.OPTION_ALL.concat(constsReport.STATUS),
    key: 'status',
    title: '状态',
    default: 0,
  },
];

const queryParams = {
  status: 0,
  no: '',
};

const ReportList = () => {
  return (
    <div className={styles['content']}>
      <GridTable
        checkable
        operable
        queryParams={queryParams}
        listApi={queryList}
        advancedSearch={advancedSearch}
        rowBtns={rowBtns}
        operatebarBtns={operatebarBtns}
        columns={columns}
        toolbar={toolbar}
      />
    </div>
  );
};
export default ReportList;
