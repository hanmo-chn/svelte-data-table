<script lang="ts">

    import IndicatorRows from "./component/IndicatorRows.svelte";
    import OperationRows from "./component/OperationRows.svelte";
    import DataContentPanel from "./component/DataContentPanel.svelte";
    import {onMount} from "svelte";
    import DataTable from "./lib/DataTable";
    import type DataColumn from "./lib/DataColumn";
    import type CompositeColumn from "./lib/CompositeColumn";
    import TableHeader from "$lib/component/TableHeader.svelte";
    import {tableWidth} from "./lib/TableWidth";
    import type TableColumn from "./lib/TableColumn";
    import {OrderDirection} from "./lib/OrderDirection";

    export let columns:Array<DataColumn | CompositeColumn> = [];
    export let list;
    export let options: any = null;

    let rowHeight: number = 0;
    let headerHeight: number = 0;
    let actionBuilder: any = options.actionBuilder;

    let hasOperation:boolean = options.actionBuilder != null;

    let grid$style: string = '';
    let inlineStyle: string = '';

    let id:string;
    let scrollTop: number = 0;
    let scrollLeft: number = 0;
    let viewWidth: number;
    let hasHorizontalScroll:boolean = false;
    let table: DataTable = null;
    let sortedList:Array<any>;


    onMount(()=>{
        id = `tab-${(new Date()).getTime().toString(36)}`;
        let indicatorWidth = options.indicatorWidth || 60;
        let operationWidth = options.operationWidth || 180;
        headerHeight = (options.headerHeight || 32) * 1;
        if (hasOperation) {
            grid$style += `grid-template-columns: ${indicatorWidth}px auto ${operationWidth}px;`;
        } else {
            grid$style += `grid-template-columns: ${indicatorWidth}px auto;`;
        }

        grid$style += `grid-template-rows: ${headerHeight}px auto`;
        rowHeight = options.rowHeight || 30;
        generateColumnsStyle();
    })

    const handleOperationColScroll = (e) => {
        scrollTop =  e.target.scrollTop;
    }

    const handleDataTableScroll = (e) => {
        if (!hasOperation) {
            scrollTop = e.target.scrollTop;
        }
        scrollLeft = e.target.scrollLeft;
    }

    const generateColumnsStyle = () => {
        console.log('生产表格的宽度css', id);
        table = new DataTable(columns);
        inlineStyle = table.toColStyles(id);
    }

    let sortedColumn:TableColumn;

    const sortList = () => {
        sortedList = sortedColumn == null ? [...list] : list.sort((o1, o2) => {
            let direction = sortedColumn.orderDirection == OrderDirection.Ascending ? 1 : -1;
            if (sortedColumn.field == null) {
                return direction * sortedColumn.compareFunction(o1, o2);
            } else {
                return direction * sortedColumn.compareFunction(o1[sortedColumn.field], o2[sortedColumn.field]);
            }
        })
    }

    const sortData = (e):void => {
        sortedColumn = e.detail;
        console.log('排序字段：', sortedColumn.text);
        sortList();
        console.log(sortedList)
    }

    $: hasHorizontalScroll = $tableWidth > viewWidth;

    $: if (columns) {
        generateColumnsStyle();
    }

    $: if (list) {
        sortList();
    }

</script>
<div class="tsui-adv-table-panel" {id} style={grid$style}>
    {@html inlineStyle}
    <div class="table-header indicator-col" style="line-height: {headerHeight}px">
        <span>序号</span>
    </div>
    <div class="table-header data-cols" style="line-height: {headerHeight}px">
        <TableHeader {scrollLeft} {table} {sortedColumn} on:sort={sortData}/>
    </div>
    {#if hasOperation}
        <div class="table-header operation-col"  style="line-height: {headerHeight}px">
            <span>{options.headerText || '操作'}</span>
        </div>
    {/if}
    {#if sortedList && sortedList.length > 0}
        <div class="table-content-panel indicator-col">
            <IndicatorRows list={sortedList} canSelect={options.multipleSelection == true} {rowHeight} {scrollTop} {hasHorizontalScroll}/>
        </div>
        <div class="table-content-panel data-cols" bind:clientWidth={viewWidth} on:scroll={handleDataTableScroll} style="{hasOperation ? '' : 'overflow-y: auto'}">
            <DataContentPanel {table} {viewWidth} list={sortedList} {rowHeight} {scrollTop} scrollable={!hasOperation}/>
        </div>
        {#if hasOperation}
            <div class="table-content-panel operation-col" on:scroll={handleOperationColScroll}>
                <OperationRows list={sortedList} {actionBuilder} {rowHeight} {hasHorizontalScroll}/>
            </div>
        {/if}
    {:else}
        <div class="empty-indicator">
            {options.emptyDataIndicator || '当前没有符合条件的数据，请重设置查询条件'}
        </div>
    {/if}
</div>