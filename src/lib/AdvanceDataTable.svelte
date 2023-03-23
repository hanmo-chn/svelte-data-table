<script lang="ts">

    import IndicatorRows from "./component/IndicatorRows.svelte";
    import OperationRows from "./component/OperationRows.svelte";
    import DataContentPanel from "./component/DataContentPanel.svelte";
    import {onMount} from "svelte";
    import DataTable from "./lib/DataTable";
    import type DataColumn from "./lib/DataColumn";
    import type CompositeColumn from "./lib/CompositeColumn";
    import TableHeader from "$lib/component/TableHeader.svelte";
    import type TableColumn from "./lib/TableColumn";
    import {OrderDirection} from "./lib/OrderDirection";
    import {fade} from "svelte/transition";


    export let columns:Array<DataColumn | CompositeColumn> = [];
    export let list;
    export let options: any = null;
    export let selectedRows: Array<any> = [];
    export let style: string = '';

    let className: string = '';
    export  {className as class};

    let rowHeight: number = 0;
    let headerHeight: number = 0;
    let tabCols:Array<TableColumn> = [];
    let tableWidth: number = 0;

    let hasOperation:boolean = false;

    let grid$style: string = '';

    let id:string;
    let scrollTop: number = 0;
    let scrollLeft: number = 0;
    let viewWidth: number;
    let table: DataTable = null;
    let sortedList:Array<any>;
    let contentPanel;
    let tableStyles: string = '';
    let tabElement;
    let actionColumn: any;
    let tableRect: any;

    const generateGridStyle = () => {
        let indicatorWidth = options.indicatorWidth || 60;
        let operationWidth = actionColumn.width || 180;
        if (hasOperation) {
            grid$style += `grid-template-columns: ${indicatorWidth}px auto ${operationWidth}px;`;
        } else {
            grid$style += `grid-template-columns: ${indicatorWidth}px auto;`;
        }
        grid$style += `grid-template-rows: ${headerHeight}px auto`;
    }

    onMount(()=>{
        id = `tab-${(new Date()).getTime().toString(36)}`;
        actionColumn = options.actionColumn || {};
        hasOperation = actionColumn.actionBuilder != null;
        headerHeight = (options.headerHeight || 32) * 1;
        table = new DataTable(id, columns, viewWidth, (resetTableWidth)=>{
            tableStyles = table.buildCssStyles();
            tabCols = table.columns;
            if (resetTableWidth ) {
                table.adjustTableWidth();
                tableWidth = table.width;
            }
        });
        rowHeight = options.rowHeight || 30;
        tabCols = table.columns;
        tableStyles = table.buildCssStyles();
        tableWidth = table.width;
        generateGridStyle();
        tableRect = tabElement.getBoundingClientRect();
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

    const generateColumnsStyle = (colsWidth) => {
        if (table && colsWidth) {
            //table.buildCssStyles(colsWidth);
        }
    }

    let sortedColumn:TableColumn;
    let viewDataTable: any;

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
        sortList();
    }

    $: if (columns) {
        generateColumnsStyle([]);
    }

    $: if (list) {
        sortList();
    }

    $: if (table && viewWidth) {
        console.log('视窗宽度', viewWidth);
        table.setViewWidth(viewWidth);
        tableWidth = table.width;
    }

</script>
<div bind:this={tabElement} class="tsui-adv-table-panel {className}" {id} style="{style}; {grid$style}">
    {@html tableStyles}
    <div class="table-header indicator-col" style="line-height: {headerHeight}px">
        <span></span>
    </div>
    <div class="table-header data-cols" style="line-height: {headerHeight}px">
        <TableHeader width={tableWidth} {scrollLeft} {table} columns={tabCols} {sortedColumn} on:sort={sortData}/>
    </div>
    {#if hasOperation}
        <div class="table-header operation-col"  style="line-height: {headerHeight}px">
            <span>{actionColumn.text || '操作'}</span>
        </div>
    {/if}
    {#if sortedList && sortedList.length > 0}
        <div class="table-content-panel indicator-col" transition:fade>
            <IndicatorRows list={sortedList} canSelect={options.multipleSelection == true} {rowHeight} {scrollTop}
                           bind:selectedRows hasHorizontalScroll={tableWidth > viewWidth}/>
        </div>
        <div bind:this={viewDataTable} transition:fade class="table-content-panel data-cols" bind:clientWidth={viewWidth}
              on:scroll={handleDataTableScroll} style="{hasOperation ? '' : 'overflow-y: auto'}">
            <DataContentPanel bind:this={contentPanel} columns={tabCols} {table} {tableWidth}
                              list={sortedList} {rowHeight} {scrollTop} scrollable={!hasOperation} on:rowDblClick/>
        </div>
        {#if hasOperation}
            <div  transition:fade class="table-content-panel operation-col" on:scroll={handleOperationColScroll}>
                <OperationRows list={sortedList} {tableRect} vacancy={actionColumn.numOfVacancy || 2}
                               actionBuilder={actionColumn.actionBuilder} {rowHeight}
                               hasHorizontalScroll={tableWidth > viewWidth}/>
            </div>
        {/if}
    {:else}
        <div class="empty-indicator">
            {options.emptyDataIndicator || '当前没有符合条件的数据，请重设置查询条件'}
        </div>
    {/if}
</div>