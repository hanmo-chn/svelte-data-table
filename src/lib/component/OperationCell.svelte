<script lang="ts">
    import {onMount} from "svelte";
    import Popover from  '@hanmotec/tsui-common/popover'

    export let item: any;
    export let actions: Array<any> = [];
    export let rowHeight: number;
    export let vacancy: number;
    export let tableRect: any;

    let popupList:Array<any> = [];
    let buttons:Array<any> = [];
    let popover;
    let posY: string = "top";
    let cell: any;

    onMount(()=>{
        actions.forEach((action, idx) => {
            if (idx < vacancy) {
                buttons.push(action);
            } else {
                popupList.push(action);
            }
        });
        buttons = [...buttons];
        popupList = [...popupList];

    });

    const showPopupActions = () => {
        let rect = cell.getBoundingClientRect();
        let oneThird = (tableRect.height + tableRect.top) / 3;
        if (rect.top > oneThird * 2) {
            posY = 'bottom'
        } else {
            posY = 'top'
        }
        popover.doOpen();
    }
</script>
<div bind:this={cell} class="operation-cell" style="height: {rowHeight}px; padding 4px 0">
    {#each buttons as action}
        <a class="action-button" style="line-height:{rowHeight-8}px" href="javascript:void(0)" on:click={(e)=>{action.callback(item)}}>{action.label}</a>
    {/each}
    {#if popupList.length > 0}
        <a class="action-button" style="line-height:{rowHeight-8}px; min-width: 20px" href="javascript:void(0)" on:click={showPopupActions}>...</a>
        <Popover bind:this={popover} {posY} posX="right" height="120" width="90">
            <div style="width: 100%; height: 100%; background-color: #ffffff">
            {#each popupList as action}
                <div class="action-popover">
                    <a  style="line-height:{rowHeight-8}px" href="javascript:void(0)"
                        on:click={(e)=>{action.callback(item); popover.close();}}>
                        {action.label}
                    </a>
                </div>
            {/each}
            </div>
        </Popover>
    {/if}
</div>