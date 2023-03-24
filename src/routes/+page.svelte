<script lang="ts">

    import '@hanmotec/tsui-common/tsui-common.scss';
    import '../lib/tsui-data-table.scss';
    import AdvanceDataTable from '../lib/AdvanceDataTable.svelte';
    import {onMount} from "svelte";
    import type {CompositeColumn, DataColumn} from "../lib";
    import demoData from "./demo-data.json"

    const columns:Array<DataColumn | CompositeColumn> = [
        {
            field: "applicationNo",
            text: "表单编号",
            width: 120,
            align: "left",
            sortable: true,
            href: item => [
                "关联申请  ",
                {text: item.applicationNo, action: () => {console.log(item.id, item.applicationNo)}}
            ]
        },
        {
            field: "arrivalDate",
            text: "入厂日期",
            width: 100,
            align: "center",
            sortable: true
        },
        {
            field: "erpOrderNo",
            text: "ERP订单号",
            width: 150,
            align: "left",
            sortable: true,
            resizable: true,
        },
        {
            field: "materialName",
            text: "材料名称",
            width: 180,
            align: "left",
            sortable: true,
            resizable: true
        },
        {
            field: "materialType",
            text: "材料类型",
            width: 100,
            align: "center",
            // formatter: value => BizUtils.getMaterialType(value)
            formatter: value => value || ''
        },
        {
            field: "batchNo",
            text: "检验批次",
            width: 240,
            align: "left",
            weight: 1,
            resizable: true
        },
        {
            field: "analysisProjectName",
            text: "分析项目",
            width: 240,
            align: "left",
            weight: 1,
            resizable: true
        },
        {
            field: "testResultCode",
            text: "检测结果",
            width: 100,
            align: "center",
            formatter: value => '正常'
        },
        {
            field: "shipmentCode",
            text: "运输方式",
            width: 100,
            align: "center",
            weight: 1,
            resizable: true,
            formatter: value => value == '0' ? '汽车' : '火车'
        },
        {
            field: "quantity",
            text: "数量（吨）",
            width: 80,
            sortable: true,
            formatter: value => (value || 0).toFixed(2),
            align: "right",
        },
        {
            field: "cars",
            text: "车数",
            width: 60,
            align: "right",
        },
        {
            field: "licenseNo",
            text: "牌照/车次",
            width: 120,
            align: "center",
        },
        {
            field: "supplier",
            text: "供货商",
            width: 120,
            align: "left",
            sortable: true,
            resizable: true,
            hint: value => value
        },
        {
            field: "receiveDept",
            text: "收货单位",
            width: 150,
            align: "left",
            sortable: true,
            resizable: true,
            hint: value => `内容：${value}`
        },
        {
            field: "createTime",
            text: "创建时间",
            width: 100,
            align: "center",
            sortable: true
        }
    ]

    let list = [];

    setTimeout(()=> {list = demoData}, 1000);

    let options = {
        indicatorWidth: 50,
        actionColumn: {
            text: '操作',
            vacancy: 2,
            width: 180,
            actionBuilder: item => [
                {
                    label: '编辑',
                    callback: item => console.log(item)
                },
                {
                    label: '删除',
                    callback: item => console.log(item)
                },
                {
                    label: '编辑',
                    callback: item => console.log(item)
                },
                {
                    label: '删除',
                    callback: item => console.log(item)
                },
                {
                    label: '编辑',
                    callback: item => console.log(item)
                },
                {
                    label: '删除',
                    callback: item => console.log(item)
                }
            ],
        },
        multipleSelection: true
    }

    let selectedRows: Array<any> = [];

    onMount(()=>{

    })

    $:console.log('选中的行：', selectedRows);

</script>
<div style="width: 95%; height: 600px; font-size: 12px; position: relative; margin: 10px auto; box-sizing: border-box;">
    <AdvanceDataTable bind:selectedRows {columns} list={list} {options} on:rowDblClick={(e)=>{console.log(e.detail)}}/>
</div>




