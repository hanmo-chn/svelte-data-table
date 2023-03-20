<script lang="ts">
    export let item: any;
    export let actions: Array<any> = [];
    export let rowHeight: number;
</script>
<div class="operation-cell" style="height: {rowHeight}px; padding 4px 0">
    {#each actions as action}
        <a  style="line-height:{rowHeight-8}px" href="javascript:void(0)" on:click={(e)=>{action.callback(item)}}>{action.label}</a>
    {/each}
</div>