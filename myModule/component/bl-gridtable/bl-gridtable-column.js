import React, { useState } from 'react';
import { Drawer, Button, Checkbox } from 'antd';
import { ReactSortable } from 'react-sortablejs';
import styles from './bl-gridtable.less';
const DrawerColumnContent = (props) => {
    const { datas, onChange } = props;
    const [options, setOptions] = useState(datas
        .filter(i => i.checked !== 3)
        .map(item => {
        return {
            id: item.key,
            title: item.title,
            checked: item.checked,
        };
    }));
    const onChangeChecked = (e, index) => {
        const newOptions = [...options];
        newOptions[index].checked = e.target.checked;
        onChange(newOptions);
    };
    return (React.createElement("div", { className: styles['drawercolumn-content'] },
        datas
            .filter(i => i.checked === 3)
            .map(item => (React.createElement(Checkbox, { checked: true, disabled: true, key: item.key }, item.title))),
        React.createElement(ReactSortable, { list: options, setList: setOptions }, options.map((item, index) => (React.createElement(Checkbox, { key: item.id, onChange: e => onChangeChecked(e, index), defaultChecked: item.checked === 1 }, item.title))))));
};
class BlGridTableColumn extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.newDatas = [];
        this.onConfirm = () => {
            const { datas } = this.props;
            this.props.onClose();
            this.props.onSave(datas.filter(i => i.checked === 3).concat(this.newDatas));
        };
        this.onChange = (vals) => {
            this.newDatas = vals;
        };
    }
    render() {
        const { visible, title, onClose, datas, onSave } = this.props;
        return (React.createElement(Drawer, { className: styles.drawercolumn, title: title || '选择显示字段', placement: "right", closable: false, visible: visible, footer: React.createElement("div", { className: styles['drawercolumn-footer'] },
                React.createElement(Button, { onClick: () => this.onConfirm(), type: "primary" }, "\u786E\u5B9A"),
                React.createElement(Button, { onClick: () => onClose() }, "\u53D6\u6D88")), onClose: () => onClose() },
            React.createElement(DrawerColumnContent, { datas: datas, onChange: vals => {
                    this.onChange(vals);
                } })));
    }
}
;
export { BlGridTableColumn };
//# sourceMappingURL=bl-gridtable-column.js.map