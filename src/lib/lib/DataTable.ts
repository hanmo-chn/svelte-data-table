import type DataColumn from "./DataColumn";
import type CompositeColumn from "./CompositeColumn";
import type TableColumn from "./TableColumn";
import {compareObject} from "./CompareFunction";
import {tableWidth} from "./TableWidth";


const toTableColumn = (column: DataColumn): TableColumn => {
    return {
        text: column.text,
        align: column.align || 'left',
        width: column.width,
        actualWidth: column.width,
        field: column.field,
        compareFunction: column.sortable ? (column.compareFunction || compareObject) : null,
        href: column.href == null ? null :  column.href,
        orderDirection: null,
        formatter: column.formatter ?? ((value) => value || ''),
        escapeHTML: column.escapeHTML == true,
        resizable: column.resizable == true,
        weight: column.weight || 0,
        manuallyResized: false,
        hint: column.hint
    }
}

export default class DataTable {

    #columns: Array<TableColumn>;
    #rows: number;
    #width: number = 0;
    #actualWidth: number = 0;

    constructor(columns: Array<DataColumn | CompositeColumn>) {
        this.#columns = [];
        this.#rows = 1;
        this.#width = 0;
        columns.forEach(column => {
            if ("columns" in column) { //这是一个复合列
                this.#rows  = 2;
            } else {
                this.#columns.push(toTableColumn(column));
                this.#width += column.width;
            }
        });
        console.log(this.#columns);
        this.#actualWidth = this.#width;
        tableWidth.set(this.#actualWidth);
    }

    setViewWidth(viewWidth: number): void {
        let shortage: number = this.#width < viewWidth ? this.#width - viewWidth : 0;
        if (shortage > 0) {
            this.recalculateActualTableWidth();
            let totalWeight = 0;
            this.#columns.forEach(col => {
                if (col.weight && col.weight > 0) {
                    totalWeight += col.weight;
                }
            });
            this.#columns.forEach(col => {
                if (col.weight && col.weight > 0) {

                }
            });
        }
    }

    toColStyles = (id:string): string => {
        let styles = '';
        this.#columns.forEach((col, idx) => {
            styles += `#${id} .col-${idx} { width: ${col.actualWidth}px; text-align: ${col.align} }\n`
        })
        return `<style>\n ${styles} \n</style>`;
    }

    get columns():Array<TableColumn> {
        return this.#columns;
    }

    private recalculateActualTableWidth(): void {
        this.#actualWidth = 0;
        this.#columns.forEach(column => {
            this.#actualWidth += column.actualWidth;
        });
    }



}