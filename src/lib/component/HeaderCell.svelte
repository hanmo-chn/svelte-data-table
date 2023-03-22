<script lang="ts">
    import type TableColumn from "../lib/TableColumn";
    import {OrderDirection} from "../lib/OrderDirection";
    import {createEventDispatcher} from "svelte";
    import type DataTable from "../lib/DataTable";

    export let column:TableColumn;
    export let sorting: boolean = false;
    export let idx: number;
    export let table: DataTable;
    let resizable: boolean = column.resizable;

    let orderDirection:OrderDirection = column.orderDirection;

    const dispatch = createEventDispatcher();

    const sortDataList = () => {
        if (column.compareFunction != null) {
            column.orderDirection = column.orderDirection == OrderDirection.Ascending ? OrderDirection.Descending : OrderDirection.Ascending;
            orderDirection = column.orderDirection;
            dispatch('sort', column);
        }
    }

    let startDrag:boolean = false;
    let startX: number = 0;
    let startWidth: number;

    const startResize = (e) => {
        if (resizable) {
            startDrag = true;
            startX = e.x + window.scrollX;
            startWidth = column.actualWidth;
            window.onmousemove = dragResizer;
        }
    }

    const dragResizer = (e) => {
        if (startDrag) {
            table.adjustColumnWidth(column, e.x - startX);
            startX = e.x;
        }
    }

    const stopResize = (e) => {
        if (startDrag) {
            table.adjustColumnWidth(column, 1);
            startDrag = false;
            startX = 0;
            window.onmousemove = null;
        }
    }

    const autoResize = (e) => {
        table.adjustColumnWidth(column, column.fitWidth - column.actualWidth);
    }

</script>
<div class="table-cell col-{idx}" class:sorted={column.compareFunction != null}>
    <span on:click={()=>{sortDataList(column)}}>{column.text}</span>
    {#if sorting}
        <span>{orderDirection == OrderDirection.Ascending ? '▲' : '▼'}</span>
    {/if}
    {#if resizable}
        <svg class="resizer" viewBox="0 0 32 32" on:mousedown={startResize} on:dblclick={autoResize}
             on:mouseup={stopResize} on:mouseleave={stopResize}>
            <polygon points="12 4 12 15 5.83 15 8.41 12.41 7 11 2 16 7 21 8.41 19.59 5.83 17 12 17 12 28 14 28 14 4 12 4"/>
            <polygon points="25 11 23.59 12.41 26.17 15 20 15 20 4 18 4 18 28 20 28 20 17 26.17 17 23.59 19.59 25 21 30 16 25 11"/>
        </svg>
    {/if}
</div>