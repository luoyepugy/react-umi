import React from 'react';
import { Table, Pagination, Dropdown, Menu, Button, } from 'antd';
import { EllipsisOutlined, SlidersOutlined, CloseOutlined } from '@ant-design/icons';
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
    constructor() {
        super(...arguments);
        /**
         * 表格列配置
         * key: 字段名; title: 标题名称;
         */
        this.columns = [];
        /**
         * 表格是否显示复选框列,默认值 true
         */
        this.checkable = true;
        /**
         * 表格是否显示操作列,默认值 true
         */
        this.operable = true;
        /**
         * 距离页面顶部的距离,默认值 170
         */
        this.distanceTop = 170;
        /**
         * 表格列表api
         */
        this.apiList = null;
        this.actionColumnBtns = [];
        this.operatebarBtns = [];
        this.showAdvancedSearch = false;
        this.showExportBtn = true;
        /**
         * 状态数据
         */
        this.state = {
            selectedRowKeys: [],
            datas: [],
            pagination: {
                // 分页数据
                pageSize: 20,
                pageNumber: 1,
                total: 0,
            },
            showDrawerSearch: false,
            showDrawerColumn: false,
            isAdvancedSearching: false,
        };
        /**
         * 获取表格数据方法时，使用的查询参数对象
         */
        this.queryParams = {
            pageNumber: this.state.pagination.pageNumber,
            pageSize: this.state.pagination.pageSize,
            keyWord: '',
        };
        /**
         * 原始列数据
         */
        this.originColumns = [];
        /**
         * 获取表格数据方法
         * @param params 接口参数对象,默认值 {pageNumber: 20, pageSize: 1}
         */
        this.getTableDatas = async (params) => {
            // console.log(params);
            this.queryParams = params ? { ...this.queryParams, ...params } : this.queryParams;
            console.log(this.queryParams);
            const { code, data: { total, rows }, } = await this.apiList(this.queryParams);
            if (code === 0) {
                this.setState({ datas: rows ? rows : [], pagination: { ...this.state.pagination, total } });
            }
        };
        /**
         * 保存列排序数据
         */
        this.onSaveDrawerColumn = (vals) => {
            console.log(vals);
        };
    }
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
    onPageChange(pageNumber, pageSize) {
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
                }
                else {
                    this.queryParams[item.key] =
                        item.search.default !== undefined ? item.search.default : null;
                }
            }
        });
    }
    /**
     * 获取操作列菜单列表
     * @param rows 当前行数据
     * @param rowIndex 当前行索引
     */
    getActionColumnMenus(rows, rowIndex) {
        return (React.createElement(Menu, null, this.actionColumnBtns.map(item => {
            return rows.operateAuth.includes(item.id) ? (React.createElement(Menu.Item, { key: item.id, onClick: () => item.onClick(rows, rowIndex) },
                React.createElement(IconFont, { type: item.icon }),
                item.name)) : null;
        })));
    }
    /**
     * 渲染表格的操作列
     */
    renderActionColumn() {
        return [
            {
                title: () => {
                    return this.operable ? (React.createElement(SlidersOutlined, { className: "c-color-hover", onClick: () => {
                            this.setState({ showDrawerColumn: true });
                        } })) : ('');
                },
                fixed: 'right',
                width: 50,
                dataIndex: 'action',
                key: 'action',
                render: (text, record, index) => {
                    return (React.createElement(Dropdown, { overlay: this.getActionColumnMenus(record, index), placement: "bottomRight" },
                        React.createElement(EllipsisOutlined, null)));
                },
            },
        ];
    }
    /**
     * 搜索相关字段值改变时的方法
     */
    onSearchChange(key, value, type) {
        if (type === 'DateRange') {
            const [startDate, endDate] = key;
            const [startDateVal, endDateVal] = value;
            this.getTableDatas({ [startDate]: startDateVal, [endDate]: endDateVal });
        }
        else {
            this.getTableDatas({ [key]: value });
        }
    }
    renderToolbarBtn() {
        return (React.createElement(Button, { type: "primary", className: styles['toolbar-btn'] }, "\u65B0\u589E"));
    }
    renderToolbarBtns() {
        return (React.createElement("div", { className: styles['toolbar-btns'] },
            this.showExportBtn ? this.renderExportBtn() : null,
            this.renderToolbarBtn()));
    }
    renderExportBtn() {
        return React.createElement(Button, { className: styles['toolbar-btn'] }, "\u5BFC\u51FA");
    }
    /**
     * 渲染表格默认工具条(表格未选中行时显示的工具条)
     */
    renderToolbar() {
        return (React.createElement(React.Fragment, null,
            React.createElement(BlGridTableToolbar, { columns: this.columns, showAdvancedSearch: this.showAdvancedSearch, openDrawerSearch: () => {
                    this.setState({ showDrawerSearch: true, isAdvancedSearching: true });
                }, onValueChange: (key, value, type) => this.onSearchChange(key, value, type) }),
            this.renderToolbarBtns()));
    }
    /**
     * 渲染表格操作条(当至少有一行被选中时显示的工具条)
     */
    renderOperatebar() {
        const { selectedRows, selectedRowKeys } = this.state;
        return (React.createElement("section", { className: styles.operatebar },
            React.createElement(CloseOutlined, { onClick: () => this.setState({ selectedRowKeys: [] }) }),
            React.createElement("div", { className: styles['operatebar-text'] },
                "\u5DF2\u9009\u62E9",
                React.createElement("span", null, selectedRows.length),
                "\u9879"),
            React.createElement("div", { className: styles['operatebar-btns'] }, this.operatebarBtns.map(item => {
                return (React.createElement("span", { key: item.id, onClick: () => item.onClick(selectedRowKeys, selectedRows) },
                    React.createElement(IconFont, { type: item.icon }),
                    item.name));
            }))));
    }
    /**
     * 渲染表格高级搜索工具条(点击高级搜索弹窗确认按钮时显示的工具条)
     */
    renderAdvancedSearchbar() {
        return (React.createElement("section", { className: `${styles.searchbar} ${styles.operatebar}` },
            React.createElement("div", { className: styles['operatebar-text'] }, "\u641C\u7D22\u7ED3\u679C"),
            React.createElement("div", { className: styles['operatebar-btns'] },
                React.createElement("span", { onClick: () => {
                        this.setState({ isAdvancedSearching: false });
                        this.getTableDatas({ ...this.queryParams, ...{ pageSize: 20, pageNumber: 1 } });
                    } },
                    React.createElement(IconFont, { type: "icon-clear-search" }),
                    "\u6E05\u9664\u641C\u7D22"),
                React.createElement("span", { onClick: () => this.setState({ showDrawerSearch: true }) },
                    React.createElement(IconFont, { type: "icon-go-search" }),
                    "\u7EE7\u7EED\u641C\u7D22")),
            this.renderToolbarBtns()));
    }
    /**
     * 渲染表格
     */
    renderTable() {
        const { selectedRowKeys, datas } = this.state;
        const newColumns = this.columns.concat(this.renderActionColumn());
        return (React.createElement(Table, { pagination: false, columns: newColumns, dataSource: datas, rowKey: rows => rows.id, scroll: { y: `calc(100vh - ${this.distanceTop}px)` }, rowSelection: this.checkable
                ? {
                    fixed: true,
                    columnWidth: 50,
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: (keys, rows) => {
                        this.setState({ selectedRowKeys: keys, selectedRows: rows });
                    },
                }
                : undefined }));
    }
    /**
     * 渲染分页
     */
    renderPagination() {
        const { total, pageSize, pageNumber } = this.state.pagination;
        return (React.createElement(Pagination, { total: total, pageSize: pageSize, current: pageNumber, pageSizeOptions: ['20', '50', '100'], showQuickJumper: true, showSizeChanger: true, responsive: true, defaultPageSize: 20, showTotal: t => `共 ${t} 条`, onChange: (page, size) => this.onPageChange(page, size), onShowSizeChange: (current, size) => this.onPageChange(current, size) }));
    }
    /**
     * 渲染工具条
     */
    renderToolbars() {
        const { selectedRowKeys, isAdvancedSearching } = this.state;
        return (React.createElement(React.Fragment, null, selectedRowKeys.length > 0
            ? this.renderOperatebar()
            : isAdvancedSearching
                ? this.renderAdvancedSearchbar()
                : this.renderToolbar()));
    }
    /**
     * 渲染页面方法
     */
    render() {
        const { datas, showDrawerSearch, isAdvancedSearching, showDrawerColumn } = this.state;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: `${styles['gridtable']} ${datas.length === 0 ? styles['nodata'] : ''}` },
                this.renderToolbars(),
                this.renderTable(),
                this.renderPagination()),
            isAdvancedSearching ? (React.createElement(BlGridTableSearch, { columns: this.originColumns, visible: showDrawerSearch, onClose: () => {
                    this.setState({ showDrawerSearch: false });
                }, onSave: vals => {
                    this.getTableDatas(vals);
                } })) : null,
            showDrawerColumn ? (React.createElement(BlGridTableColumn, { onClose: () => this.setState({ showDrawerColumn: false }), visible: showDrawerColumn, datas: this.columns, onSave: vals => this.onSaveDrawerColumn(vals) })) : null));
    }
}
export { BlGridTable };
//# sourceMappingURL=bl-gridtable.js.map