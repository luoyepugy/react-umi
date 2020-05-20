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
import IconFont from '../../iconfont';
import styles from './bl-gridtable.less';
import { BlGridTableToolbar } from './bl-gridtable-toolbar';
import { BlGridTableSearch } from './bl-gridtable-search';
import { BlGridTableColumn } from './bl-gridtable-column';

// interface IBlGridTable {
//   columns: Array<any>;
//   apiList: Promise<any>;
//   checkable?: boolean;
//   distanceTop?: number;
// }

class BlGridTable extends React.Component {
  /**
   * 表格列配置
   * key: 字段名; title: 标题名称;
   */
  columns: Array<{ key: string; title: any; [props: string]: any }> = [];

  /**
   * 表格是否显示复选框列,默认值 true
   */
  checkable: boolean = true;

  /**
   * 表格是否显示操作列,默认值 true
   */
  operable: boolean = true;

  /**
   * 距离页面顶部的距离,默认值 170
   */
  distanceTop: number = 170;

  /**
   * 表格列表api
   */
  apiList: any = null;

  actionColumnBtns: Array<any> = [];

  operatebarBtns: Array<any> = [];

  showAdvancedSearch: boolean = false;

  showExportBtn: boolean = true;

  /**
   * 状态数据
   */
  state: any = {
    selectedRowKeys: [], // 当前选中的行keys
    datas: [], // 表格数据
    pagination: {
      // 分页数据
      pageSize: 20,
      pageNumber: 1,
      total: 0,
    },
    showDrawerSearch: false, // 是否显示高级搜索弹窗
    showDrawerColumn: false, // 是否显示排序列弹窗
    isAdvancedSearching: false, // 是否高级搜索中
  };

  /**
   * 获取表格数据方法时，使用的查询参数对象
   */
  private queryParams: any = {
    pageNumber: this.state.pagination.pageNumber,
    pageSize: this.state.pagination.pageSize,
    keyWord: '', // 关键字搜索字段
  };

  /**
   * 原始列数据
   */
  private originColumns: Array<any> = [];

  // constructor(props: any) {
  //   super(props);
  // }

  handleHiddenColumn() {
    this.originColumns = [...this.columns];
    this.columns = this.columns.filter(item => item.key !== ':hidden');
  }

  /**
   * 页面加载时运行的方法
   */
  componentDidMount() {
    this.handleHiddenColumn();
    this.getDefaultQueryParams();
    this.getTableDatas();
  }

  /**
   * 分页当前页数/每页显示条数改变时
   * @param pageNumber 当前页数索引值,默认值 1
   * @param pageSize 每页显示条数,默认值 20
   */
  private onPageChange(pageNumber: number, pageSize: number) {
    this.setState({ pagination: { ...this.state.pagination, pageNumber, pageSize } });
  }

  /**
   * 获取默认查询参数
   * @param params
   */
  getDefaultQueryParams() {
    this.columns.map(item => {
      if (item.search) {
        if (item.search.renderType === 'DateRange') {
          const [startDate, endDate] = item.names;
          const [startDateVal, endDateVal] = item.search.default ? item.search.default : ['', ''];
          this.queryParams[startDate] = startDateVal;
          this.queryParams[endDate] = endDateVal;
        } else {
          this.queryParams[item.key] =
            item.search.default !== undefined ? item.search.default : null;
        }
      }
    });
  }

  /**
   * 获取表格数据方法
   * @param params 接口参数对象,默认值 {pageNumber: 20, pageSize: 1}
   */
  getTableDatas = async (params?: object) => {
    // console.log(params);
    this.queryParams = params ? { ...this.queryParams, ...params } : this.queryParams;
    console.log(this.queryParams);
    const {
      code,
      data: { total, rows },
    } = await this.apiList(this.queryParams);
    if (code === 0) {
      this.setState({ datas: rows ? rows : [], pagination: { ...this.state.pagination, total } });
    }
  };

  /**
   * 获取操作列菜单列表
   * @param rows 当前行数据
   * @param rowIndex 当前行索引
   */
  private getActionColumnMenus(rows: any, rowIndex: number) {
    return (
      <Menu>
        {this.actionColumnBtns.map(item => {
          return rows.operateAuth.includes(item.id) ? (
            <Menu.Item key={item.id} onClick={() => item.onClick(rows, rowIndex)}>
              <IconFont type={item.icon} />
              {item.name}
            </Menu.Item>
          ) : null;
        })}
      </Menu>
    );
  }

  /**
   * 渲染表格的操作列
   */
  private renderActionColumn(): Array<any> {
    return [
      {
        title: () => {
          return this.operable ? (
            <SlidersOutlined
              className="c-color-hover"
              onClick={() => {
                this.setState({ showDrawerColumn: true });
              }}
            />
          ) : (
            ''
          );
        },
        fixed: 'right',
        width: 50,
        dataIndex: 'action',
        key: 'action',
        render: (text: string, record: object, index: number) => {
          return (
            <Dropdown overlay={this.getActionColumnMenus(record, index)} placement="bottomRight">
              <EllipsisOutlined />
            </Dropdown>
          );
        },
      },
    ];
  }

