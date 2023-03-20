<script lang="ts">
    export let rowIdx;
    let value:boolean;
</script>
<label class="checkbox-label">
    <input style="vertical-align: middle" type="checkbox" bind:checked={value}/>
    <span style="vertical-align: middle">{rowIdx}</span>
</label>