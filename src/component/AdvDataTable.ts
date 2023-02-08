import DataColumn from "../lib/DataColumn";
import CompositColumn from "../lib/CompositColumn";
import TableColumnsPanel from "./TableColumns";
import TableOptions from "../lib/TableOptions";
import * as utils from "../lib/Utils";
import consts from "../lib/Consts";
import TableRows from "./TableRows";
import {OrderDirection} from "../lib/OrderDirection";
import TableHeaderPanel from "./TableHeaderPanel";
import TableColumns from "./TableColumns";
import TableFooterPanel from "./TableFooterPanel";
import TableRowsPanel from "./TableRowsPanel";
import {OnRowDblClick, OnRowSelected, OnSelectionRowsChanged} from "../lib/EventHandler";
import {MatchFunction} from "../lib/MatchFunction";

export default class AdvDataTable {


    #id: string;
    #tableColumns: TableColumns;
    #options: TableOptions;
    #rows: TableRows;
    #dataTablePanel: TableRowsPanel; //放置数据表的节点
    #headerPanel: TableHeaderPanel;
    #footerPanel: TableFooterPanel;
    #resizeObserver: ResizeObserver;
    #onSelectionRowsChanged: OnSelectionRowsChanged;
    /**
     *
     * @param node
     * @param columns
     * @param options
     */
    constructor(node:Element, columns:Array<DataColumn | CompositColumn>, options: TableOptions) {
        this.#options = AdvDataTable.initializeTableOptions(options);
        if (this.#options.debug) {
            console.debug("构建高级数据表", node, columns, options);
        }
        this.#id = utils.generateTableId();
        let elStyle: HTMLStyleElement = document.createElement('style');
        this.#resizeObserver = new ResizeObserver((entries)=>{
            entries.forEach(entry => {
                if (entry.target.classList.contains('scroll-data-view-panel')) {
                    if (this.#options.debug) {
                        console.debug(`表格视窗大小发生变化，新宽度${entry.target.clientWidth}px`);
                    }
                    this.#tableColumns.adjustTableWidth(entry.target.clientWidth);
                }
            });
        });
        this.#tableColumns = new TableColumnsPanel(this.#id, columns, options, elStyle);
        this.#rows = new TableRows(this.#options);
        this.#headerPanel = new TableHeaderPanel(this.#tableColumns, options);
        this.#footerPanel = new TableFooterPanel(this.#tableColumns, options);
        this.#dataTablePanel = new TableRowsPanel(this.#tableColumns, options);
        this.#headerPanel.setGroupSelectHandler(selectAll => {
            if (this.#options.debug) {
                console.debug(selectAll ? "选择所有行" : "取消选择所有行")
            }
            if (this.#rows) {
                this.#rows.setGroupSelection(selectAll);
                if (this.#onSelectionRowsChanged) {
                    this.#onSelectionRowsChanged();
                }
            }
        });
        this.#tableColumns.setResizeHandler(width => {
            if (this.#options.debug) {
                console.debug(`调整表格宽度为${width}px`)
            }
            this.#headerPanel.setWidth(width);
            this.#dataTablePanel.setWidth(width);
            this.#footerPanel.setWidth(width);
        })
        this.buildTableElement(node, elStyle);
        this.#rows.setDataRefreshHandler(()=>{
            if (this.#options.debug) {
                console.debug(`刷新数据`)
            }
            this.#dataTablePanel.showDataRows(this.#rows.rowDataList);
        });
        this.#headerPanel.setSortHandler( col => {
            if (this.#options.debug) {
                console.debug(`设置排序字段${col.text}`);
            }
            return this.#rows.setOrderByField(col.field, col.compareFunction);
        });
        this.#rows.setOnSelectedRowsChanged(()=>{
            let selectionCount = this.#rows.countSelection();
            if (selectionCount == 0) {
                this.#headerPanel.setCheckBoxStatus(false);
            } else if (selectionCount == this.#rows.count()) {
                this.#headerPanel.setCheckBoxStatus(true);
            } else {
                this.#headerPanel.setCheckBoxStatus();
            }
            if (this.#onSelectionRowsChanged) {
                this.#onSelectionRowsChanged();
            }
        });
    }

    setSelectionList(list: any[], matchFun: MatchFunction): number {
        return this.#rows.setSelectedDataList(list, matchFun);
    }

    /**
     *
     * @param handler
     */
    setOnRowDblClick(handler: OnRowDblClick): void {
        this.#rows.setOnRowDblClick(handler);
    }

    /**
     *
     * @param handler
     */
    setOnRowSelected(handler: OnRowSelected): void {
        this.#rows.setOnRowSelected(handler)
    }

    /**
     *
     * @param handler
     */
    setOnSelectionRowsChanged(handler: OnSelectionRowsChanged): void {
        this.#onSelectionRowsChanged = handler;
    }


    /**
     * 初始化table options
     * @private
     */
    private static initializeTableOptions(options: TableOptions):TableOptions {
        options.fixedColumnLabel = options.fixedColumnLabel ?? consts.fixedColumnLabel;
        options.rowHeight = options.rowHeight ?? consts.rowHeight;
        options.fontSize = options.fontSize ?? '14px';
        options.headerRowHeight = options.headerRowHeight ?? consts.headerRowHeight;
        options.multipleSelection = options.multipleSelection ?? false; //默认单选
        options.orderDirection = options.orderDirection ?? OrderDirection.Ascending; //默认升序排列
        options.debug = options.debug ?? false;
        return options;
    }

    /**
     * 在当前的node中构建Advance Data Table
     * @param node
     * @param elStyle
     * @private
     */
    private buildTableElement(node: Element, elStyle: HTMLStyleElement): void {
        node.innerHTML = '';
        let elementTable = utils.createDivElement('tsui-adv-table-panel');
        elementTable.id = this.#id;
        elementTable.style.fontSize = this.#options.fontSize;
        elementTable.append(elStyle);
        elementTable.append(this.createFixedColumnPanel());
        elementTable.append(this.buildScrollDataTable());
        node.append(elementTable);
    }

    private buildScrollDataTable(): HTMLElement {
        let wrapper = utils.createDivElement("scroll-data-view-panel-wrapper");
        let dataPanel:HTMLElement = utils.createDivElement("scroll-data-view-panel");
        wrapper.append(dataPanel);
        //增加表头
        dataPanel.append(this.#headerPanel.buildHeaderTable());
        //增加数据区
        dataPanel.append(this.#dataTablePanel.buildDataTablePanel());
        //增加表底部
        dataPanel.append(this.#footerPanel.buildFooterPanel());
        this.#footerPanel.setScrollHandler(offset => {
            this.#headerPanel.setOffsetX(offset);
            this.#dataTablePanel.setOffsetX(offset);
        });
        this.#headerPanel.setWidth(this.#tableColumns.width);
        if (this.#options.debug) {
            console.debug(`表格头的宽度${this.#tableColumns.width}`);
        }
        this.#rows.setTablePanel(dataPanel);
        this.#resizeObserver.observe(dataPanel);
        return dataPanel;
    }


    /**
     *
     * @param value
     */
    setData(value:Array<any>):void {
        this.#rows.setDataList(value);
    }

    /**
     * 获取当前选中的数据
     */
    getSelectionList():Array<any> {
        return this.#rows.selectedDataList;
    }

    /**
     * 创建左边的固定列
     * @private
     */
    private createFixedColumnPanel(): HTMLElement {
        let fixedWrapper = utils.createDivElement("fixed-columns-panel-wrapper");
        let panel:HTMLElement = utils.createDivElement("fixed-columns-panel");
        fixedWrapper.append(panel);
        panel.append(this.#headerPanel.buildFixedColumnPanel());
        panel.append(this.#dataTablePanel.buildFixedColumnPanel());
        if (this.#options.footerColumns) {
            //TODO Add footer in the fixed colunmn panel
        }
        return fixedWrapper;
    }




}