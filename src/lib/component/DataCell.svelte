<script lang="ts">
    export let escapeHTML:boolean;
    export let content: string;
    export let hint: string = null;

    let cell;

    $: if (cell) {
        console.log(cell, cell.offsetWidth < cell.scrollWidth)
    }

</script>
<div bind:this={cell} class="cell-content">
    {#if escapeHTML}
        {@html content}
    {:else }
        <span>{content}</span>
    {/if}
</div>
{#if hint && cell && cell.offsetWidth < cell.scrollWidth}
    <div class="cell-hint">
        <span>{hint}</span>
    </div>
{/if}