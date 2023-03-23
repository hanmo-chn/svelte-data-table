import type DataColumn from "./DataColumn";
import type CompositeColumn from "./CompositeColumn";
import type TableColumn from "./TableColumn";
import {compareObject} from "./CompareFunction";
import '@ticatec/enhanced-utils'


const toTableColumn = (column: DataColumn): TableColumn => {
    return {
        text: column.text,
        align: column.align || 'left',
        width: column.width,
        actualWidth: column.width,
        fitWidth: column.width,
        field: column.field,
        visible: true,
        resizable: column.resizable == true,
        compareFunction: column.sortable ? (column.compareFunction || compareObject) : null,
        href: column.href == null ? null :  column.href,
        orderDirection: null,
        formatter: column.formatter ?? ((value) => value || ''),
        escapeHTML: column.escapeHTML == true,
        weight: column.weight || 0,
        hint: column.hint
    }
}

export default class DataTable {

    #columns: Array<TableColumn>;
    #headerRowsCount: number;
    #width: number = 0;
    readonly #id: string;
    #viewWidth: number;
    #onChange: any;

    constructor(id: string, columns: Array<DataColumn | CompositeColumn>, viewWidth: number, onChange: any) {
        this.#id = id;
        this.#columns = [];
        this.#headerRowsCount = 1;
        this.#width = 0;
        this.#viewWidth = viewWidth;
        columns.forEach(column => {
            if ("columns" in column) { //这是一个复合列
                this.#headerRowsCount  = 2;
            } else {
                let tabCol = toTableColumn(column);
                this.#columns.push(tabCol);
            }
        });
        this.adjustColumnsWidth();
        this.#onChange = onChange;
    }

    setViewWidth(viewWidth: number): void {
        this.#viewWidth = viewWidth;
        if (this.#viewWidth > this.#width) {
            this.adjustColumnsWidth();
        }
    }

    buildCssStyles = (): string => {
        let styles = '';
        this.#columns.forEach((col, idx) => {
            styles += `#${this.#id} .col-${idx} { width: ${col.actualWidth}px; text-align: ${col.align} }\n`
        })
        return `<style>\n ${styles} \n</style>`;
    }

    get columns():Array<TableColumn> {
        return [...this.#columns];
    }

    get width(): number {
        return this.#width;
    }

    adjustTableWidth():void {
        this.#width = this.recalculateActualTableWidth();
    }

    adjustColumnWidth(column: TableColumn, offsetWidth: number):void {
        if (this.#width + offsetWidth > this.#viewWidth) {
            this.#width += offsetWidth;
            column.actualWidth += offsetWidth;
            this.#onChange(offsetWidth > 0);
        }
    }

    /**
     * 重新计算表格实际的宽度
     * @private
     */
    private recalculateActualTableWidth(): number {
        let width:number = 0;
        this.#columns.forEach(col => {
            width += col.visible ? col.actualWidth : 0;
        })
        return width;
    }


    private adjustColumnsWidth() {
        this.#width = this.recalculateActualTableWidth();
        if (this.#width < this.#viewWidth) {
            let shortage: number = this.#viewWidth - this.#width;
            this.#width = this.#viewWidth;
            if (shortage > 0) {
                let totalWeight = 0;
                this.#columns.forEach(col => {
                    if (col.weight > 0 && col.visible) {
                        totalWeight += col.weight;
                    }
                });
                if (totalWeight > 0) {
                    let pws: number = shortage / totalWeight;
                    this.#columns.forEach(col => {
                        col.actualWidth += pws * col.weight;
                    })
                }
            }
            this.#onChange();
        }
    }
}