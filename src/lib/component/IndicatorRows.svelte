<script lang="ts">
    import IndicatorCell from "./IndicatorCell.svelte";
    export let list: Array<any> = [];
    export let canSelect: boolean = false;
    export let rowHeight: number;
    export let scrollTop: number = 0;
    export let hasHorizontalScroll: boolean;
    export let selectedRows: Array<any> = [];

    const handleCheckBoxClick = (e, item) => {
        console.log("变化情况：", e.detail);
        if (selectedRows.indexOf(item) > -1) {
            console.log('删除选中的项目');
            selectedRows.remove(item);
        } else {
            selectedRows = [...selectedRows, item];
            console.log('增加选中的项目', selectedRows);
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

</script>
<div style="position: relative; top: {-scrollTop}px">
    {#each list as item, idx}
        <div class="indicator-cell" style="height: {rowHeight}px; line-height: {rowHeight}px; {canSelect ? '' : 'text-align: center'}">
            {#if canSelect}
                <IndicatorCell rowIdx={idx+1} checked={selectedRows.indexOf(item) > -1} on:change={(e)=>{return handleCheckBoxClick(e, item)}}/>
            {:else}
                <span>{idx+1}</span>
            {/if}
        </div>
    {/each}
    {#if hasHorizontalScroll}
        <div class="virtual-horizontal-bar"></div>
    {/if}
</div>