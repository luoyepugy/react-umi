/*
 * @Author: 张晗
 * @Date: 2021-10-22 15:18:09
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-03 16:32:39
 * @Description:
 */
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import _ from 'lodash'
import App from '../App'

function RouteIndex() {
  return (
    <HashRouter>
      <Switch>
        <Route
          render={(routerProps) => {
            return <App {...routerProps} />
          }}
        />
      </Switch>
    </HashRouter>
  )
}

export default RouteIndex
