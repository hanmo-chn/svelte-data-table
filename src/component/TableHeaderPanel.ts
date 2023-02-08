import DataColumn from "../lib/DataColumn";
import TableOptions from "../lib/TableOptions";
import TableColumns, {ColumnSortHandler} from "./TableColumns";
import * as utils from "../lib/Utils";
import {OrderDirection} from "../lib/OrderDirection";
import {GroupSelectHandler} from "../lib/EventHandler";
import ActionColumn from "../lib/ActionColumn";

export default class TableHeaderPanel {

    #tabCols: TableColumns;  //定义的列
    #options: TableOptions;
    #headerTableElement: HTMLElement;
    #orderColumn: HTMLElement;
    #columnSortHandler: ColumnSortHandler;
    #ckbox: HTMLInputElement;
    #selectionHandler: GroupSelectHandler;

    constructor(columns: TableColumns, options: TableOptions) {
        this.#tabCols = columns;
        this.#options = options;
    }

    /**
     *
     * @param handler
     */
    setSortHandler(handler: ColumnSortHandler):void {
        this.#columnSortHandler = handler;
    }

    /**
     * 生产表格头的html elements
     */
    buildHeaderTable():HTMLElement {
        let headerBarPanel = utils.createDivElement("tsui-adv-header-table-bar");
        let wrapperPanel = utils.createDivElement("tsui-adv-header-table-wrapper");
        headerBarPanel.append(wrapperPanel);
        let table:HTMLElement = utils.createElement("table", "tsui-adv-header-table");
        table.style.width = `${this.#tabCols.width}dx`;
        wrapperPanel.append(table);
        let header: HTMLElement = utils.createElement('thead');
        table.append(header);
        let firstRow:HTMLElement = utils.createElement("tr");
        firstRow.style.height = `${this.#options.headerRowHeight}px`;
        header.append(firstRow);
        let secondRow:HTMLElement = utils.createElement("tr");
        if (this.#tabCols.headerRowCount > 1) {
            secondRow.style.height = `${this.#options.headerRowHeight}px`;
            header.append(secondRow);
        }
        let colPos:number = 0;
        this.#tabCols.columns.forEach(col => {
            if ("columns" in col && col.columns) {
                firstRow.append(this.createTableCell(col.text,-1, false, 1, col.columns.length));
                col.columns.forEach(dataCol => {
                    secondRow.append(this.createTableCell(dataCol.text, colPos, dataCol.resizable, 1, 1, dataCol));
                    colPos++;
                });
            } else {
                let dataCol: DataColumn = col as DataColumn;
                firstRow.append(this.createTableCell(dataCol.text, colPos, dataCol.resizable, this.#tabCols.isSingle ? 1 : 2, 1, dataCol));
                colPos++;
            }
        });
        let actionColumn:ActionColumn = this.#options.actionColumn;
        if (actionColumn) {
            firstRow.append(this.createTableCell(actionColumn.label, colPos, false, this.#tabCols.headerRowCount, 1));
        }

        this.#headerTableElement = table;
        return headerBarPanel;
    }

    /**
     * 创建表格头的单元格
     * @param text
     * @param colIdx
     * @param resizable
     * @param rowspan
     * @param colspan
     * @param col
     * @private
     */
    private createTableCell(text: string, colIdx: number, resizable: boolean = false, rowspan:number = 1,
                            colspan:number = 1, col?:DataColumn ):HTMLElement {
        let css: string[] = ['header-cell'];
        if (colIdx > -1) {
            css.push(`col-${colIdx}`);
        }
        let cell:HTMLElement = utils.createElement("td", css);
        if (rowspan > 1) {//增加行合并
            cell.setAttribute("rowspan", rowspan.toString());
        } else {
            cell.style.height = `${this.#options.headerRowHeight}px`;
        }
        if (colspan > 1) {//增加列合并
            cell.setAttribute("colspan", colspan.toString());
        }
        let elLabel = utils.createSpanElement(text);
        if (col && col.sortable) {
            let sortEl: HTMLElement = utils.createDivElement("column-order");
            sortEl.append(utils.createSpanElement(""));
            cell.append(sortEl);
            sortEl.addEventListener("click", e=>{
                if (this.#orderColumn) {
                    this.#orderColumn.classList.remove('order-asc','order-desc');
                }
                this.#orderColumn = sortEl;
                if (this.#columnSortHandler(col)==OrderDirection.Ascending) {
                    this.#orderColumn.classList.add("order-asc");
                } else {
                    this.#orderColumn.classList.add("order-desc")
                }
            });
        }
        cell.append(elLabel);
        if (resizable) {
            let elResizer = utils.createDivElement("horizontal-resizer");
            cell.classList.add("resizable-cell")
            cell.append(elResizer);
            this.bindResizeListener(cell, elResizer, colIdx, col as DataColumn);
        }
        return cell;
    }

    /**
     * 绑定列宽调整
     * @param cellElement
     * @param elResizer
     * @param idx
     * @param col
     * @private
     */
    private bindResizeListener(cellElement: HTMLElement, elResizer: HTMLElement, idx: number, col: DataColumn) {
        let currColWidth = 0;
        let currWidth = 0;
        let mPos:number = 0;

        let mouseMoveHandler = (e: MouseEvent) => {
            let dx: number = e.clientX - mPos;
            let colWidth:number = currColWidth + dx;
            if (colWidth > col.width) {
                col.displayWidth = colWidth;
                this.#tabCols.setColumnWidth(idx, col);
                this.#tabCols.width = currWidth + dx;
            }
        }

        let mouseUpHandler = (e: MouseEvent) => {
            this.#headerTableElement.style.cursor = 'default';
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
            cellElement.classList.remove('resizing');
        }

        elResizer.addEventListener("mousedown", e=>{
            mPos = e.clientX;
            currColWidth = col.displayWidth;
            currWidth = this.#tabCols.width;
            this.#headerTableElement.style.cursor = 'col-resize';
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
            cellElement.classList.add('resizing');
        });
    }

    /**
     * 构建固定列的表头
     */
    buildFixedColumnPanel():HTMLElement {
        let headerElement: HTMLElement = utils.createDivElement("tsui-adv-table-header-panel");
        headerElement.style.height = `${this.#tabCols.getHeaderHeight()}px`;
        let wrapper: HTMLElement = utils.createDivElement();
        wrapper.style.width = '100%';
        wrapper.style.textAlign = 'center';
        headerElement.append(wrapper);
        let label:HTMLElement = utils.createSpanElement(this.#options.fixedColumnLabel);
        if (this.#options.multipleSelection) {
            let ckbox: HTMLInputElement = utils.createInputElement("checkbox");
            this.#ckbox = ckbox;
            wrapper.append(ckbox);
            ckbox.addEventListener('click', e => {
                if (this.#selectionHandler) {
                    this.#selectionHandler(ckbox.checked);
                }
            });
            label.style.marginLeft = '6px';
        }
        wrapper.append(label);
        return headerElement;
    }

    /**
     * 更改表头选择框的状态
     * @param value
     */
    setCheckBoxStatus(value: boolean = null): void {
        if (value == null) {
            this.#ckbox.indeterminate = true;
        } else {
            this.#ckbox.indeterminate = false;
            this.#ckbox.checked = value;
        }
    }

    /**
     *
     * @param offset
     */
    setOffsetX(offset: number):void {
        this.#headerTableElement.style.left = `-${offset}px`;
    }

    /**
     *
     * @param handler
     */
    setGroupSelectHandler(handler: GroupSelectHandler): void {
        this.#selectionHandler = handler;
    }

    /**
     *
     * @param value
     */
    setWidth(value: number): void {
        this.#headerTableElement.style.width = `${value}px`;
    }
}

