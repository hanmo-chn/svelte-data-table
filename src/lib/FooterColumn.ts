import {AggregationType} from "./AggregationType";

export default interface FooterColumn {
    /**
     * 列
     */
    col: number;

    /**
     * 聚合函数类型
     */
    aggregationType: AggregationType;


}