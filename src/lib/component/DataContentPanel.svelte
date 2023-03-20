<script lang="ts">

    import DataRow from "./DataRow.svelte";
    import {tableWidth} from "$lib/lib/TableWidth.js";
    import type TableColumn from "../lib/TableColumn";
    import type DataTable from "../lib/DataTable";
    export let list: Array<any> = [];
    export let rowHeight: number = 0;
    export let scrollTop: number = 0;
    export let scrollable: boolean = false;
    export let viewWidth: number;
    export let table: DataTable;

    let columns: Array<TableColumn> = [];

    let panel;
    let w;

    $: console.log('定义的表格：', columns);
    $: if (table) {
        columns = table.columns;
    }

    $:console.log('显示数据：', list);

</script>
<div style="position: relative; top: {scrollable ? 0 : -scrollTop}px; width: {$tableWidth}px">
    {#each list as item, rowIdx}
        <DataRow {rowHeight} {columns} {item} {rowIdx}/>
    {/each}
</div>