/*
 * @Author: 张晗
 * @Date: 2021-10-22 15:18:09
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-05 14:13:24
 * @Description:
 */
import { Layout, Menu } from 'antd'
import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import '../components.less'
import { LayoutContext } from '../../contexts/LayoutContext'

function HeaderIndex() {
  return (
    <LayoutContext.Consumer>
      {(value) => (
        <Layout.Header className="header" style={{ padding: 0 }}>
          {React.createElement(
            value.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: value.toggle,
            }
          )}
        </Layout.Header>
      )}
    </LayoutContext.Consumer>
  )
}

export default HeaderIndex
