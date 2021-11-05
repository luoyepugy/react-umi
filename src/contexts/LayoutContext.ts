/*
 * @Author: 张晗
 * @Date: 2021-10-25 16:38:01
 * @LastEditors: 张晗
 * @LastEditTime: 2021-10-26 09:43:53
 * @Description:
 */
import React from 'react'

export const LayoutContext = React.createContext({
  collapsed: false,
  toggle: () => {},
})
