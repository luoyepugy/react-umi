/*
 * @Author: 张晗
 * @Date: 2021-10-22 10:03:29
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-04 14:00:43
 * @Description:
 */
import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import './App.less'
import HeaderIndex from './components/Header'
import SiderIndex from './components/Sider'
import { LayoutContext } from './contexts/LayoutContext'
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import _ from 'lodash'
import routeConfig, { routeConfigProps } from './routers/router.config'

const flatRouteConfig = routeConfig.reduce((prev: any, cur: any) => {
  return cur.children ? prev.concat(cur.children) : prev.concat(cur)
}, [])

const App = (props: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div className="App">
      <LayoutContext.Provider value={{ collapsed, toggle }}>
        <Layout>
          <SiderIndex />
          <Layout className="site-layout">
            <HeaderIndex></HeaderIndex>
            <Layout.Content className="site-layout-background site-layout-content">
              {_.map(flatRouteConfig, (item, i) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    component={item.component}
                  ></Route>
                )
              })}
              <Redirect to="/home"></Redirect>
            </Layout.Content>
          </Layout>
        </Layout>
      </LayoutContext.Provider>
    </div>
  )
}

export default App
