<script lang="ts">
    import {createEventDispatcher} from "svelte";

    export let rowIdx;
    export let checked:boolean;

    const dispatch = createEventDispatcher();

    const handleCheckBoxClick = (e) => {
        dispatch('change', !checked);
        return false;
    }

</script>
<label class="checkbox-label">
    <input style="vertical-align: middle" type="checkbox" checked={checked} on:click={handleCheckBoxClick}/>
    <span style="vertical-align: middle">{rowIdx}</span>
</label>