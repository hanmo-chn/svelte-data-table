import FooterColumn from "./FooterColumn";
import ActionColumn from "./ActionColumn";
import {OrderDirection} from "./OrderDirection";


export type DataMatch = (item: any, checkData: any) => boolean;

export default interface TableOptions {
    /**
     * 固定列的标题，默认为序号
     */
    fixedColumnLabel?: string;
    /**
     * 是否允许多选，默认为false
     */
    multipleSelection?: boolean;

    /**
     * 表格底部行定义
     */
    footerColumns?: Array<FooterColumn>;

    /**
     * 检查数据是否相同，用于自动选择数据
     */
    dataMatch?: DataMatch;

    /**
     *
     */
    headerRowHeight?: number;

    /**
     *
     */
    rowHeight?: number;

    /**
     * 字体大小
     */
    fontSize?: string;

    /**
     * 操作栏
     */
    actionColumn?: ActionColumn;

    /**
     * 默认排序方向
     */
    orderDirection?: OrderDirection;

    /**
     *
     */
    debug?: boolean;
}