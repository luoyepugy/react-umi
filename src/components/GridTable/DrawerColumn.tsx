import React, { useState } from 'react';
import { Drawer, Button, Checkbox } from 'antd';
import { ReactSortable } from 'react-sortablejs';
import styles from './index.less';

interface DrawerColumnDatasProps {
  title: string;
  key: string;
  checked: number;
}

interface DrawerColumnProps {
  title?: string;
  visible: boolean;
  onClose: () => void;
  onSave: (datas: DrawerColumnDatasProps[]) => void;
  datas: DrawerColumnDatasProps[];
}

interface DrawerColumnContentProps {
  datas: DrawerColumnDatasProps[];
  onChange: (vals: any[]) => void;
}

const DrawerColumnContent = (props: DrawerColumnContentProps) => {
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

const DrawerColumn = React.memo((props: DrawerColumnProps) => {
  const { visible, title, onClose, datas, onSave } = props;
  let newDatas: DrawerColumnDatasProps[] = [];
  const onConfirm = () => {
    console.log(datas.filter(i => i.checked === 3).concat(newDatas));
    onClose();
    onSave(datas.filter(i => i.checked === 3).concat(newDatas));
  };
  const onChange = (vals: DrawerColumnDatasProps[]) => {
    newDatas = vals;
  };

  return (
    <Drawer
      className={styles.drawercolumn}
      title={title || '选择显示字段'}
      placement="right"
      closable={false}
      visible={visible}
      footer={
        <div className={styles['drawercolumn-footer']}>
          <Button onClick={() => onConfirm()} type="primary">
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
          onChange(vals);
        }}
      />
    </Drawer>
  );
});

export default DrawerColumn;
