import {CompareFunction} from "../lib/CompareFunction";
import {MatchFunction} from "../lib/MatchFunction";
import * as utils from "../lib/Utils";
import TableRow from "./TableRow";
import TableOptions from "../lib/TableOptions";
import {OrderDirection} from "../lib/OrderDirection";
import {DataRefreshHandler, OnRowDblClick, OnRowSelected, OnSelectionRowsChanged} from "../lib/EventHandler";
import PopupPanel from "./PopupPanel";


export default class TableRows {

    #rows: Array<TableRow>;
    #selectedRow: TableRow;  //the selected row for single selection mode
    #singleSelection: boolean;  // is single selection mode or not
    #orderBy: string;  // current ordered field
    #isAsc: boolean;  // current is ascending or not
    #options: TableOptions;
    #refreshHandler: DataRefreshHandler;
    #popupover: PopupPanel;
    #onRowDblClick: OnRowDblClick;
    #onRowSelected: OnRowSelected;
    #onSelectionRowsChanged: OnSelectionRowsChanged

    /**
     *
     * @param options
     */
    constructor(options: TableOptions) {
        this.#rows = [];
        this.#options = options;
        this.#singleSelection = !options.multipleSelection;
        this.#popupover = new PopupPanel();
    }

    /**
     * 获取变化后的数据行
     */
    get rowDataList():Array<TableRow> {
        return [...this.#rows];
    }

    count(): number {
        return this.#rows.length;
    }

    /**
     * 读取当前选中的行的数据列表
     */
    get selectedDataList():Array<any> {
        let list:Array<any> = [];
        this.#rows.forEach(row => {
            if (row.selected) {
                list.push(row.data);
            }
        })
        return list;
    }

    /**
     * 设置选中行
     * @param rowData

    setSelectedRowData(rowData: RowData): void {
        rowData.selected = true;
        if (this.#singleSelection) {
            //设置单选，取消上一次选中行
            if (this.#selectedRowData != null) {
                this.#selectedRowData.selected = false;
            }
            this.#selectedRowData = rowData;
        }
    }*/

    /**
     * 设定选中的数据
     * @param list
     * @param matchFun
     */
    setSelectedDataList(list:Array<any>, matchFun?:MatchFunction): number {
        matchFun = matchFun ?? utils.objectEquals;
        let count = 0;
        this.#rows.forEach(row=> {
            let found:boolean = false;
            let i=0;
            while (!found && i<list.length) {
                found = matchFun(row.data, list[i]);
                if (found) {
                    list.splice(i, 1);
                    count++;
                }
                i++;
            }
            row.selected = found;
        });
        return count;
    }

    /**
     * 设定排序字段
     * @param field
     * @param compareFun
     */
    setOrderByField(field: string, compareFun?: CompareFunction): OrderDirection {
        compareFun = compareFun ?? ((o1:any, o2:any) => {
            let d1 = (o1 || {})[field];
            let d2 = (o2 || {})[field];
            if (d1 == null) {
                return -1;
            } else if (d2 == null) {
                return 1;
            } else if (d1 < d2) {
                return -1;
            } else if (d1 > d2) {
                return 1;
            }
            return 0;
        });
        if (field != this.#orderBy) {
            this.#isAsc = this.#options.orderDirection == OrderDirection.Ascending; //order field by the default direction
            this.#orderBy = field;
            this.#rows.sort((r1, r2) => compareFun(r1.data, r2.data));
            if (!this.#isAsc) {
                this.#rows.reverse();
            }
        } else {
            //再次排序，调整升降序
            this.#isAsc = !this.#isAsc;
            this.#rows.reverse();
        }
        if (this.#refreshHandler) {
            this.#refreshHandler();
        }
        return this.#isAsc ? OrderDirection.Ascending : OrderDirection.Descending;
    }

    /**
     * 设置数据
     * @param list
     */
    setDataList(list: Array<any>): void {
        this.#rows = [];
        list.forEach(item => {
            this.#rows.push(new TableRow(item, this.#options, this.#popupover, this.handleRowSelected,
                this.handleRowDblClickEvent))});
        if (this.#refreshHandler) {
            if (this.#options.debug) {
                console.debug('调用刷新数据函数');
            }
            this.#refreshHandler();
        }
    }

    /**
     * 处理双击
     * @param data
     */
    private handleRowDblClickEvent = (data: any):void => {
        if (this.#onRowDblClick) {
            if (this.#options.debug) {
                console.debug('双击表格行', data);
            }
            this.#onRowDblClick(data);
        }
    }

    /**
     * 处理行选中
     * @param row
     * @param selected
     */
    private handleRowSelected = (row: TableRow, selected: boolean):void =>  {
        if (!this.#options.multipleSelection) {
            if (this.#options.debug) {
                console.debug('单选环境下，选中的行发生变化');
            }
            if (this.#selectedRow != null) {
                this.#selectedRow.selected = false;
            }
            this.#selectedRow = row;
            if (this.#onRowSelected) {
                this.#onRowSelected(this.#selectedRow.data);
            }
        } else {
            if (this.#options.debug) {
                console.debug('多选环境下，选中的行发生变化');
            }
            if (this.#onSelectionRowsChanged) {
                this.#onSelectionRowsChanged();
            }
        }
    }

    /**
     * 获取当前选中的行数
     */
    countSelection():number {
        let cc = 0;
        this.#rows.forEach(row => {cc += row.selected ? 1 : 0});
        return cc;
    }

    /**
     *
     * @param value
     */
    setGroupSelection(value: boolean): void {
        this.#rows.forEach(row => {
            row.selected = value;
        })
    }

    /**
     *
     * @param handler
     */
    setDataRefreshHandler(handler: DataRefreshHandler):void {
        this.#refreshHandler = handler;
    }

    /**
     *
     * @param panel
     */
    setTablePanel(panel: HTMLElement): void {
        this.#popupover.setBoardPanel(panel);
    }

    /**
     *
     * @param handler
     */
    setOnRowDblClick(handler: OnRowDblClick): void {
        this.#onRowDblClick = handler;
    }

    /**
     *
     * @param handler
     */
    setOnSelectedRowsChanged(handler: OnSelectionRowsChanged): void {
        this.#onSelectionRowsChanged = handler;
    }

    /**
     *
     * @param handler
     */
    setOnRowSelected(handler: OnRowSelected): void {
        this.#onRowSelected = handler;
    }
}