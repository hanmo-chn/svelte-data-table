<script lang="ts">
    import IndicatorCell from "./IndicatorCell.svelte";
    export let list: Array<any> = [];
    export let selected: Array<any> = [];
    export let canSelect: boolean = false;
    export let rowHeight: number;
    export let scrollTop: number = 0;
    export let hasHorizontalScroll: boolean;
</script>
<div style="position: relative; top: {-scrollTop}px">
    {#each list as item, idx}
        <div class="indicator-cell" style="height: {rowHeight}px; line-height: {rowHeight}px; {canSelect ? '' : 'text-align: center'}">
            {#if canSelect}
                <IndicatorCell rowIdx={idx+1}/>
            {:else}
                <span>{idx+1}</span>
            {/if}
        </div>
    {/each}
    {#if hasHorizontalScroll}
        <div class="virtual-horizontal-bar"></div>
    {/if}
</div>