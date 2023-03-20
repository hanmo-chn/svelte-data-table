<script lang="ts">
    import OperationCell from "./OperationCell.svelte";
    export let list: Array<any> = [];
    export let actionBuilder: any;
    export let rowHeight: number;
    export let hasHorizontalScroll: boolean;

    let offsetHeight;

</script>
<div style="position: relative;">
    {#each list as item, idx}
        <OperationCell {rowHeight} actions={actionBuilder(item)} {item}/>
    {/each}
    {#if hasHorizontalScroll}
        <div class="virtual-horizontal-bar"></div>
    {/if}
</div>
