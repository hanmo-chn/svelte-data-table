<script lang="ts">

    import type DataTable from "../lib/DataTable";
    import type TableColumn from "../lib/TableColumn";
    import HeaderCell from "./HeaderCell.svelte";

    export let table:DataTable;
    export let columns: Array<TableColumn>;
    export let scrollLeft:number = 0;
    export let sortedColumn: TableColumn;
    export let width: number;

</script>
<div style="display: flex; flex-direction: row; position: relative; left: {-scrollLeft}px; width: {width}px">
{#if table}
    {#each columns as column, idx}
        <HeaderCell {table} {column} {idx} sorting={column == sortedColumn} on:sort/>
    {/each}
{/if}
</div>