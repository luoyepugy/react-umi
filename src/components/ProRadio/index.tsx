/*
 * @Author: 张晗
 * @Date: 2021-11-15 10:09:22
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-13 10:51:24
 * @Description: Radio选择器（提供选项数组key别名）
 */

import React, { useState } from 'react';
import { Radio, RadioGroupProps } from 'antd';
import { FieldNamesType } from '../ProSelect';
import _ from 'lodash';

interface ProRadioGroupProps extends RadioGroupProps {
  options: any[];
  fieldNames: FieldNamesType;
}

export default function ProRadioGroup(props: ProRadioGroupProps) {
  const { fieldNames, options, ...rest } = props;

  const defaultFieldNames = {
    label: fieldNames?.label || 'label',
    value: fieldNames?.value || 'value',
  };

  const data = options?.map((item: any) => {
    return {
      label: item[defaultFieldNames.label],
      value: item[defaultFieldNames.value],
    };
  });

  return <Radio.Group {...rest} options={data}></Radio.Group>;
}
