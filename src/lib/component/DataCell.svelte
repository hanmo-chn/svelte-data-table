<script lang="ts">
    import type TableColumn from "../lib/TableColumn";
    import {onMount} from "svelte";

    export let escapeHTML:boolean;
    export let content: string;
    export let hint: string = null;
    export let column: TableColumn;

    let cell;

    onMount(()=>{
        if (cell && cell.scrollWidth + 10 > column.fitWidth) {
            column.fitWidth = cell.scrollWidth + 12;
        }
    })

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