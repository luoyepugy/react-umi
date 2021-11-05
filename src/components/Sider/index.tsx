/*
 * @Author: 张晗
 * @Date: 2021-10-22 15:18:09
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-03 15:56:39
 * @Description:
 */
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import React from 'react'
import { LayoutContext } from '../../contexts/LayoutContext'
import '../components.less'
import { useHistory, Link } from 'react-router-dom'
import _ from 'lodash'
import routeConfig, { routeConfigProps } from '../../routers/router.config'

function SiderIndex() {
  const history = useHistory()

  const SubMenus = (props: { datas: routeConfigProps }) => {
    return (
      <Menu.SubMenu title={props.datas.title} icon={<UserOutlined />}>
        {_.map(props.datas.children, (item, index) => {
          return item.children && item.children.length > 0 ? (
            <SubMenus key={item.path} datas={item}></SubMenus>
          ) : (
            <Menu.Item
              key={item.path}
              onClick={() => {
                history.push(item.path)
              }}
            >
              {item.title}
            </Menu.Item>
          )
        })}
      </Menu.SubMenu>
    )
  }

  return (
    <LayoutContext.Consumer>
      {(collapsed) => (
        <Layout.Sider
          trigger={null}
          collapsible
          collapsed={collapsed.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="vertical" defaultSelectedKeys={['/home']}>
            {_.map(routeConfig, (item, index) => {
              if (item.children && item.children?.length > 0) {
                return <SubMenus key={item.path} datas={item}></SubMenus>
              } else {
                return (
                  <Menu.Item
                    key={item.path}
                    icon={<UserOutlined />}
                    onClick={() => {
                      history.push(item.path)
                    }}
                  >
                    {item.title}
                  </Menu.Item>
                )
              }
            })}
          </Menu>
        </Layout.Sider>
      )}
    </LayoutContext.Consumer>
  )
}

export default SiderIndex
