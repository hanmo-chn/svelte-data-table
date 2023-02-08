import {FormatCell} from "./FormatCell";
import CommonDataColumn from "./CommonDataColumn";
import {CompareFunction} from "./CompareFunction";

export default interface DataColumn extends CommonDataColumn {

    /**
     * 对应的字段/属性名
     */
    field?: string;
    /**
     * 是否支持排序
     */
    sortable?: boolean;
    /**
     * 排序方式
     */
    compareFunction?: CompareFunction;
    /**
     * 单元格转换函数
     */
    formatter?: FormatCell;
    /**
     * 是否忽略html的转义符
     */
    escapeHTML?: boolean;

}