/*
 * @Author: 张晗
 * @Date: 2021-12-10 15:15:18
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-11 17:51:52
 * @Description: Select选择器网格（对ProSelect扩展）
 */

import React, { useEffect, useState } from 'react';
// import { Select, SelectProps, Table } from 'antd'
import { Select, Table } from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import ProSelect, { ProSelectProps } from './index';
// import ProTable from '../ProTable';
import './index.less';

interface ColumnsType {
  title: string;
  dataIndex: string;
  width?: number | string;
}

type OmitProSelectType = 'options' | 'fieldNames';

interface ProSelectGridProps extends Omit<ProSelectProps, OmitProSelectType> {
  /** 网格列配置，title标题，dataIndex索引 */
  columns: Array<ColumnsType>;
  /** 网格数据数组 */
  dataSource?: Array<any>;
  /** 显示在选择框中文本字段 */
  labelField?: string;
  /** 选中后提交的值字段 */
  valueField?: string;
  /** 单选radio/多选checkbox， 默认为checkbox多选模式 */
  type?: 'radio' | 'checkbox' | undefined;

  [props: string]: any;
}

export default function ProSelectGrid(props: ProSelectGridProps) {
  const {
    columns,
    dataSource,
    filterable,
    labelField = 'name',
    valueField = 'id',
    onSearch: onCustomSearch,
    type = 'checkbox',
    value,
    onChange,
    ...rest
  } = props;

  const [data, setData]: Array<any> = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize]: any = useState(100);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [label, setLabel]: any = useState([]);

  useEffect(() => {
    // 初始化数据列表
    if (!_.isEmpty(dataSource)) {
      setData(dataSource);
    }
    // 初始化选中的值
    if (!_.isEmpty(value)) {
      formatSeletedLabelAndValue(value);
    }
  }, [dataSource]);

  /**
   * 格式化选中的selectedRowKeys
   * @param value 参数可能是字符串/用逗号分隔的字符串/字符串数组
   * @return value  处理后的值，数组
   */
  const formatSeletedLabelAndValue = (value: string | Array<string>) => {
    // selectedRowKeys需要数组格式数据
    if (_.isString(value)) {
      value = value.includes(',') ? value.split(',') : [value];
    }

    setSelectedRowKeys(value as never[]);
    setLabelByValue(value);
  };

  /**
   * 根据value过滤出选中的label显示在select框中
   * @param value 选中的值
   */
  const setLabelByValue = (value: Array<any>) => {
    const labels = dataSource?.reduce((prev, item) => {
      if (value.includes(item[valueField])) {
        prev.push(item[labelField]);
      }
      return prev;
    }, []);
    setLabel(labels);
  };

  /**
   * 点击表格行，获取选中的数据
   * @param e 事件
   * @param rowKeys 选中的表格行数据
   */
  const onRowChange = (record: any, index: number) => {
    let rowKey: any = record[valueField];
    let updatedRowKeys = [...selectedRowKeys];

    console.log(rowKey);
    /** 多选模式 */
    if (type === 'checkbox') {
      if (updatedRowKeys.includes(rowKey as never)) {
        updatedRowKeys.splice(index, 1);
      } else {
        updatedRowKeys.push(rowKey as never);
      }
    } else {
      /** 单选模式 */
      updatedRowKeys = [rowKey as never];
    }

    console.log(updatedRowKeys);

    setSelectedRowKeys(updatedRowKeys);
    setLabelByValue(updatedRowKeys);

    // 触发select默认的onChange事件
    if (_.isFunction(onChange)) onChange(updatedRowKeys);
  };

  /**
   * 过滤搜索文本值，返回过滤后的数据
   * @param value 搜索的文本值
   */
  const onFilter = (value: string) => {
    const filterData = data.filter((item: any) => item[valueField].includes(value));
    setData(filterData);
  };

  /**
   * 渲染下拉表格
   * @param menu
   */
  const renderGrid = (menu: any) => (
    <Table
      rowKey={(row) => row[valueField]}
      size="small"
      columns={columns}
      dataSource={data}
      scroll={{ y: 200 }}
      onRow={(record, index) => {
        return {
          onClick: (e) => onRowChange(record, index as number),
        };
      }}
      rowSelection={{
        type,
        selectedRowKeys,
        // onChange: onRowChange,
      }}
      pagination={{
        current: pageIndex,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSize,
        pageSizeOptions: ['100', '500', '1000'],
        onChange: (page) => setPageIndex(page),
        onShowSizeChange: (page, size) => setPageSize(size),
      }}
    ></Table>
  );

  return (
    <ProSelect
      {...rest}
      // dropdownMatchSelectWidth={false}
      mode={type === 'radio' ? undefined : 'multiple'}
      value={label}
      options={dataSource}
      fieldNames={{ label: labelField, value: valueField }}
      onSearch={filterable ? onFilter : onCustomSearch}
      dropdownRender={renderGrid}
    ></ProSelect>
  );
}
