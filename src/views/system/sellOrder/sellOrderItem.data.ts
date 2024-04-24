import { ref } from 'vue'
import { getSimpleClient } from '@/api/system/client'
import { getSimpleCommodity } from '@/api/system/commodity'
import { getListSimpleUsers } from '@/api/system/user'
import { getSimpleWarehouse } from '@/api/system/warehouse'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

const commodityList = ref<any[]>([])
async function getchannelList() {
  const res = await getSimpleCommodity()
  commodityList.value = res
  commodityList.value = commodityList.value.map((item: any) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    }
  })
  console.log('commodityList.value', commodityList.value)
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
    sorter: true,
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 160,
    sorter: true,
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
    label: '客户',
    field: 'clientId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleClient(),
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
    colProps: { span: 7 },
    required: true,
    componentProps: ({ formModel }) => {
      return {
        options: commodityList.value,
        placeholder: '请选择商品',
        onChange: (e: any) => {
          const commodity = commodityList.value.find((item: any) => item.id === e)
          formModel.price0 = commodity.salePrice
        },
      }
    },
  },
  {
    field: 'quantity0',
    component: 'InputNumber',
    colProps: { span: 5, offset: 1 },
    required: true,
    componentProps: {
      defaultValue: 1,
      min: 1,
    },
  },
  {
    field: 'price0',
    component: 'InputNumber',
    colProps: { span: 5, offset: 1 },
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
      api: () => getSimpleCommodity(),
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
