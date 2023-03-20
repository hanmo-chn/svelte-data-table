<script lang="ts">
    import type TableColumn from "../lib/TableColumn";
    import DataCell from "./DataCell.svelte";
    import HrefCell from "$lib/component/HrefCell.svelte";

    export let rowHeight: number = 0;
    export let item;
    export let columns:Array<TableColumn>;

    const getReferenceValue = (column: TableColumn, data: any) => {
        return column.field==null ? data : data[column.field]
    }

    const generateCellContent = (column: TableColumn, data: any) => {
        return column.formatter(getReferenceValue(column, data));
    }

    const generateHint = (column: TableColumn, data: any) => {
        return column.hint != null ? column.hint(getReferenceValue(column, data)) : null;
    }

</script>
<div class="data-row" style="width: 100%; height: {rowHeight}px">
    {#each columns as column, idx}
        <div class="table-cell col-{idx}">
            {#if column.href != null}
                <HrefCell hrefLinks={column.href(item)} value={getReferenceValue(column, item)}/>
            {:else}
                <DataCell escapeHTML={column.escapeHTML} content={generateCellContent(column, item)} hint={generateHint(column, item)}/>
            {/if}
        </div>
    {/each}
</div>