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
    title: '产品',
    dataIndex: 'productName',
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

export const searchItemFormSchema: FormSchema[] = [
  // {
  //   label: '备注',
  //   field: 'remark',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  // {
  //   label: '状态',
  //   field: 'status',
  //   component: 'Radio',
  //   componentProps: {
  //       options: getDictOptions(DICT_TYPE.COMMON_STATUS),
  //   },
  //   colProps: { span: 8 }
  // },
  // {
  //   label: '创建时间',
  //   field: 'createTime',
  //   component: 'RangePicker',
  //   colProps: { span: 8 },
  // },
]

export const createItemFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  // {
  //   label: '订单单号',
  //   field: 'orderNumber',
  //   component: 'Input',
  // },
  {
    label: '业务员',
    field: 'userId',
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
    label: '订单类型',
    field: 'type',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.ORDER_TYPE, 'number'),
    },
  },
  {
    label: '客户/供应商',
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
  // {
  //   label: '状态',
  //   field: 'status',
  //   required: true,
  //   component: 'RadioButtonGroup',
  //   componentProps: {
  //     options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
  //   },
  // },
  {
    field: 'title',
    label: '',
    component: 'Input',
    slot: 'title',
  },
  {
    field: 'productId0',
    component: 'Select',
    colProps: { span: 7 },
    required: true,
    componentProps: ({ formModel, formActionType }) => {
      return {
        options: commodityList.value,
        placeholder: '请选择商品',
        onChange: (e: any) => {
          const { getFieldsValue } = formActionType
          const resultValue = getFieldsValue()
          const product = commodityList.value.find((item: any) => item.id === e)
          if (resultValue.type === 1)
            formModel.price0 = product.purchasePrice
          else
            formModel.price0 = product.salePrice
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
    field: 'productId0',
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
