/*
 * @Author: 张晗
 * @Date: 2021-10-26 10:09:08
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-04 16:02:28
 * @Description:
 */
import Nav2 from '../pages/nav2'
import Nav1 from '../pages/nav1'
import App from '../App'

export interface routeConfigProps {
  title: string
  path: string
  exact?: boolean
  component?: any
  icon?: React.ReactNode | string
  /**
   * @description 子路由配置
   */
  children?: routeConfigProps[]
}

const routeConfig: routeConfigProps[] = [
  {
    title: '首页',
    path: '/home',
    component: App,
  },
  {
    title: '导航1',
    path: '/nav1',
    component: Nav1,
  },
  {
    title: '导航2',
    path: '/nav2',
    children: [
      {
        title: '导航22',
        path: '/nav22',
        component: Nav2,
      },
    ],
  },
]
export default routeConfig
