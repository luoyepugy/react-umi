/*
 * @Author: 张晗
 * @Date: 2021-11-05 10:32:32
 * @LastEditors: 张晗
 * @LastEditTime: 2021-11-08 16:27:39
 * @Description: 列表-查询
 */
import { Button, Form } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import useAPI from '../../hooks/useAPI';

interface SearchProps {
  children: React.ReactNode;
  api: string;
  initialValues?: any;
  hasAdvancedSearch?: boolean; // 是否配置高级搜索
}

function Search(props: SearchProps) {
  const { api: searchAPI, initialValues, hasAdvancedSearch = false } = props;
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };
  const onSearch = async () => {
    const formDatas = await form.validateFields();
    // useAPI(searchAPI, formDatas)
  };
  const onAdvancedSearch = () => {};

  return (
    <section className="list-search">
      <Form form={form} initialValues={initialValues}>
        {props.children}
        <Form.Item className="list-search-btns">
          <Button onClick={() => onReset()}>重置</Button>
          <Button type="primary" onClick={() => onSearch()}>
            查询
          </Button>
          {hasAdvancedSearch && (
            <span className="text-highlight" onClick={() => onAdvancedSearch()}>
              高级搜索
            </span>
          )}
          <span className="text-highlight color-primary">
            展开
            <DownOutlined />
          </span>
          {/* <span>收起<UpOutlined /></span> */}
        </Form.Item>
      </Form>
    </section>
  );
}

export default Search;
