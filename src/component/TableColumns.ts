import CompositColumn from "../lib/CompositColumn";
import DataColumn from "../lib/DataColumn";
import TableOptions from "../lib/TableOptions";
import * as utils from "../lib/Utils";
import {OrderDirection} from "../lib/OrderDirection";
import {ResizeHandler} from "../lib/EventHandler";
import ActionColumn from "../lib/ActionColumn";

export type ColumnSortHandler = (column: DataColumn) => OrderDirection;

export default class TableColumns {

    /**
     * 定义的列
     */
    #columns: Array<DataColumn | CompositColumn>;
    #tableCols: Array<DataColumn>;
    #isSingle: boolean = true;
    #tabId: string;
    #options: TableOptions;
    #styleElement: HTMLStyleElement;   //用于调整表格各个列的宽度
    #colsStyle: string[];
    #width: number = 0;
    #resizeHandler: ResizeHandler;
    #extGap: number = 0;

    constructor(id: string, cols: Array<DataColumn | CompositColumn>, options:TableOptions, styleElement: HTMLStyleElement) {
        this.#tabId = id;
        this.#columns = cols;
        this.#options = options;
        this.#tableCols = this.buildTableColumns();
        this.#styleElement = styleElement;
        this.adjustColumnWidths(0);
    }

    get isSingle(): boolean {
        return this.#isSingle;
    }

    get headerRowCount(): number {
        return this.#isSingle ? 1 : 2;
    }

    /**
     * 获取当前的表格定义
     */
    get columns():Array<DataColumn | CompositColumn> {
        return this.#columns;
    }

    /**
     * 获取表格数据列定义
     */
    get dataColumns():Array<DataColumn> {
        return this.#tableCols;
    }

    /**
     *
     * @param handler
     */
    setResizeHandler(handler:ResizeHandler):void {
        this.#resizeHandler = handler;
    }


    /**
     * 获取当前表格的宽度
     */
    get width():number {
        return this.#width;
    }

    /**
     * 设定表格的宽度
     * @param value
     */
    set width(value: number) {
        if (this.#width != value) {
            this.#width = value;
            if (this.#resizeHandler) {
                this.#resizeHandler(value);
            }
        }
    }

    /*
    getDisplayWidth():number {
        let w = 0;
        this.dataColumns.forEach(col => {
            w += col.displayWidth;
        })
        if (this.#options.actionColumn) {
            w += this.#options.actionColumn.width;
        }
        return w;
    }*/

    /**
     * 构建表格时间的列
     * @private
     */
    private buildTableColumns(): Array<DataColumn> {
        let cols: Array<DataColumn> = [];
        this.#colsStyle = [];
        this.#width = 0;
        this.#extGap = 0;
        this.#columns.forEach(col => {
            if ("columns" in col && col.columns) {
                col.columns.forEach(dataCol => {
                    this.#extGap += dataCol.weight || 0;
                    cols.push(dataCol);
                });
                this.#isSingle = false;
            } else {
                this.#extGap += (col as DataColumn).weight || 0;
                cols.push(col as DataColumn);
            }
        });
        if (this.#options.actionColumn) {
            console.debug('Data table actions:', this.#options.actionColumn);
            this.#width += this.#options.actionColumn.width;
            this.processActionColumn(cols.length);
        }
        return cols;
    }


    /**
     *
     * @param idx
     * @private
     */
    private processActionColumn(idx: number): void {
        let col:ActionColumn = this.#options.actionColumn;
        this.#colsStyle[idx] = `#${this.#tabId} .col-${idx} {
                min-width: ${col.width}px;
                width: ${col.width}px;
                text-align: left;
            }`;
    }

    /**
     *
     * @param idx
     * @param col
     * @private
     */
    private createColumnStyle(idx: number, col: DataColumn) {
        return `#${this.#tabId} .col-${idx} {
                min-width: ${col.width}px;
                width: ${col.displayWidth}px;
                text-align: ${col.align};
            }`;
    }

    /**
     *
     * @private
     */
    private resetColumnsStyle():void {
        this.#styleElement.innerHTML = this.#colsStyle.join('\n');
    }

    /**
     *
     * @param idx
     * @param col
     */
    setColumnWidth(idx: number, col: DataColumn) {
        this.#colsStyle[idx] = this.createColumnStyle(idx, col);
        this.resetColumnsStyle();
    }

    /**
     *
     */
    getHeaderHeight() {
        return this.#options.headerRowHeight * this.headerRowCount;
    }

    /**
     * 调整表格的宽度
     * @param clientWidth
     */
    adjustTableWidth(clientWidth: number):void {
        this.adjustColumnWidths(clientWidth);
    }

    /**
     * 如果窗体宽度超过定义的宽度，自动扩充表格的宽度
     * @param panelWidth
     * @private
     */
    private adjustColumnWidths(panelWidth: number):void {
        let width:number = this.calculateTableWidth();
        if (this.#options.debug) {
            console.debug(`当前定义表格的宽度${width}px，窗体宽度${panelWidth}px，可填充插槽${this.#extGap}`)
        }
        if (width <= panelWidth) {
            let ext = (panelWidth - width - 10) / this.#extGap;
            width = 0;
            this.#tableCols.forEach((col, idx) => {
                col.displayWidth = col.width + (col.weight || 0) * ext;
                width += col.displayWidth;
                this.#colsStyle[idx] = this.createColumnStyle(idx, col);
            });
        } else {
            this.#tableCols.forEach((col, idx) => {
                col.displayWidth = col.width;
                this.#colsStyle[idx] = this.createColumnStyle(idx, col);
            });
        }
        this.resetColumnsStyle();
        if (this.#options.debug) {
            console.debug(`调整后的表格的宽度${width}px`)
        }
        this.width = width + (this.#options.actionColumn ? (this.#options.actionColumn.width || 0) : 0)
    }

    /**
     * 计算列定义的表格宽度
     * @private
     */
    private calculateTableWidth():number {
        let w = 0;
        this.dataColumns.forEach(col => {
            w += col.width;
        });
        if (this.#options.actionColumn) {
            w += this.#options.actionColumn.width;
        }
        return w;
    }
}