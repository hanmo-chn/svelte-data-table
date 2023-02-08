/**
 * 调用函数，当触发一个动作的时候
 */
export type ActionInvoker = (data: any) => Promise<void>;

/**
 * 行数据的动作(操作)
 */
export interface RowAction {
    /**
     * 操作的文字
     */
    label: string;
    /**
     * 操作的key
     */
    callback: ActionInvoker;
}

/**
 * 根据数据返回当前可用的actions
 */
export type GetActionsFunction = (data: any) => RowAction[];

export default interface ActionColumn  {
    /**
     *
     */
    label: string;
    /**
     * 操作列
     */
    actions: GetActionsFunction;

    /**
     *
     */
    numOfVacancy: number;

    /**
     * 宽度
     */
    width: number;
}