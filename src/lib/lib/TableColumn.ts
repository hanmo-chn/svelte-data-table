import type {CompareFunction} from "./CompareFunction";
import type {CellHint, FormatCell} from "./FormatCell";
import type {OrderDirection} from "./OrderDirection";
import type {HrefBuilder} from "./HrefLink";

export default interface TableColumn {
    /**
     * 表头文字
     */
    text: string;
    /**
     * 对齐方式，文本，可以取值：left, center, right
     */
    align: string;
    /**
     * 宽度
     */
    width: number;
    /**
     * 实际的宽度
     */
    actualWidth: number;
    /**
     * 合适的宽度
     */
    fitWidth: number;
    /**
     * 是否显示
     */
    visible: boolean;
    /**
     * 是否可以更改大小
     */
    resizable: boolean;
    /**
     * 对应的字段/属性名
     */
    field?: string;
    /**
     * 排序方式
     */
    compareFunction: CompareFunction | null;
    /**
     * 排序方式，生序/降序
     */
    orderDirection: OrderDirection | null;
    /**
     * 超链接设置
     */
    href: HrefBuilder | null;
    /**
     * 单元格转换函数
     */
    formatter: FormatCell;
    /**
     * 是否忽略html的转义符
     */
    escapeHTML: boolean;
    /**
     * 自动调节占重
     */
    weight: number;
    /**
     *
     */
    hint?: CellHint;
}