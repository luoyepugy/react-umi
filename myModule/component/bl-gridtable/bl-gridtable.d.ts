import React from 'react';
declare class BlGridTable extends React.Component {
    /**
     * 表格列配置
     * key: 字段名; title: 标题名称;
     */
    columns: Array<{
        key: string;
        title: any;
        [props: string]: any;
    }>;
    /**
     * 表格是否显示复选框列,默认值 true
     */
    checkable: boolean;
    /**
     * 表格是否显示操作列,默认值 true
     */
    operable: boolean;
    /**
     * 距离页面顶部的距离,默认值 170
     */
    distanceTop: number;
    /**
     * 表格列表api
     */
    apiList: any;
    actionColumnBtns: Array<any>;
    operatebarBtns: Array<any>;
    showAdvancedSearch: boolean;
    showExportBtn: boolean;
    /**
     * 状态数据
     */
    state: any;
    /**
     * 获取表格数据方法时，使用的查询参数对象
     */
    private queryParams;
    /**
     * 原始列数据
     */
    private originColumns;
    handleHiddenColumn(): void;
    /**
     * 页面加载时运行的方法
     */
    componentDidMount(): void;
    /**
     * 分页当前页数/每页显示条数改变时
     * @param pageNumber 当前页数索引值,默认值 1
     * @param pageSize 每页显示条数,默认值 20
     */
    private onPageChange;
    /**
     * 获取默认查询参数
     * @param params
     */
    getDefaultQueryParams(): void;
    /**
     * 获取表格数据方法
     * @param params 接口参数对象,默认值 {pageNumber: 20, pageSize: 1}
     */
    getTableDatas: (params?: object | undefined) => Promise<void>;
    /**
     * 获取操作列菜单列表
     * @param rows 当前行数据
     * @param rowIndex 当前行索引
     */
    private getActionColumnMenus;
    /**
     * 渲染表格的操作列
     */
    private renderActionColumn;
    /**
     * 保存列排序数据
     */
    onSaveDrawerColumn: (vals: any[]) => void;
    /**
     * 搜索相关字段值改变时的方法
     */
    onSearchChange(key: any, value: any, type: any): void;
    renderToolbarBtn(): JSX.Element;
    renderToolbarBtns(): JSX.Element;
    renderExportBtn(): JSX.Element;
    /**
     * 渲染表格默认工具条(表格未选中行时显示的工具条)
     */
    private renderToolbar;
    /**
     * 渲染表格操作条(当至少有一行被选中时显示的工具条)
     */
    private renderOperatebar;
    /**
     * 渲染表格高级搜索工具条(点击高级搜索弹窗确认按钮时显示的工具条)
     */
    private renderAdvancedSearchbar;
    /**
     * 渲染表格
     */
    private renderTable;
    /**
     * 渲染分页
     */
    private renderPagination;
    /**
     * 渲染工具条
     */
    renderToolbars(): JSX.Element;
    /**
     * 渲染页面方法
     */
    render(): JSX.Element;
}
export { BlGridTable };
