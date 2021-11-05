/*
 * @Author: 张晗
 * @Date: 2021-11-05 10:17:38
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-05 13:40:45
 * @Description: 列表-布局
 */
import Search from './Search'
import './index.less'

interface ListProps {
  children: React.ReactNode
}

function List(props: ListProps) {
  return <section className="list-layout">{props.children}</section>
}

List.Layout = List
List.Search = Search

export default List
