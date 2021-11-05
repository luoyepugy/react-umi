/*
 * @Author: 张晗
 * @Date: 2021-10-22 11:32:21
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-05 15:27:34
 * @Description:
 */
import React from 'react'
import { Button, Form, Input } from 'antd'
import { List, Detail } from '../../components'

function Nav1Index() {
  return (
    <List.Layout>
      <List.Search api="http://www.baidu.com">
        <Form.Item label="名称">
          <Input></Input>
        </Form.Item>
      </List.Search>
    </List.Layout>
  )
}

export default Nav1Index