  /**
   * 保存列排序数据
   */
  onSaveDrawerColumn = (vals: any[]) => {
    console.log(vals);
  };

  /**
   * 搜索相关字段值改变时的方法
   */
  onSearchChange(key, value, type) {
    if (type === 'DateRange') {
      const [startDate, endDate] = key;
      const [startDateVal, endDateVal] = value;
      this.getTableDatas({ [startDate]: startDateVal, [endDate]: endDateVal });
    } else {
      this.getTableDatas({ [key]: value });
    }
  }

  renderToolbarBtn() {
    return (
      <Button type="primary" className={styles['toolbar-btn']}>
        新增
      </Button>
    );
  }

  renderToolbarBtns() {
    return (
      <div className={styles['toolbar-btns']}>
        {this.showExportBtn ? this.renderExportBtn() : null}
        {this.renderToolbarBtn()}
      </div>
    );
  }

  renderExportBtn() {
    return <Button className={styles['toolbar-btn']}>导出</Button>;
  }

  /**
   * 渲染表格默认工具条(表格未选中行时显示的工具条)
   */
  private renderToolbar(): JSX.Element {
    return (
      <>
        <BlGridTableToolbar
          columns={this.columns}
          showAdvancedSearch={this.showAdvancedSearch}
          openDrawerSearch={() => {
            this.setState({ showDrawerSearch: true, isAdvancedSearching: true });
          }}
          onValueChange={(key, value, type) => this.onSearchChange(key, value, type)}
        />
        {this.renderToolbarBtns()}
      </>
    );
  }

  /**
   * 渲染表格操作条(当至少有一行被选中时显示的工具条)
   */
  private renderOperatebar(): JSX.Element {
    const { selectedRows, selectedRowKeys } = this.state;
    return (
      <section className={styles.operatebar}>
        <CloseOutlined onClick={() => this.setState({ selectedRowKeys: [] })} />
        <div className={styles['operatebar-text']}>
          已选择<span>{selectedRows.length}</span>项
        </div>
        <div className={styles['operatebar-btns']}>
          {this.operatebarBtns.map(item => {
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
  }

  /**
   * 渲染表格高级搜索工具条(点击高级搜索弹窗确认按钮时显示的工具条)
   */
  private renderAdvancedSearchbar(): JSX.Element {
    return (
      <section className={`${styles.searchbar} ${styles.operatebar}`}>
        <div className={styles['operatebar-text']}>搜索结果</div>
        <div className={styles['operatebar-btns']}>
          <span
            onClick={() => {
              this.setState({ isAdvancedSearching: false });
              this.getTableDatas({ ...this.queryParams, ...{ pageSize: 20, pageNumber: 1 } });
            }}
          >
            <IconFont type="icon-clear-search" />
            清除搜索
          </span>
          <span onClick={() => this.setState({ showDrawerSearch: true })}>
            <IconFont type="icon-go-search" />
            继续搜索
          </span>
        </div>
        {this.renderToolbarBtns()}
      </section>
    );
  }

  /**
   * 渲染表格
   */
  private renderTable(): JSX.Element {
    const { selectedRowKeys, datas } = this.state;
    const newColumns = this.columns.concat(this.renderActionColumn());
    return (
      <Table
        pagination={false}
        columns={newColumns}
        dataSource={datas}
        rowKey={rows => rows.id}
        scroll={{ y: `calc(100vh - ${this.distanceTop}px)` }}
        rowSelection={
          this.checkable
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
    );
  }

  /**
   * 渲染分页
   */
  private renderPagination(): JSX.Element {
    const { total, pageSize, pageNumber } = this.state.pagination;
    return (
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
        onChange={(page, size) => this.onPageChange(page, size)}
        onShowSizeChange={(current, size) => this.onPageChange(current, size)}
      />
    );
  }

  /**
   * 渲染工具条
   */
  renderToolbars(): JSX.Element {
    const { selectedRowKeys, isAdvancedSearching } = this.state;
    return (
      <>
        {selectedRowKeys.length > 0
          ? this.renderOperatebar()
          : isAdvancedSearching
          ? this.renderAdvancedSearchbar()
          : this.renderToolbar()}
      </>
    );
  }

  /**
   * 渲染页面方法
   */
  render(): JSX.Element {
    const { datas, showDrawerSearch, isAdvancedSearching, showDrawerColumn } = this.state;
    return (
      <>
        <div className={`${styles['gridtable']} ${datas.length === 0 ? styles['nodata'] : ''}`}>
          {this.renderToolbars()}
          {this.renderTable()}
          {this.renderPagination()}
        </div>
        {isAdvancedSearching ? (
          <BlGridTableSearch
            columns={this.originColumns}
            visible={showDrawerSearch}
            onClose={() => {
              this.setState({ showDrawerSearch: false });
            }}
            onSave={vals => {
              this.getTableDatas(vals);
            }}
          />
        ) : null}
        {showDrawerColumn ? (
          <BlGridTableColumn
            onClose={() => this.setState({ showDrawerColumn: false })}
            visible={showDrawerColumn}
            datas={this.columns}
            onSave={vals => this.onSaveDrawerColumn(vals)}
          />
        ) : null}
      </>
    );
  }
}
export { BlGridTable };
