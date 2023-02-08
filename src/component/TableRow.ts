
import * as utils from "../lib/Utils";
import TableOptions from "../lib/TableOptions";
import DataColumn from "../lib/DataColumn";
import PopupPanel from "./PopupPanel";
import {OnRowDblClick} from "../lib/EventHandler";

/**
 *
 */
export type RowSelectionHandler = (row: TableRow, selected: boolean) => void;


export default class TableRow {

    #options: TableOptions;
    #onRowSelected: RowSelectionHandler
    #ckbox: HTMLInputElement;
    #data: any;
    #selected: boolean;
    #dblClickEventHandler: OnRowDblClick
    #popupover: PopupPanel;

    constructor(data: any,  options: TableOptions, popupover: PopupPanel, onRowSelected: RowSelectionHandler,
                dblClickEventHandler: OnRowDblClick) {
        this.#data = data;
        this.#options = options;
        this.#onRowSelected = onRowSelected;
        this.#dblClickEventHandler = dblClickEventHandler;
        this.#selected = false;
        this.#popupover = popupover;
    }

    /**
     *
     */
    get selected():boolean {
        return this.#selected;
    }

    /**
     *
     * @param value
     */
    set selected(value: boolean) {
        this.#selected = value;
        if (this.#ckbox) {
            this.#ckbox.checked = value;
        }
        this.setCheckBoxVisiblity();
    }

    /**
     *
     */
    get data(): any {
        return this.#data;
    }

    /**
     * 创建左边的固定列对应的行
     * @param idx
     */
    createFixedRowElement(idx: number):HTMLElement {
        let element = utils.createElement("tr",'tsui-data-row');
        element.style.height=`${this.#options.rowHeight}px`;
        let wrapper = utils.createElement("td", "tsui-data-cell");
        element.append(wrapper);
        let cellElement = utils.createDivElement("tsui-fixed-cell");
        wrapper.append(cellElement);
        let ckBox = utils.createInputElement('checkbox');
        cellElement.append(ckBox);
        ckBox.checked = this.#selected;
        ckBox.addEventListener('click', e=> {
            if (!this.#options.multipleSelection && this.#selected) {
                if (this.#options.debug) {
                    console.debug('单选状态重复选择当前已经选中的行')
                }
                e.stopPropagation();
                e.preventDefault();
                return false
            }
            this.#selected = ckBox.checked;
            this.#onRowSelected(this, ckBox.checked);
        });
        cellElement.append(utils.createSpanElement((idx + 1).toString(10)));
        this.#ckbox = ckBox;
        this.setCheckBoxVisiblity()
        return element;
    }

    /**
     *
     * @param rowIdx
     * @param columns
     */
    createDataRowElement(rowIdx: number, columns: Array<DataColumn>): HTMLElement {
        let css: string[] = ["table-data-row"];
        if (rowIdx % 2 == 1) {
            css.push("alternative-row");
        }
        let rowElement: HTMLElement = utils.createElement("tr", css);
        rowElement.style.height = `${this.#options.rowHeight}px`;
        rowElement.addEventListener("mousedown", e=>{
            rowElement.classList.add("active");
        });
        rowElement.addEventListener("mouseup", e=> {
            rowElement.classList.remove("active");
        });
        rowElement.addEventListener("click", e=>{
            if (this.#options.multipleSelection) {
                if (this.#options.debug) {
                    console.debug('Handle mouse click event on multiple rows selection environment.');
                }
                this.#selected = !this.#selected;
                this.#ckbox.checked = this.#selected;
                this.#onRowSelected(this, this.#selected);
            } else {
                if (this.#options.debug) {
                    console.debug('Handle mouse click event on single row selection environment.');
                }
                if (this.#selected == false) {
                    this.#selected = true;
                    this.#ckbox.checked = this.#selected;
                    this.setCheckBoxVisiblity();
                    this.#onRowSelected(this, this.#selected);
                }
            }
        });
        rowElement.addEventListener("dblclick", e=> {
            this.#dblClickEventHandler(this.#data);
        });
        columns.forEach((col, idx)=> {
            rowElement.append(this.createDataCell(col, idx));
        });
        if (this.#options.actionColumn) {
            rowElement.append(this.createActionCellElement(columns.length));
        }
        return rowElement;
    }

    /**
     *
     * @param idx
     */
    createActionCellElement(idx: number): HTMLElement {
        let cell = utils.createElement("td",["tsui-table-cell", `col-${idx}`]);
        let actions = this.#options.actionColumn.actions(this.#data);
        if (actions && actions.length) {
            let numOfDisplayButtons = actions.length;
            if (actions.length > this.#options.actionColumn.numOfVacancy) {
                numOfDisplayButtons = this.#options.actionColumn.numOfVacancy;
            }
            let barElement: HTMLElement = utils.createDivElement("action-bar");
            cell.append(barElement);
            for (let i=0; i<numOfDisplayButtons; i++) {
                //append action bar
                let actionBtn: HTMLElement = utils.createDivElement( 'action-button');
                actionBtn.innerText = actions[i].label;
                barElement.append(actionBtn);
                actionBtn.addEventListener("mousedown", e=>{
                    e.stopPropagation();
                });
                actionBtn.addEventListener("click", e=>{
                    e.stopPropagation();
                    actions[i].callback(this.#data);
                });
            }
            if (numOfDisplayButtons < actions.length) {
                let actionBtn: HTMLElement = utils.createDivElement( ['action-button', 'more-action']);
                actionBtn.innerText = '...';
                barElement.append(actionBtn);
                actionBtn.addEventListener("mousedown", e=>{
                    e.stopPropagation();
                });
                actionBtn.addEventListener("click", e=>{
                    e.stopPropagation();
                    this.#popupover.appendTo(cell);
                    let popupPanel = this.#popupover.element;
                    popupPanel.innerHTML = '';
                    //TODO popup menu
                    for (let i=numOfDisplayButtons; i<actions.length; i++) {
                        let actionBtn: HTMLElement = utils.createDivElement( 'action-item');
                        actionBtn.append(utils.createSpanElement(actions[i].label));
                        popupPanel.append(actionBtn);
                        actionBtn.addEventListener("click", e=>{
                            e.stopPropagation();
                            actions[i].callback(this.#data);
                            this.#popupover.close();
                        });
                    }
                    this.#popupover.adjustLocation(cell.getBoundingClientRect());
                });
            }
        }
        return cell;
    }

    /**
     * 根据列的预定义创建当前的单元格
     * @param col
     * @param idx
     * @private
     */
    private createDataCell(col: DataColumn, idx: number):HTMLElement {
        let value = col.field ? this.#data[col.field] : this.#data;
        let text = col.formatter ? col.formatter(value) : value;
        let cell:HTMLElement = utils.createElement("td",["tsui-table-cell", `col-${idx}`]);
        if (col.formatter && col.escapeHTML) {
            cell.innerHTML = text;
        } else {
            let span:HTMLElement = utils.createSpanElement(text);
            cell.append(span);
        }
        return cell;
    }

    private setCheckBoxVisiblity() {
        if (!this.#options.multipleSelection && !this.selected) {
            this.#ckbox.style.display = 'none';
        } else {
            this.#ckbox.style.display = 'initial';
        }
    }
}