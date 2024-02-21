import { getSimpleProducts } from '@/api/system/products'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '产品',
    dataIndex: 'productId',
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
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    field: 'productId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleProducts(),
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    field: 'quantity',
    component: 'Input',
  },
  {
    field: 'price',
    component: 'Input',
  },
]

export const updateItemFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '产品',
    field: 'productId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleProducts(),
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '数量',
    field: 'quantity',
    component: 'Input',
  },
  {
    label: '价格',
    field: 'price',
    component: 'Input',
  },
]
