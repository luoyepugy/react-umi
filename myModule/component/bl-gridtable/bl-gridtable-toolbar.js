import React from 'react';
import { Input } from 'antd';
import styles from './bl-gridtable.less';
import { DynamicForm } from './bl-gridtable-search';
class BlGridTableToolbar extends React.PureComponent {
    renderInputSearch() {
        const { searchPlaceholder, onValueChange } = this.props;
        return (React.createElement(Input.Search, { placeholder: searchPlaceholder || '请输入关键字搜索', onSearch: value => onValueChange('keyWord', value, 'InputSearch'), enterButton: true }));
    }
    renderAdvancedSearchText() {
        const { openDrawerSearch } = this.props;
        return (React.createElement("div", { onClick: () => openDrawerSearch(), className: `${styles['toolbar-advanced']} c-color-hover` }, "\u9AD8\u7EA7\u641C\u7D22"));
    }
    render() {
        const { columns, onValueChange, showAdvancedSearch } = this.props;
        const fields = columns.filter(i => i.search && (i.search.mode === 1 || i.search.mode === 3));
        return (React.createElement("section", { className: styles.toolbar },
            fields.length > 0 && (React.createElement(DynamicForm, { showLabel: false, fields: fields, onChange: (key, value, type) => onValueChange(key, value, type) })),
            this.renderInputSearch(),
            showAdvancedSearch ? this.renderAdvancedSearchText() : null));
    }
}
export { BlGridTableToolbar };
//# sourceMappingURL=bl-gridtable-toolbar.js.map