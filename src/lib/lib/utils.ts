import type DataColumn from "./DataColumn";
import type CompositeColumn from "./CompositeColumn";

const sortTableColumns = (columns: Array<DataColumn | CompositeColumn>) => {
    const tabColumns = [];
    let rows: number = 1;
    columns.forEach(column => {
        if ("columns" in column) { //这是一个复合列
            rows = 2;
        } else {
            tabColumns.push(column);
        }
    });

}