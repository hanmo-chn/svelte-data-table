import BaseColumn from "./BaseColumn";

export default interface CommonDataColumn extends BaseColumn {

    /**
     * 对齐方式，文本，可以取值：left, center, right
     */
    align: string;
    /**
     * 自动调节占重
     */
    weight?: number;
    /**
     * 是否可以更改宽度
     */
    resizable?:boolean;
    /**
     * 宽度
     */
    width: number;
    /**
     * 显示宽度
     */
    displayWidth?: number;

}