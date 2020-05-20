import React, { useState } from 'react';
import styles from './list.less';
// import BlGridTable from '@/component/bl-gridtable/bl-gridtable';
import { queryList } from '@/services/report';
import constsReport from '@/consts/report';
import constsCommon from '@/consts/common';
import { BlGridTable } from 'myModule';
// import {Select} from 'antd';

class ReportListIndex extends BlGridTable {
  constructor(props) {
    super(props);
    this.apiList = queryList;
    this.showAdvancedSearch = true;
    // this.operable = false;

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        checked: 3,
      },
      {
        title: '姓名',
        key: 'name',
        dataIndex: 'name',
        checked: 1,
        search: {
          mode: 1, // toolbar
          renderType: 'Select',
          options: constsReport.STATUS_ALL,
          default: 0,
        },
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        checked: 1,
        names: ['startDate', 'endDate'],
        search: {
          mode: 3, // toolbar && andavancedSearch
          renderType: 'DateRange',
          default: ['2020-01-02', '2020-03-02'],
        },
      },
      {
        title: '住址',
        key: 'address',
        dataIndex: 'address',
        checked: 2,
        search: {
          mode: 2, // andavancedSearch
          renderType: 'Input',
          default: 'aa',
        },
        ellipsis: true,
      },
      {
        title: '测试',
        key: ':hidden',
        dataIndex: 'test',
        checked: 2,
        search: {
          mode: 3, // andavancedSearch
          renderType: 'Select',
          options: constsReport.STATUS_ALL,
          default: 2,
        },
        ellipsis: true,
      },
    ];
    this.operatebarBtns = [
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
    this.actionColumnBtns = [
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
  }
}

export default ReportListIndex;
