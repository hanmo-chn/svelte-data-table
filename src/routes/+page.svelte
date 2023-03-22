<script lang="ts">

    import '@hanmotec/tsui-common/tsui-common.scss';
    import '../lib/tsui-data-table.scss';
    import AdvanceDataTable from '../lib/AdvanceDataTable.svelte';
    import {onMount} from "svelte";
    import type {CompositeColumn, DataColumn} from "../lib";


    const columns:Array<DataColumn | CompositeColumn> = [
        {
            field: "applicationNo",
            text: "表单编号",
            width: 120,
            align: "left",
            sortable: true,
            href: item => {return {text: `关联申请：${item.applicationNo}`, action: () => {console.log(item.id, item.applicationNo)}}}
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

    setTimeout(()=> {list = [{"arrivalDate":"2023-01-11T04:30:54.000Z","erpOrderNo":null,"materialCode":"15","materialMdmCode":"15","materialName":"盐酸","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"0","quantity":33.04,"cars":1,"supplier":"宁夏大正化工有限公司","receiveDept":"煤制油公司","licenseNo":"宁CA0787","id":"1E13D78A91B211ED870E17FCCF82577D","applicationNo":"RA-202301000547","status":"P","createTime":"2023-01-11T05:15:39.471Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T04:28:18.000Z","erpOrderNo":null,"materialCode":"17","materialMdmCode":"17","materialName":"液碱","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"0","quantity":33.52,"cars":1,"supplier":"宁夏硕阳运输有限公司","receiveDept":"煤制油公司","licenseNo":"蒙L61341","id":"B9F6D78D91B211EDB238826C8F2A51A6","applicationNo":"RA-202301000548","status":"P","createTime":"2023-01-11T05:15:39.495Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T03:30:47.000Z","erpOrderNo":null,"materialCode":"436","materialMdmCode":"436","materialName":"阳离子聚丙烯酰胺","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"0","quantity":17.36,"cars":1,"supplier":"河南博源新材料有限公司","receiveDept":"煤制油公司","licenseNo":"豫JB3180","id":"1D2CD68891B211EDBE9A45B072B26FFF","applicationNo":"RA-202301000546","status":"P","createTime":"2023-01-11T05:15:37.780Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T03:23:43.000Z","erpOrderNo":null,"materialCode":"3","materialMdmCode":"3","materialName":"硫酸","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"0","quantity":31.78,"cars":1,"supplier":"巴彦淖尔紫金有色金属有限公司","receiveDept":"煤制油公司","licenseNo":"宁B87007","id":"A383D67091B211ED99CE1462324777BD","applicationNo":"RA-202301000545","status":"P","createTime":"2023-01-11T05:15:37.734Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T02:59:36.000Z","erpOrderNo":null,"materialCode":"7","materialMdmCode":"7","materialName":"洗混煤","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"1","quantity":3639.7,"cars":52,"supplier":"双马矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"160AD87A91B211EDBC95FE78FA41FDFF","applicationNo":"RA-202301000550","status":"P","createTime":"2023-01-11T05:15:41.442Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T02:56:43.000Z","erpOrderNo":null,"materialCode":"08","materialMdmCode":"08","materialName":"筛选末煤","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"1","quantity":2657.95,"cars":46,"supplier":"金凤矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"6616D87191B211ED8D8CECDC9957EAA7","applicationNo":"RA-202301000549","status":"P","createTime":"2023-01-11T05:15:40.987Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T02:54:36.000Z","erpOrderNo":null,"materialCode":"383","materialMdmCode":"383","materialName":"工业盐","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"0","quantity":12.92,"cars":1,"supplier":null,"receiveDept":"煤制油公司","licenseNo":"宁AL7162","id":"AE76DC3A91A411ED826BD4504DA83FDE","applicationNo":"RA-202301000544","status":"P","createTime":"2023-01-11T03:35:34.455Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-11T00:50:16.000Z","erpOrderNo":null,"materialCode":"7","materialMdmCode":"7","materialName":"洗混煤","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"1","quantity":3710,"cars":53,"supplier":"红柳矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"6F2AE5F7919611ED83DA116DD0467F6D","applicationNo":"RA-202301000543","status":"P","createTime":"2023-01-11T01:55:37.767Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T23:02:42.000Z","erpOrderNo":null,"materialCode":"08","materialMdmCode":"08","materialName":"筛选末煤","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"1","quantity":3709.85,"cars":53,"supplier":"枣泉矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"1B45E5D8919611ED94A46A2006961FF3","applicationNo":"RA-202301000542","status":"P","createTime":"2023-01-11T01:55:37.572Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T22:39:39.000Z","erpOrderNo":null,"materialCode":"412","materialMdmCode":"412","materialName":"费托合成催化剂","materialId":null,"limsProjectId":null,"testResultCode":"2","shipmentCode":"0","quantity":28.7,"cars":1,"supplier":"中科合成油技术股份有限公司","receiveDept":"煤制油公司","licenseNo":"蒙K93363","id":"937FEAC5918811EDB673B8607DC2FFF7","applicationNo":"RA-202301000539","status":"P","createTime":"2023-01-11T00:15:32.896Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T22:35:11.000Z","erpOrderNo":null,"materialCode":"7","materialMdmCode":"7","materialName":"洗混煤","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"1","quantity":3709.9,"cars":53,"supplier":"石槽村矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"0867EB5B918811ED803F7BBC1EE42F3A","applicationNo":"RA-202301000541","status":"P","createTime":"2023-01-11T00:15:33.854Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T21:38:25.000Z","erpOrderNo":null,"materialCode":"7","materialMdmCode":"7","materialName":"洗混煤","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"1","quantity":3710,"cars":53,"supplier":"红柳矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"81E4EB3E918811EDB7A3E1601E2BEABF","applicationNo":"RA-202301000540","status":"P","createTime":"2023-01-11T00:15:33.667Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T18:51:19.000Z","erpOrderNo":null,"materialCode":"7","materialMdmCode":"7","materialName":"洗混煤","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"1","quantity":3709.4,"cars":53,"supplier":"双马矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"1DF9FC37916C11EDBB478E4121C475FF","applicationNo":"RA-202301000538","status":"P","createTime":"2023-01-10T20:55:36.232Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T17:49:24.000Z","erpOrderNo":null,"materialCode":"08","materialMdmCode":"08","materialName":"筛选末煤","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"1","quantity":3640,"cars":52,"supplier":"红柳矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"229EFB92916C11EDB436AAABFDB8FF9A","applicationNo":"RA-202301000537","status":"P","createTime":"2023-01-10T20:55:35.219Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T17:25:27.000Z","erpOrderNo":null,"materialCode":"17","materialMdmCode":"17","materialName":"液碱","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"0","quantity":33.34,"cars":1,"supplier":"宁夏硕阳运输有限公司","receiveDept":"煤制油公司","licenseNo":"豫GC5011","id":"1143019C915F11EDB1FC27BA5117FFDE","applicationNo":"RA-202301000535","status":"P","createTime":"2023-01-10T19:15:32.328Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T17:16:26.000Z","erpOrderNo":null,"materialCode":"17","materialMdmCode":"17","materialName":"液碱","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"0","quantity":33.38,"cars":1,"supplier":"宁夏硕阳运输有限公司","receiveDept":"煤制油公司","licenseNo":"蒙L60941","id":"F4CB0177915F11EDBD284B83E316F7F3","applicationNo":"RA-202301000534","status":"P","createTime":"2023-01-10T19:15:32.189Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T16:50:14.000Z","erpOrderNo":null,"materialCode":"7","materialMdmCode":"7","materialName":"洗混煤","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"1","quantity":2750.15,"cars":50,"supplier":"金凤矿","receiveDept":"国家能源集团宁夏煤业有限责任公司煤制油分公司","licenseNo":null,"id":"53110256915F11ED8E936C3E657450E7","applicationNo":"RA-202301000536","status":"P","createTime":"2023-01-10T19:15:33.558Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T16:36:05.000Z","erpOrderNo":null,"materialCode":"15","materialMdmCode":"15","materialName":"盐酸","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"0","quantity":19.38,"cars":1,"supplier":"宁夏大正化工有限公司","receiveDept":"煤制油公司","licenseNo":"宁CE1517","id":"9C930A61915111EDADDFA59410037EFD","applicationNo":"RA-202301000532","status":"P","createTime":"2023-01-10T17:35:34.904Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T16:16:31.000Z","erpOrderNo":null,"materialCode":"17","materialMdmCode":"17","materialName":"液碱","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"0","quantity":32.1,"cars":1,"supplier":"宁夏硕阳运输有限公司","receiveDept":"煤制油公司","licenseNo":"蒙C31118","id":"A7CF0A58915111EDA0141A020B32779B","applicationNo":"RA-202301000530","status":"P","createTime":"2023-01-10T17:35:34.317Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null},{"arrivalDate":"2023-01-10T16:13:52.000Z","erpOrderNo":null,"materialCode":"17","materialMdmCode":"17","materialName":"液碱","materialId":null,"limsProjectId":null,"testResultCode":"0","shipmentCode":"0","quantity":33.9,"cars":1,"supplier":"宁夏硕阳运输有限公司","receiveDept":"煤制油公司","licenseNo":"晋L75397","id":"E4E80A59915111EDB6D05894CAF9DB1B","applicationNo":"RA-202301000531","status":"P","createTime":"2023-01-10T17:35:34.398Z","followFormNo":null,"followFormId":null,"followType":null,"followFormStatus":null,"category":null,"analysisProjectName":null,"batchNo":null,"materialType":null}]}, 6000);

    let options = {
        indicatorWidth: 50,
        actionColumn: {
            text: '操作',
            vacancy: 2,
            width: 130,
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




