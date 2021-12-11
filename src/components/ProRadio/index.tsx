/*
 * @Author: 张晗
 * @Date: 2021-11-15 10:09:22
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-15 16:46:48
 * @Description: Radio选择器（提供选项数组key别名）
 */

import React, { useState } from 'react';
import { Radio, RadioGroupProps } from 'antd';
import _ from 'lodash';

interface ProRadioGroupProps extends RadioGroupProps {
  labelAlias?: string;
  valueAlias?: string;
  options: any[];
}

export default function ProRadioGroup(props: ProRadioGroupProps) {
  const { labelAlias = 'label', valueAlias = 'value', options, ...rest } = props;
  const datas = _.map(options, (item) => {
    return {
      label: item[labelAlias],
      value: item[valueAlias],
    };
  });
  return <Radio.Group {...rest} options={datas}></Radio.Group>;
}
