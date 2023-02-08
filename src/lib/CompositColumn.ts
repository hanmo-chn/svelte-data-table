import BaseColumn from "./BaseColumn";
import DataColumn from "./DataColumn";

export default interface CompositColumn extends BaseColumn {
    /**
     * 组合的列，可以包含多个列，系统最多支持2行的表头
     */
    columns: Array<DataColumn>;
}