<script lang="ts">
    import OperationCell from "./OperationCell.svelte";
    export let list: Array<any> = [];
    export let actionBuilder: any;
    export let rowHeight: number;
    export let hasHorizontalScroll: boolean;
    export let vacancy: number;
    export let tableRect: any;
    export let align: string = 'center';



</script>
<div style="position: relative; width: 100%; box-sizing: border-box;">
    {#each list as item, idx}
        <OperationCell {vacancy} {tableRect} {rowHeight} {align} {actionBuilder} {item}/>
    {/each}
    {#if hasHorizontalScroll}
        <div class="virtual-horizontal-bar"></div>
    {/if}
</div>
