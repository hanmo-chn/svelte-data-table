import * as utils from "../lib/Utils";
import TableRow from "./TableRow";
import TableOptions from "../lib/TableOptions";
import TableColumns from "./TableColumns";

export default class TableRowsPanel {

    #fixedColumnTable: HTMLElement;
    #dataTable: HTMLElement;
    #options: TableOptions;
    #tabCols: TableColumns;

    constructor(tabCols: TableColumns, options: TableOptions) {
        this.#tabCols = tabCols;
        this.#options = options;
    }

    /**
     * 构建左边的固定列的展示框
     */
    buildFixedColumnPanel():HTMLElement {
        let panel:HTMLElement = utils.createDivElement("tsui-adv-table-rows-panel");
        this.#fixedColumnTable = utils.createElement("table","tsui-fixed-rows-wrapper");
        panel.append(this.#fixedColumnTable);
        return panel;
    }

    /**
     *
     */
    buildDataTablePanel():HTMLElement {
        let panel: HTMLElement = utils.createDivElement("tsui-adv-table-rows-panel");
        this.#dataTable = utils.createElement("table", "tsui-adv-table");
        panel.append(this.#dataTable);
        panel.addEventListener("scroll", e=> {
            this.#fixedColumnTable.style.top = `-${panel.scrollTop}px`;  //同步两边的上下滚动
        });
        return panel;
    }

    /**
     * 设置横向滚动
     * @param offset
     */
    setOffsetX(offset:number):void {
        this.#dataTable.style.left = `-${offset}px`;
    }

    /**
     * 更新整个表格
     */
    showDataRows(rows: TableRow[]):void {
        this.#fixedColumnTable.innerHTML = '';
        this.#dataTable.innerHTML = '';
        rows.forEach((row, idx) => {
            this.#fixedColumnTable.append(row.createFixedRowElement(idx));
            this.#dataTable.append(row.createDataRowElement(idx, this.#tabCols.dataColumns));
        });
        if (this.#options.debug) {
            console.debug(`数据表格的宽度${this.#tabCols.width}px`);
        }
        this.#dataTable.style.width=`${this.#tabCols.width}px`;
    }

    setWidth(width: number) {
        if (this.#options.debug) {
            console.debug(`数据表格的宽度${width}px`);
        }
        this.#dataTable.style.width=`${width}px`;
    }
}