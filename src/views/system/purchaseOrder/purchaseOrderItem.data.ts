import { ref } from 'vue'
import { getSimpleSupplier } from '@/api/system/supplier'
import { getCommodityPage } from '@/api/system/commodity'
import { getListSimpleUsers } from '@/api/system/user'
import { getSimpleWarehouse } from '@/api/system/warehouse'
import type { BasicColumn, FormSchema } from '@/components/Table'

const commodityList = ref<any[]>([])
async function getchannelList() {
  const res = await getCommodityPage({ pageSize: 100, pageNo: 1 })
  commodityList.value = res.list
  commodityList.value = commodityList.value.map((item: any) => {
    return {
      ...item,
      label: `${item.brandName}/${item.name}-${item.specification}`,
      value: item.id,
    }
  })
}

getchannelList()

export const columns: BasicColumn[] = [
  {
    title: '商品',
    dataIndex: 'commodityName',
    width: 160,
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    width: 160,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 160,
  },
  {
    title: '单项总金额',
    dataIndex: 'totalAmount',
    width: 160,
  },
]

export const createItemFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '业务员',
    field: 'staffId',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: () => getListSimpleUsers(),
      labelField: 'nickname',
      valueField: 'id',
    },
  },
  {
    label: '仓库',
    field: 'warehouseId',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleWarehouse(),
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '供应商',
    field: 'supplierId',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleSupplier(),
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    field: 'title',
    label: '',
    component: 'Input',
    slot: 'title',
  },
  {
    field: 'commodityId0',
    component: 'Select',
    colProps: { span: 10 },
    required: true,
    componentProps: ({ formModel }) => {
      return {
        options: commodityList.value,
        placeholder: '请选择商品',
        onChange: (e: any) => {
          const commodity = commodityList.value.find((item: any) => item.id === e)
          formModel.price0 = commodity.purchasePrice
        },
        showSearch: true,
        optionFilterProp: 'label',
      }
    },
  },
  {
    field: 'quantity0',
    component: 'InputNumber',
    colProps: { span: 3, offset: 1 },
    required: true,
    defaultValue: 1,
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'price0',
    component: 'InputNumber',
    colProps: { span: 4, offset: 1 },
    required: true,
    componentProps: {
      defaultValue: 0,
      min: 0,
      precision: 2,
      step: 0.5,
    },
  },
  {
    field: '0',
    component: 'Input',
    label: ' ',
    slot: 'add',
    colProps: { span: 2 },
  },
]

export const updateItemFormSchema: FormSchema[] = [
  {
    field: 'commodityId0',
    component: 'ApiSelect',
    componentProps: {
      api: () => getCommodityPage({ pageSize: 100, pageNo: 1 }),
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'quantity0',
    component: 'Input',
  },
  {
    field: 'price0',
    component: 'Input',
  },
  {
    field: '0',
    component: 'Input',
    label: ' ',
    slot: 'add',
  },
]
