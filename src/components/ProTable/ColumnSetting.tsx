/*
 * @Author: 张晗
 * @Date: 2021-11-15 16:57:23
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-18 15:05:23
 * @Description: 表格-列配置
 */
import React, { useState } from 'react';
import { Tooltip, Popover, Checkbox } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './index.less';

const ColumnSetting: React.FC<{ columns: any; onChange: (checkedList: string[]) => void }> = ({
  columns,
  onChange: onCustomChange,
}) => {
  const plainOptions = columns.map((item: any) => {
    return {
      label: item.title,
      value: item.dataIndex,
    };
  });

  const defaultCheckedList = columns.map((item: any) => item.dataIndex);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

  const onChange = (list: any) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    onCustomChange(list);
  };

  const onCheckAllChange = (e: any) => {
    console.log(e.target.checked);
    setCheckedList(e.target.checked ? defaultCheckedList : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const CheckboxList: React.FC = () => {
    return (
      <div className="column-setting-body">
        <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        ></Checkbox.Group>
      </div>
    );
  };

  return (
    <Popover
      placement="bottomRight"
      title={
        <div className="column-setting-header">
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            列内容
          </Checkbox>
          <a onClick={() => onChange(defaultCheckedList)} className="btn">
            重置
          </a>
        </div>
      }
      content={CheckboxList}
      trigger="click"
      className="aaa"
    >
      <Tooltip className="text-highlight" title="列设置">
        <SettingOutlined />
      </Tooltip>
    </Popover>
  );
};

export default ColumnSetting;
