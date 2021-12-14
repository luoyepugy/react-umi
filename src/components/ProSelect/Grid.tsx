/*
 * @Author: 张晗
 * @Date: 2021-12-10 15:15:18
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-14 13:39:06
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
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { promises } from 'dns';

interface ColumnsType {
  title: string;
  dataIndex: string;
  width?: number | string;
}

type OmitProSelectType = 'options' | 'fieldNames';

// interface ProSelectGridProps extends Omit<ProSelectProps, OmitProSelectType> {
interface ProSelectGridProps {
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
  /** 远程请求方法 */
  remoteMethod?: (
    pageIndex: number,
    pageSize: number,
    searchText?: string,
  ) => Promise<{ data: { rows: object[]; total: string | number } }>;
  /** 远程请求接口路径 */
  remoteUrl?: string;
  /** 远程请求接口参数 */
  remoteParams?: object;
  /** 远程请求搜索字段名 */
  remoteSearchField?: string;

  isRemote?: boolean;

  [props: string]: any;
}

export default function ProSelectGrid(props: ProSelectGridProps) {
  const {
    columns,
    dataSource,
    filterable,
    labelField = 'name',
    valueField = 'id',
    type = 'checkbox',
    value,
    onChange,
    remoteUrl = '',
    remoteParams = {},
    remoteSearchField = 'keyword',
    remoteMethod = () => {},
    isRemote = false,
    ...rest
  } = props;

  const [data, setData]: Array<any> = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize]: any = useState(100);
  const [total, setTotal]: any = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [label, setLabel]: any = useState([]);

  useEffect(() => {
    // 初始化数据列表
    if (isRemote) {
      setRemoteData(pageIndex, pageSize);
    } else {
      setData(dataSource, initValue);
    }
  }, [dataSource]);

  const initValue = () => {
    // 初始化选中的值
    if (!_.isEmpty(value) && data?.length > 0) {
      formatSeletedLabelAndValue(value);
    }
  };

  const setRemoteData = async (pageIndex, pageSize, searchText?: string) => {
    const res = await remoteMethod(pageIndex, pageSize, searchText);
    setPageIndex(pageIndex);
    setData((res as any)?.data?.rows, initValue);
    setTotal((res as any)?.data?.total);
  };

  /**
   * 格式化选中的selectedRowKeys
   * @param value 参数可能是字符串/用逗号分隔的字符串/字符串数组
   * @return value  处理后的值，数组
   */
  const formatSeletedLabelAndValue = (value: string | Array<string | number>) => {
    // selectedRowKeys需要数组格式数据
    if (_.isString(value)) {
      value = value.includes(',') ? value.split(',') : [value];
    }
    setLabelByValue(value);
  };

  /**
   * 根据value过滤出选中的label显示在select框中
   * @param value 选中的值
   */
  const setLabelByValue = (value: Array<any>) => {
    let rows: any = [];
    let labels: any = [];
    let map = {};

    if (!_.isEmpty(value)) {
      data.map((item) => {
        if (value.includes(item[valueField])) {
          map[item[valueField]] = item;
        }
      });

      // 按value数组顺序加入label和row，确保有默认值和删除时索引无问题
      value.forEach((item) => {
        const label = map[item][labelField];
        labels.push(label);
        rows.push(map[item]);
      });
    }

    console.log(value);
    console.log(labels);
    console.log(rows);

    setLabel(labels);
    setSelectedRows(rows);
    setSelectedRowKeys(value as never[]);
  };

  /**
   * 点击表格行，获取选中的数据
   * @param e 事件
   * @param rowKeys 选中的表格行数据
   */
  const onRowChange = (record: any) => {
    let rowKey: any = record[valueField];
    let updatedRowKeys = [...selectedRowKeys];
    let updatedIndex = 0;

    // 多选模式
    if (type === 'checkbox') {
      if (updatedRowKeys.includes(rowKey as never)) {
        // 过滤出当前点击的索引
        selectedRows.map((item, index) => {
          if (item[valueField] == rowKey) updatedIndex = index;
        });
        updatedRowKeys.splice(updatedIndex, 1);
      } else {
        updatedRowKeys.push(rowKey as never);
      }
    } else {
      // 单选模式
      updatedRowKeys = [rowKey as never];
    }

    console.log(updatedRowKeys);
    setLabelByValue(updatedRowKeys);

    // 触发select默认的onChange事件
    if (_.isFunction(onChange)) onChange(updatedRowKeys);
  };

  /**
   * 过滤搜索文本值，返回过滤后的数据
   * @param value 搜索的文本值
   */
  const onFilter = (value: string) => {
    if (isRemote) {
      setRemoteData(1, pageSize, value);
      return;
    }

    const filterData = data.filter(
      (item: any) => item[labelField].includes(value) || item[valueField].includes(value),
    );
    setData(filterData);
  };

  /**
   * 多选checkbox模式下标签删除触发事件
   * @param label
   */
  const onDeselectChange = (label: string) => {
    const deletedValue = selectedRows.filter((item) => item[labelField] == label)[0][valueField];
    const value = selectedRowKeys.filter((item) => item !== deletedValue);
    setLabelByValue(value);
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
          onClick: (e) => onRowChange(record),
        };
      }}
      rowSelection={{
        type,
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          setLabelByValue(selectedRowKeys);
        },
      }}
      pagination={{
        current: pageIndex,
        total,
        showTotal: (total) => `共${total}条`,
        showSizeChanger: true,
        pageSize,
        pageSizeOptions: ['100', '500', '1000'],
        onChange: (page) => {
          setPageIndex(page);
          isRemote && setRemoteData(page, pageSize);
        },
        onShowSizeChange: (page, size) => setPageSize(size),
      }}
    ></Table>
  );

  return (
    <Select
      {...rest}
      // dropdownMatchSelectWidth={false}
      mode={type === 'radio' ? undefined : 'multiple'}
      value={label}
      onSearch={_.debounce(onFilter, 500)}
      onDeselect={onDeselectChange}
      dropdownRender={renderGrid}
    ></Select>
  );
}
