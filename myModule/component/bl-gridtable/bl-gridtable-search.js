import React, { forwardRef } from 'react';
import { Drawer, Button, Form, Input, Select, DatePicker, Radio } from 'antd';
import moment from 'moment';
import styles from './bl-gridtable.less';
const DynamicFormItem = props => {
    const { item, onChange, showLabel } = props;
    const { search } = item;
    switch (search.renderType) {
        case 'Select':
            return (React.createElement(Select, { defaultValue: search.default, bordered: showLabel, onChange: value => onChange(item.key, value, 'Select'), placeholder: `请选择${item.title}` }, search.options.map(op => {
                return (React.createElement(Select.Option, { key: op.id, value: op.id }, op.name));
            })));
        case 'SelectRemote':
            return (React.createElement(Select, { showSearch: true, defaultActiveFirstOption: false, showArrow: false, filterOption: false, onChange: value => onChange(item.key, value, 'Select'), placeholder: `请搜索选择${item.title}`, notFoundContent: "\u6682\u65E0\u641C\u7D22\u7ED3\u679C" }, search.options &&
                search.options.map(op => {
                    return (React.createElement(Select.Option, { key: op.id, value: op.id }, op.name));
                })));
        case 'DateRange':
            return (React.createElement(DatePicker.RangePicker, { onChange: (dates, dateString) => onChange(item.names, dateString, 'DateRange'), defaultValue: [
                    moment(search.default[0], 'YYYY/MM/DD'),
                    moment(search.default[1], 'YYYY/MM/DD'),
                ], allowClear: false, key: item.key }));
        case 'Radio':
            return (React.createElement(Radio.Group, { defaultValue: search.default, onChange: event => onChange(item.key, event.target.value, 'Radio') }, item.options.map(op => {
                return (React.createElement(Radio, { key: op.id, value: op.id }, op.name));
            })));
        default:
            return (React.createElement(Input, { defaultValue: search.default, onChange: event => onChange(item.key, event.target.value, 'Input'), placeholder: `请输入${item.title}` }));
    }
};
const DynamicForm = forwardRef((props, ref) => {
    const { fields, onChange, showLabel } = props;
    return (React.createElement(Form, { ref: ref, layout: "inline", name: "form" }, fields.map(item => (React.createElement(Form.Item, { className: item.type === 'Radio' ? styles['form-item-full'] : '', key: item.key, name: item.key, label: showLabel ? item.title : '' },
        React.createElement(DynamicFormItem, { showLabel: showLabel, onChange: (key, value, type) => onChange(key, value, type), item: item }))))));
});
class BlGridTableSearch extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.refForm = React.createRef();
        this.formVals = this.getDefaultValues();
        this.onConfirm = async () => {
            this.props.onSave(this.formVals);
            this.props.onClose();
        };
        this.onClear = () => {
            this.refForm.current.resetFields();
        };
    }
    componentDidMount() { }
    onValueChange(key, value, type) {
        if (type === 'DateRange') {
            this.initRangeVals(key, value, this.formVals);
        }
        else {
            this.formVals[key] = value;
        }
    }
    initRangeVals(key, value, obj) {
        const [start, end] = key;
        const [startVal, endVal] = value;
        obj[start] = startVal;
        obj[end] = endVal;
    }
    getDefaultValues() {
        const defaultValues = {};
        this.props.columns
            .filter(i => i.search && (i.search.mode === 2 || i.search.mode === 3))
            .map(item => {
            if (item.type === 'DateRange') {
                this.initRangeVals(item.key, item.default || ['', ''], defaultValues);
            }
            else {
                defaultValues[item.key] = item.default != null ? item.default : null;
            }
        });
        return defaultValues;
    }
    onCancel() {
        this.refForm.current.resetFields();
        this.props.onClose();
    }
    render() {
        const { width, title, columns, visible, onClose } = this.props;
        const fields = columns.filter(i => i.search && (i.search.mode === 2 || i.search.mode === 3));
        return (React.createElement(Drawer, { forceRender: true, className: styles.drawersearch, width: width || 900, title: title || '高级搜索', placement: "right", visible: visible, footer: React.createElement("div", { className: styles['drawersearch-footer'] },
                React.createElement(Button, { type: "dashed", onClick: () => this.onClear() }, "\u6E05\u7A7A"),
                React.createElement(Button, { onClick: () => this.onCancel() }, "\u53D6\u6D88"),
                React.createElement(Button, { onClick: () => this.onConfirm(), type: "primary" }, "\u786E\u5B9A")), onClose: () => onClose() },
            React.createElement("div", { className: styles['drawersearch-content'] },
                React.createElement(DynamicForm, { ref: this.refForm, showLabel: true, fields: fields, onChange: (key, value, type) => this.onValueChange(key, value, type) }))));
    }
}
export { BlGridTableSearch, DynamicForm };
//# sourceMappingURL=bl-gridtable-search.js.map