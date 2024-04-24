import { getSimpleClient } from '@/api/system/client'
import { getListSimpleUsers } from '@/api/system/user'
import { getSimpleWarehouse } from '@/api/system/warehouse'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '订单单号',
    dataIndex: 'orderNumber',
    width: 160,
  },
  {
    title: '订单类型',
    dataIndex: 'type',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.ORDER_TYPE)
    },
  },
  {
    title: '购买数量',
    dataIndex: 'totalQuantity',
    width: 160,
  },
  {
    title: '总金额',
    dataIndex: 'totalAmount',
    width: 160,
  },
  {
    title: '客户/供应商',
    dataIndex: 'clientName',
    width: 160,
  },
  {
    title: '业务员',
    dataIndex: 'userNickname',
    width: 160,
  },
  {
    title: '仓库',
    dataIndex: 'warehouseName',
    width: 160,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 160,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    },
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '订单单号',
    field: 'orderNumber',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '仓库',
    field: 'warehouseId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleWarehouse(),
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  {
    label: '订单类型',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.ORDER_TYPE),
    },
    colProps: { span: 8 },
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
    colProps: { span: 8 },
  },
  {
    label: '业务员',
    field: 'userId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getListSimpleUsers(),
      labelField: 'nickname',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
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
  //     options: getDictOptions(DICT_TYPE.COMMON_STATUS),
  //   },
  //   colProps: { span: 8 },
  // },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
]

export const createFormSchema: FormSchema[] = [
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
]

export const updateFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '订单单号',
    field: 'orderNumber',
    component: 'Input',
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
    label: '供应商/客户id',
    field: 'clientId',
    component: 'Input',
  },
  {
    label: '客户/供应商id',
    field: 'clientId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleClient(),
      labelField: 'name',
      valueField: 'id',
    },
  },
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
  // {
  //   label: '总金额',
  //   field: 'totalAmount',
  //   component: 'Input',
  // },
  // {
  //   label: '购买数量',
  //   field: 'itemQuantity',
  //   component: 'Input',
  // },
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
]
