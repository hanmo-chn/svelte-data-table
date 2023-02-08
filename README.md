# Adavance-Data-Table

## 列定义

### 定义一个单行表头
```
let header = [
    {
        label: '摘要',
        field: 'summary',
        sortable: false,
        align: CellAlign.Left,
        resizable: true,
        weight: 1
    },
    {
        label: '单价',
        field: 'unitPrice',
        sortable: true,
        align: CellAlign.Right,
        resizable: false,
        format: value => utils.formatCurrency(value)
    },
    {
        label: '数量',
        field: 'amount',
        sortable: true,
        align: CellAlign.Right,
        resizable: false
    },
]
```

### 这是一个复合表头
```
let header = [
{
        label: '摘要',
        field: 'summary',
        sortable: false,
        align: CellAlign.Left,
        resizable: true,
        weight: 1
    },
    {
        label: '处理信息',
        coulumns: [
            {
                label: '处理人',
                
            },
            {
            }
        ]
    },
    {
        label: '数量',
        field: 'amount',
        sortable: true,
        align: CellAlign.Right,
        resizable: false
    },
]
```