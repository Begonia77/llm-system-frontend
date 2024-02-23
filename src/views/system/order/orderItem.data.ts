import { getSimpleProducts } from '@/api/system/products'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'

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
  //   field: 'remarks',
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
    field: 'productId0',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleProducts(),
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 7 },
    required: true,
  },
  {
    field: 'quantity0',
    component: 'InputNumber',
    colProps: { span: 5, offset: 1 },
    defaultValue: 1,
    required: true,
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'price0',
    component: 'InputNumber',
    colProps: { span: 5, offset: 1 },
    defaultValue: 0,
    required: true,
    componentProps: {
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
      api: () => getSimpleProducts(),
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
