/*
 * @Author: 张晗
 * @Date: 2021-11-15 10:09:22
 * @LastEditors: 张晗
 * @LastEditTime: 2021-12-11 13:37:31
 * @Description: Select选择器
 */

import React from 'react'
import { Select } from 'antd'
// import { Select, SelectProps } from 'antd'
import classNames from 'classnames'
import _ from 'lodash'
import Grid from './Grid'
import './index.less'

interface FieldNamesType {
  label?: string
  value?: string
}

// export interface ProSelectProps extends SelectProps<any> {
export interface ProSelectProps {
  /** 样式名称 */
  className?: string
  /** 是否可过滤搜索的 */
  filterable?: boolean
  /** 自定义opitons中label和value字段名 */
  fieldNames?: FieldNamesType
  /** 前缀图标 */
  prefix?: React.ReactNode
  /** 后缀图标 */
  suffix?: React.ReactNode
  /** 下拉选项数据数组 */
  options?: any[] | undefined

  [props: string]: any
}

function ProSelect(props: ProSelectProps) {
  const {
    className: customizeClassName,
    filterable = false,
    fieldNames,
    prefix,
    suffix,
    options,
    ...rest
  } = props

  const defaultFieldNames = {
    label: fieldNames?.label || 'label',
    value: fieldNames?.value || 'value',
  }

  const data = options?.map((item: any) => {
    return {
      label: item[defaultFieldNames.label],
      value: item[defaultFieldNames.value],
    }
  })

  return (
    <div
      className={classNames('pro-select', customizeClassName, {
        'pro-select-group': prefix || suffix,
      })}>
      {prefix && <div className="pro-select-group-addon">{prefix}</div>}
      <Select
        {...rest}
        showArrow={true}
        options={data}
        showSearch={filterable}
        filterOption={
          filterable
            ? (input, option: any) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            : false
        }></Select>
      {suffix && <div className="pro-select-group-addon">{suffix}</div>}
    </div>
  )
}

/** 下拉选择器网格 */
ProSelect.Grid = Grid

export default ProSelect
