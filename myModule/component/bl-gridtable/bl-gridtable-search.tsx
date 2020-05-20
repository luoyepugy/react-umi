import React, { createRef, forwardRef, useEffect } from 'react';
import { Drawer, Button, Form, Input, Select, DatePicker, Radio } from 'antd';
import moment from 'moment';
import styles from './bl-gridtable.less';
import { FormInstance } from 'antd/lib/form';

const DynamicFormItem = props => {
  const { item, onChange, showLabel } = props;
  const { search } = item;
  switch (search.renderType) {
    case 'Select':
      return (
        <Select
          defaultValue={search.default}
          bordered={showLabel}
          onChange={value => onChange(item.key, value, 'Select')}
          placeholder={`请选择${item.title}`}
        >
          {search.options.map(op => {
            return (
              <Select.Option key={op.id} value={op.id}>
                {op.name}
              </Select.Option>
            );
          })}
        </Select>
      );
    case 'SelectRemote':
      return (
        <Select
          showSearch
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={value => onChange(item.key, value, 'Select')}
          placeholder={`请搜索选择${item.title}`}
          notFoundContent="暂无搜索结果"
        >
          {search.options &&
            search.options.map(op => {
              return (
                <Select.Option key={op.id} value={op.id}>
                  {op.name}
                </Select.Option>
              );
            })}
        </Select>
      );
    case 'DateRange':
      return (
        <DatePicker.RangePicker
          onChange={(dates, dateString) => onChange(item.names, dateString, 'DateRange')}
          defaultValue={[
            moment(search.default[0], 'YYYY/MM/DD'),
            moment(search.default[1], 'YYYY/MM/DD'),
          ]}
          allowClear={false}
          key={item.key}
        />
      );
    case 'Radio':
      return (
        <Radio.Group
          defaultValue={search.default}
          onChange={event => onChange(item.key, event.target.value, 'Radio')}
        >
          {item.options.map(op => {
            return (
              <Radio key={op.id} value={op.id}>
                {op.name}
              </Radio>
            );
          })}
        </Radio.Group>
      );
    default:
      return (
        <Input
          defaultValue={search.default}
          onChange={event => onChange(item.key, event.target.value, 'Input')}
          placeholder={`请输入${item.title}`}
        />
      );
  }
};

const DynamicForm = forwardRef((props, ref) => {
  const { fields, onChange, showLabel } = props;

  return (
    <Form ref={ref} layout="inline" name="form">
      {fields.map(item => (
        <Form.Item
          className={item.type === 'Radio' ? styles['form-item-full'] : ''}
          key={item.key}
          name={item.key}
          label={showLabel ? item.title : ''}
        >
          <DynamicFormItem
            showLabel={showLabel}
            onChange={(key: string, value: any, type: string) => onChange(key, value, type)}
            item={item}
          />
        </Form.Item>
      ))}
    </Form>
  );
});

class BlGridTableSearch extends React.PureComponent {
  refForm = React.createRef<FormInstance>();

  private formVals: object = this.getDefaultValues();

  componentDidMount() {}

  onValueChange(key, value, type) {
    if (type === 'DateRange') {
      this.initRangeVals(key, value, this.formVals);
    } else {
      this.formVals[key] = value;
    }
  }

  initRangeVals(key: string, value: any, obj: any) {
    const [start, end] = key;
    const [startVal, endVal] = value;
    obj[start] = startVal;
    obj[end] = endVal;
  }

  getDefaultValues() {
    const defaultValues: any = {};
    this.props.columns
      .filter(i => i.search && (i.search.mode === 2 || i.search.mode === 3))
      .map(item => {
        if (item.type === 'DateRange') {
          this.initRangeVals(item.key, item.default || ['', ''], defaultValues);
        } else {
          defaultValues[item.key] = item.default != null ? item.default : null;
        }
      });
    return defaultValues;
  }

  onConfirm = async () => {
    this.props.onSave(this.formVals);
    this.props.onClose();
  };

  onClear = () => {
    this.refForm.current.resetFields();
  };

  onCancel() {
    this.refForm.current.resetFields();
    this.props.onClose();
  }

  render() {
    const { width, title, columns, visible, onClose } = this.props;
    const fields = columns.filter(i => i.search && (i.search.mode === 2 || i.search.mode === 3));
    return (
      <Drawer
        forceRender
        className={styles.drawersearch}
        width={width || 900}
        title={title || '高级搜索'}
        placement="right"
        visible={visible}
        footer={
          <div className={styles['drawersearch-footer']}>
            <Button type="dashed" onClick={() => this.onClear()}>
              清空
            </Button>
            <Button onClick={() => this.onCancel()}>取消</Button>
            <Button onClick={() => this.onConfirm()} type="primary">
              确定
            </Button>
          </div>
        }
        onClose={() => onClose()}
      >
        <div className={styles['drawersearch-content']}>
          <DynamicForm
            ref={this.refForm}
            showLabel={true}
            fields={fields}
            onChange={(key: string, value: any, type: string) =>
              this.onValueChange(key, value, type)
            }
          />
        </div>
      </Drawer>
    );
  }
}

export { BlGridTableSearch, DynamicForm };
