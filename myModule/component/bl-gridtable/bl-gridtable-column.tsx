import React, { useState } from 'react';
import { Drawer, Button, Checkbox } from 'antd';
import { ReactSortable } from 'react-sortablejs';
import styles from './bl-gridtable.less';


const DrawerColumnContent = (props) => {
  const { datas, onChange } = props;

  const [options, setOptions] = useState(
    datas
      .filter(i => i.checked !== 3)
      .map(item => {
        return {
          id: item.key,
          title: item.title,
          checked: item.checked,
        };
      }),
  );

  const onChangeChecked = (e, index: number) => {
    const newOptions = [...options];
    newOptions[index].checked = e.target.checked;
    onChange(newOptions);
  };

  return (
    <div className={styles['drawercolumn-content']}>
      {datas
        .filter(i => i.checked === 3)
        .map(item => (
          <Checkbox checked disabled key={item.key}>
            {item.title}
          </Checkbox>
        ))}
      <ReactSortable list={options} setList={setOptions}>
        {options.map((item, index) => (
          <Checkbox
            key={item.id}
            onChange={e => onChangeChecked(e, index)}
            defaultChecked={item.checked === 1}
          >
            {item.title}
          </Checkbox>
        ))}
      </ReactSortable>
    </div>
  );
};

class BlGridTableColumn extends React.PureComponent {
  
  newDatas: Array<any> = [];

  onConfirm = () => {
    const {datas} = this.props;
    this.props.onClose();
    this.props.onSave(datas.filter(i => i.checked === 3).concat(this.newDatas));
  };

  onChange = (vals: DrawerColumnDatasProps[]) => {
    this.newDatas = vals;
  };

  render() {
    const { visible, title, onClose, datas, onSave } = this.props;
    return (
      <Drawer
        className={styles.drawercolumn}
        title={title || '选择显示字段'}
        placement="right"
        closable={false}
        visible={visible}
        footer={
          <div className={styles['drawercolumn-footer']}>
            <Button onClick={() => this.onConfirm()} type="primary">
              确定
            </Button>
            <Button onClick={() => onClose()}>取消</Button>
          </div>
        }
        onClose={() => onClose()}
      >
        <DrawerColumnContent
          datas={datas}
          onChange={vals => {
            this.onChange(vals);
          }}
        />
      </Drawer>
    );
  }
  
});

export {BlGridTableColumn} ;
