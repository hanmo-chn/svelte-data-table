/**
 * 当滚动条滚动事件的处理器
 */
export type ScrollHandler = (offset: number) => void;
/**
 * 当表格宽度发生变化的处理器
 */
export type ResizeHandler = (width: number) => void;

/**
 * 当全选或者全部不选的处理器
 */
export type GroupSelectHandler = (select: boolean) => void;

/**
 *
 */
export type DataRefreshHandler = () => void;

/**
 * 当行被选定的时候（仅用于单选）
 */
export type OnRowSelected = (data: any) => void;

/**
 * 当选择的项目发生变化的时候
 */
export type OnSelectionRowsChanged = () => void;

/**
 * 当行被双击的时候触发
 */
export type OnRowDblClick = (data: any) => void;

