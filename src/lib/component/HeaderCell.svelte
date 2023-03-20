<script lang="ts">
    import type TableColumn from "../lib/TableColumn";
    import {OrderDirection} from "../lib/OrderDirection";
    import {createEventDispatcher} from "svelte";

    export let column:TableColumn;
    export let sorting: boolean = false;
    export let idx: number;

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
    let posX: number = 0;
    let cellWidth: number;

    $: if (cellWidth) {
        posX = cellWidth;
    }

    const startResize = (e) => {
        startDrag = true;
        startX = e.x;
        console.log(e);
    }

    const dragResizer = (e) => {
        if (startDrag) {
            posX = cellWidth + e.x - startX;
            console.log(e, posX);
        }
    }

    const stopResize = (e) => {
        startDrag = false;
    }
</script>
<div class="table-cell col-{idx}" bind:clientWidth={cellWidth} class:sorted={column.compareFunction != null}>
    <span on:click={()=>{sortDataList(column)}}>{column.text}</span>
    {#if sorting}
        <span>{orderDirection == OrderDirection.Ascending ? '▲' : '▼'}</span>
    {/if}
    {#if column.resizable}
        <div style="left: {posX}px; {startDrag ? 'z-index: 10' : ''}" class="resizer"
             on:mousedown={startResize} on:mouseup={stopResize} on:mousemove={dragResizer}
             ></div>
    {/if}
</div>