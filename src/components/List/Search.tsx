/*
 * @Author: 张晗
 * @Date: 2021-11-05 10:32:32
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-05 15:25:23
 * @Description: 列表-查询
 */
import { Button, Form } from 'antd'
import useAPI from '../../hooks/useAPI'

interface SearchProps {
  children: React.ReactNode
  api: string
}

function Search(props: SearchProps) {
  const { api: searchAPI } = props
  const [form] = Form.useForm()

  const onClear = () => {
    form.resetFields()
  }
  const onReset = () => {}
  const onSearch = async () => {
    const formDatas = await form.validateFields()
    // useAPI(searchAPI, formDatas)
  }
  const onAdvancedSearch = () => {}

  return (
    <section className="list-search">
      <Form form={form}>{props.children}</Form>
      <section className="list-search-btns">
        <Button onClick={() => onClear()}>清空</Button>
        <Button onClick={() => onReset()}>重置</Button>
        <Button type="primary" onClick={() => onSearch()}>
          查询
        </Button>
        <Button type="text" onClick={() => onAdvancedSearch()}>
          高级搜索
        </Button>
      </section>
    </section>
  )
}

export default Search
