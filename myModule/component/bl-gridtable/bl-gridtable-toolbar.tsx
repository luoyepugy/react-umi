import React, { Props } from 'react';
import { Select, Input, Button, DatePicker, Form, Radio } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './bl-gridtable.less';
import IconFont from '../../iconfont';
import { DynamicForm } from './bl-gridtable-search';

class BlGridTableToolbar extends React.PureComponent {
  renderInputSearch() {
    const { searchPlaceholder, onValueChange } = this.props;
    return (
      <Input.Search
        placeholder={searchPlaceholder || '请输入关键字搜索'}
        onSearch={value => onValueChange('keyWord', value, 'InputSearch')}
        enterButton
      />
    );
  }

  renderAdvancedSearchText() {
    const { openDrawerSearch } = this.props;
    return (
      <div
        onClick={() => openDrawerSearch()}
        className={`${styles['toolbar-advanced']} c-color-hover`}
      >
        高级搜索
      </div>
    );
  }

  render() {
    const { columns, onValueChange, showAdvancedSearch } = this.props;
    const fields = columns.filter(i => i.search && (i.search.mode === 1 || i.search.mode === 3));
    return (
      <section className={styles.toolbar}>
        {fields.length > 0 && (
          <DynamicForm
            showLabel={false}
            fields={fields}
            onChange={(key: string, value: any, type: string) => onValueChange(key, value, type)}
          />
        )}
        {this.renderInputSearch()}
        {showAdvancedSearch ? this.renderAdvancedSearchText() : null}
      </section>
    );
  }
}

export { BlGridTableToolbar };
