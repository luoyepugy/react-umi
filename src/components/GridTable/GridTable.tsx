import React from 'react';
import {
  Table,
  Pagination,
  Dropdown,
  Menu,
  Select,
  Input,
  Button,
  DatePicker,
  message,
} from 'antd';
import { EllipsisOutlined, SlidersOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import DrawerColumn from './DrawerColumn';
import DrawerSearch from './DrawerSearch';
import styles from './index.less';
import IconFont from '@/assets/iconfont/index';
import { DrawerSearchOptionProps } from './DrawerSearch';

interface GridTable {
  queryParams: object;
}

interface GridTableState {
  total: number;
  pageSize: number;
  pageNumber: number;
  selectedRows: Array<any>;
  selectedRowKeys: Array<React.Key>;
  datas: Array<any>;
  showDrawerColumn: boolean;
  showDrawerSearch: boolean;
  isSearching: boolean;
}
interface GridTableProps {
  columns: any;
  operable?: boolean;
  showDrawerSearch?: boolean;
  queryParams?: object;
  checkable?: boolean;
  operatebarBtns: Array<ButtonAuthProps>;
  toolbar: Array<ToolBarOptionProps>;
  advancedSearch: Array<DrawerSearchOptionProps>;
  listApi: any;
  rowBtns: Array<ButtonAuthProps>;
}

interface ButtonAuthProps extends IdNameProps {
  icon: string;
  onClick: (key: any, rows: any) => void;
}

export interface IdNameProps {
  id: number;
  name: string;
}

export interface OptionProps {
  title?: string;
  key: any;
  default?: any;
  options?: any;
  placeholder?: string;
}

export type ToolBarOptionType =
  | 'Select'
  | 'InputSearch'
  | 'DateRange'
  | 'Text'
  | 'Button'
  | 'ButtonPrimary';

export interface ToolBarOptionProps extends OptionProps {
  type: ToolBarOptionType;
  exportApi?: any;
  onClick?: () => void;
}

interface ToolBarProps {
  options: Array<ToolBarOptionProps>;
  onChange?: (key: string | number | undefined, value: any, type: ToolBarOptionType) => void;
  openDrawerSearch?: () => void;
  onExport?: (api: any) => void;
}

interface OperateBarProps {
  selectedRows: any;
  selectedRowKeys: Array<React.Key>;
  operatebarBtns: Array<ButtonAuthProps>;
  openToolBar: () => void;
}

interface SearchBarProps {
  toolbarOptions: Array<ToolBarOptionProps>;
  onContinue: () => void;
  onClear: () => void;
}

const ToolBar = (props: ToolBarProps) => {
  const { options, onChange, openDrawerSearch, onExport } = props;
  return (
    <section className={styles.toolbar}>
      {options.length > 0 &&
        options.map(item => {
          switch (item.type) {
            case 'Select':
              return (
                <Select
                  key={item.key}
                  defaultValue={item.default}
                  bordered={false}
                  onChange={value => onChange && onChange(item.key, value, 'Select')}
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
            case 'DateRange':
              return (
                <DatePicker.RangePicker
                  allowClear={false}
                  key={item.key}
                  defaultValue={[
                    moment(item.default[0], 'YYYY/MM/DD'),
                    moment(item.default[1], 'YYYY/MM/DD'),
                  ]}
                  onChange={(dates, dateString) =>
                    onChange && onChange(item.key, dateString, 'DateRange')
                  }
                />
              );
            case 'InputSearch':
              return (
                <Input.Search
                  key={item.key}
                  defaultValue={item.default}
                  placeholder={item.placeholder}
                  onSearch={value => onChange && onChange(item.key, value, 'InputSearch')}
                  enterButton
                />
              );
            case 'Text':
              return (
                <div
                  key={item.key}
                  onClick={
                    item.key === 'advancedSearch'
                      ? () => openDrawerSearch && openDrawerSearch()
                      : () => item.onClick && item.onClick()
                  }
                  className={`${styles['toolbar-advanced']} c-color-hover`}
                >
                  {item.key === 'advancedSearch' ? '高级搜索' : item.title}
                </div>
              );
            default:
              return (
                <Button
                  type={item.type === 'ButtonPrimary' ? 'primary' : undefined}
                  className={styles['toolbar-btn']}
                  key={item.key}
                  onClick={
                    item.key === 'export'
                      ? () => onExport && onExport(item.exportApi)
                      : () => item.onClick && item.onClick()
                  }
                >
                  {item.key === 'export' ? '导出' : item.title}
                </Button>
              );
          }
        })}
    </section>
  );
};

const OperateBar = (props: OperateBarProps) => {
  const { openToolBar, selectedRows, selectedRowKeys, operatebarBtns } = props;
  return (
    <section className={styles.operatebar}>
      <CloseOutlined onClick={() => openToolBar()} />
      <div className={styles['operatebar-text']}>
        已选择<span>{selectedRows.length}</span>项
      </div>
      <div className={styles['operatebar-btns']}>
        {operatebarBtns.map(item => {
          return (
            <span key={item.id} onClick={() => item.onClick(selectedRowKeys, selectedRows)}>
              <IconFont type={item.icon} />
              {item.name}
            </span>
          );
        })}
      </div>
    </section>
  );
};

const SearchBar = (props: SearchBarProps) => {
  const { toolbarOptions, onClear, onContinue } = props;
  return (
    <section className={`${styles.searchbar} ${styles.operatebar}`}>
      <div className={styles['operatebar-text']}>搜索结果</div>
      <div className={styles['operatebar-btns']}>
        <span onClick={() => onClear()}>
          <IconFont type="icon-clear-search" />
          清除搜索
        </span>
        <span onClick={() => onContinue()}>
          <IconFont type="icon-go-search" />
          继续搜索
        </span>
      </div>
      <ToolBar
        options={toolbarOptions.filter(
          item => item.type === 'Button' || item.type === 'ButtonPrimary',
        )}
      />
    </section>
  );
};

class GridTable extends React.Component<GridTableProps, GridTableState> {
  constructor(props: any) {
    super(props);

    this.queryParams = { ...props.queryParams, ...{ pageSize: 20, pageNumber: 1 } };

    this.state = {
      selectedRowKeys: [],
      selectedRows: [],
      datas: [],
      total: 0,
      pageSize: 20,
      pageNumber: 1,
      showDrawerColumn: false,
      showDrawerSearch: false,
      isSearching: false,
    };
  }

  componentDidMount() {
    this.getTableDatas();
  }

  onChangePagination(pageNumber: number, pageSize: number) {
    this.setState({ pageNumber, pageSize });
    this.getTableDatas({ pageNumber, pageSize });
  }

  getTableDatas = async (params?: object) => {
    console.log(params);
    if (params) {
      this.queryParams = { ...this.queryParams, ...params };
    }
    console.log(this.queryParams);

    const {
      code,
      data: { total, rows },
    } = await this.props.listApi(this.queryParams);
    if (code === 0) {
      this.setState({ datas: rows ? rows : [], total });
    }
  };

  getActionColumn = () => {
    const { rowBtns } = this.props;
    const ActionColumnMenus = (rows: any, rowIndex: number) => {
      return (
        <Menu>
          {rowBtns.map(item => {
            return rows.operateAuth.includes(item.id) ? (
              <Menu.Item key={item.id} onClick={() => item.onClick(rows, rowIndex)}>
                <IconFont type={item.icon} />
                {item.name}
              </Menu.Item>
            ) : null;
          })}
        </Menu>
      );
    };
    return [
      {
        title: () => {
          return (
            <SlidersOutlined
              className="c-color-hover"
              onClick={() => {
                this.setState({ showDrawerColumn: true });
              }}
            />
          );
        },
        fixed: 'right',
        width: 50,
        dataIndex: 'action',
        key: 'action',
        render: (text: string, record: object, index: number) => {
          return (
            <Dropdown overlay={ActionColumnMenus(record, index)} placement="bottomRight">
              <EllipsisOutlined />
            </Dropdown>
          );
        },
      },
    ];
  };

  onSaveDrawerColumn = (vals: any[]) => {
    console.log(vals);
  };

  onChangeToolBar = (key: any, value: any, type: ToolBarOptionType) => {
    if (type === 'DateRange') {
      const [startDate, endDate] = key;
      const [startDateVal, endDateVal] = value;
      this.getTableDatas({ [startDate]: startDateVal, [endDate]: endDateVal });
    } else {
      this.getTableDatas({ [key]: value });
    }
  };

  onExport = async (api: any) => {
    const { code } = await api(this.queryParams);
    if (code === 0) {
      message.success('导出成功');
    }
  };

  render() {
    const {
      total,
      pageSize,
      pageNumber,
      selectedRows,
      selectedRowKeys,
      datas,
      showDrawerColumn,
      showDrawerSearch,
      isSearching,
    } = this.state;
    const {
      checkable,
      operable,
      columns,
      operatebarBtns,
      toolbar,
      advancedSearch,
      queryParams,
    } = this.props;
    const newColumns = operable ? columns.concat(this.getActionColumn()) : columns;

    return (
      <div className={`${styles['gridtable']} ${datas.length === 0 ? styles['nodata'] : ''}`}>
        {selectedRows.length === 0 && !isSearching ? (
          <ToolBar
            options={toolbar}
            onChange={(key, value, type) => this.onChangeToolBar(key, value, type)}
            onExport={api => this.onExport(api)}
            openDrawerSearch={() => {
              this.setState({ showDrawerSearch: true });
            }}
          />
        ) : null}
        {checkable && selectedRows.length > 0 ? (
          <OperateBar
            openToolBar={() => this.setState({ selectedRows: [], selectedRowKeys: [] })}
            selectedRows={selectedRows}
            selectedRowKeys={selectedRows}
            operatebarBtns={operatebarBtns}
          />
        ) : null}
        {isSearching ? (
          <SearchBar
            toolbarOptions={toolbar}
            onContinue={() => this.setState({ showDrawerSearch: true })}
            onClear={() => {
              this.setState({ isSearching: false });
              this.getTableDatas({ ...queryParams, ...{ pageSize: 20, pageNumber: 1 } });
            }}
          />
        ) : null}
        <Table
          pagination={false}
          columns={newColumns}
          dataSource={datas}
          rowKey={rows => rows.id}
          scroll={{ y: `calc(100vh - 170px)` }}
          rowSelection={
            checkable
              ? {
                  fixed: true,
                  columnWidth: 50,
                  type: 'checkbox',
                  selectedRowKeys,
                  onChange: (keys, rows) => {
                    this.setState({ selectedRowKeys: keys, selectedRows: rows });
                  },
                }
              : undefined
          }
        />
        <Pagination
          total={total}
          pageSize={pageSize}
          current={pageNumber}
          pageSizeOptions={['20', '50', '100']}
          showQuickJumper
          showSizeChanger
          responsive
          defaultPageSize={20}
          showTotal={t => `共 ${t} 条`}
          onChange={(page, size) => this.onChangePagination(page, size)}
          onShowSizeChange={(current, size) => this.onChangePagination(current, size)}
        />
        {showDrawerColumn ? (
          <DrawerColumn
            onClose={() => this.setState({ showDrawerColumn: false })}
            visible={showDrawerColumn}
            datas={columns}
            onSave={vals => this.onSaveDrawerColumn(vals)}
          />
        ) : null}
        <DrawerSearch
          onClose={() => this.setState({ showDrawerSearch: false })}
          visible={showDrawerSearch}
          options={advancedSearch}
          onSave={vals => {
            this.setState({ isSearching: true });
            this.getTableDatas(vals);
          }}
        />
      </div>
    );
  }
}

export default GridTable;
