<script lang="ts">

    import type DataTable from "../lib/DataTable";
    import type TableColumn from "../lib/TableColumn";
    import {tableWidth} from "$lib/lib/TableWidth.js";
    import {createEventDispatcher} from "svelte";
    import {OrderDirection} from "$lib/lib/OrderDirection.js";
    import HeaderCell from "$lib/component/HeaderCell.svelte";

    export let table:DataTable;
    export let scrollLeft:number = 0;
    export let sortedColumn: TableColumn;

    const dispatch = createEventDispatcher();

    let columns:Array<TableColumn>;

    $: if (table) {
        columns = table.columns;
    }

</script>
<div style="display: flex; flex-direction: row; position: relative; left: {-scrollLeft}px; width: {$tableWidth}px">
{#if table}
    {#each columns as column, idx}
        <HeaderCell {column} {idx} sorting={column == sortedColumn} on:sort/>
    {/each}
{/if}
</div>