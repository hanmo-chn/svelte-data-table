import type {CellHint, FormatCell} from "./FormatCell";
import type {CompareFunction} from "./CompareFunction";
import type BaseColumn from "./BaseColumn";
import type {HrefBuilder} from "./HrefLink";

export default interface DataColumn extends BaseColumn {
    /**
     * 对齐方式，文本，可以取值：left, center, right
     */
    align?: string;
    /**
     * 宽度
     */
    width: number;
    /**
     * 对应的字段/属性名
     */
    field?: string;
    /**
     * 是否支持排序，默认的为false
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
    /**
     * 是否可以更改宽度
     */
    resizable?:boolean;
    /**
     * 超链接设置
     */
    href?: HrefBuilder;
    /**
     * 自动调节占重
     */
    weight?: number;
    /**
     * 显示宽度
     */
    displayWidth?: number;
    /**
     * 手工resize过
     */
    manuallyResized?: boolean;
    /**
     * 是否生产hint
     */
    hint?: CellHint;

    visible?: boolean;

}