import React from 'react';
import { Drawer, Button, Form, Input, Select, DatePicker, Radio } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { OptionProps, IdNameProps } from './GridTable';

export type DrawerSearchType =
  | 'Select'
  | 'SelectRemote'
  | 'Input'
  | 'InputRange'
  | 'DateRange'
  | 'Radio';

export interface DrawerSearchOptionProps extends OptionProps {
  type: DrawerSearchType;
}

interface DrawerSearchProps {
  title?: string;
  visible: boolean;
  options: Array<DrawerSearchOptionProps>;
  onClose: () => void;
  onSave: (values: object) => void;
}

interface FormItemComponentProps {
  item: DrawerSearchOptionProps;
  onChange: (key: string | number | undefined, value: any, type: string) => void;
  onSearch?: (val: string) => void;
}

const FormItemComponent = (props: FormItemComponentProps) => {
  const { item, onChange, onSearch } = props;
  switch (item.type) {
    case 'Select':
      return (
        <Select
          defaultValue={item.default}
          onChange={value => onChange(item.key, value, 'Select')}
          placeholder={`请选择${item.title}`}
        >
          {item.options.map((op: IdNameProps) => {
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
          {item.options &&
            item.options.map((op: IdNameProps) => {
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
          onChange={(dates, dateString) => onChange(item.key, dateString, 'DateRange')}
          defaultValue={[
            moment(item.default[0], 'YYYY/MM/DD'),
            moment(item.default[1], 'YYYY/MM/DD'),
          ]}
          allowClear={false}
          key={item.key}
        />
      );
    case 'Radio':
      return (
        <Radio.Group
          defaultValue={item.default}
          onChange={event => onChange(item.key, event.target.value, 'Radio')}
        >
          {item.options.map((op: IdNameProps) => {
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
          defaultValue={item.default}
          onChange={event => onChange(item.key, event.target.value, 'Input')}
          placeholder={`请输入${item.title}`}
        />
      );
  }
};

const DrawerSearch = React.memo((props: DrawerSearchProps) => {
  const { title, options, visible, onClose, onSave } = props;
  const [form] = Form.useForm();

  const initDateRangeVals = (key: string, value: any, obj: any) => {
    const [startDate, endDate] = key;
    const [startDateVal, endDateVal] = value;
    obj[startDate] = startDateVal;
    obj[endDate] = endDateVal;
  };

  const getDefaultValues = () => {
    const defaultValues: any = {};
    options.map(item => {
      if (item.type === 'DateRange') {
        initDateRangeVals(item.key, item.default || ['', ''], defaultValues);
      } else {
        defaultValues[item.key] = item.default != null ? item.default : null;
      }
    });
    return defaultValues;
  };

  let formVals = getDefaultValues();

  const onChangeFormItem = (
    key: string,
    value: string | number | [string, string],
    type: string,
  ) => {
    if (type === 'DateRange') {
      initDateRangeVals(key, value, formVals);
    } else {
      formVals[key] = value;
    }
  };

  const onConfirm = async () => {
    onSave(formVals);
    console.log(formVals);
    onClose();
  };

  const onClear = () => {
    form.resetFields();
    formVals = getDefaultValues();
    form.setFieldsValue(formVals);
  };

  return (
    <Drawer
      className={styles.drawersearch}
      width={900}
      title={title || '高级搜索'}
      placement="right"
      visible={visible}
      footer={
        <div className={styles['drawersearch-footer']}>
          <Button type="dashed" onClick={() => onClear()}>
            清空
          </Button>
          <Button onClick={() => onClose()}>取消</Button>
          <Button onClick={() => onConfirm()} type="primary">
            确定
          </Button>
        </div>
      }
      onClose={() => onClose()}
    >
      <div className={styles['drawersearch-content']}>
        <Form name="form" form={form} initialValues={getDefaultValues()}>
          {options.map(item => (
            <Form.Item
              className={item.type === 'Radio' ? styles['form-item-full'] : ''}
              key={item.key}
              name={item.key}
              label={item.title}
            >
              <FormItemComponent
                onChange={(key, value, type) => onChangeFormItem(key, value, type)}
                item={item}
              />
            </Form.Item>
          ))}
        </Form>
      </div>
    </Drawer>
  );
});

export default DrawerSearch;
