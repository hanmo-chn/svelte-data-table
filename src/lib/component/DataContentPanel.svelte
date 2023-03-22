<script lang="ts">

    import DataRow from "./DataRow.svelte";
    import type TableColumn from "../lib/TableColumn";

    export let list: Array<any> = [];
    export let rowHeight: number = 0;
    export let scrollTop: number = 0;
    export let scrollable: boolean = false;
    export let tableWidth: number = 0;
    export let columns: Array<TableColumn> = [];
    export let selectedRows;

</script>
<div style="position: relative; top: {scrollable ? 0 : -scrollTop}px; width: {tableWidth}px">
    {#each list as item, rowIdx}
        <DataRow {rowHeight} {columns} {item} {rowIdx} bind:selectedRows/>
    {/each}
</div>