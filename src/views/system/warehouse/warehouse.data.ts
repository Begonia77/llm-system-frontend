import { getListSimpleUsers } from '@/api/system/user'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '仓库名称',
    dataIndex: 'name',
    width: 160,
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    width: 160,
    customRender: ({ text }) => {
      return text || 0
    },
  },
  {
    title: '仓库类型',
    dataIndex: 'type',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.WAREHOUSE_TYPE)
    },
  },
  {
    title: '仓库地址',
    dataIndex: 'address',
    width: 160,
  },
  {
    title: '仓库负责人',
    dataIndex: 'userNickname',
    width: 160,
  },
  {
    title: '库存上限',
    dataIndex: 'maxInventory',
    width: 160,
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: 160,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
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
    label: '仓库名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '仓库类型',
    field: 'type',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WAREHOUSE_TYPE),
    },
    colProps: { span: 8 },
  },
  {
    label: '仓库负责人',
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
  //   label: '库存上限',
  //   field: 'maxInventory',
  //   component: 'Input',
  //   colProps: { span: 8 },
  // },
  {
    label: '状态',
    field: 'status',
    component: 'Radio',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS),
    },
    colProps: { span: 8 },
  },
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
  {
    label: '仓库名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '仓库类型',
    field: 'type',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WAREHOUSE_TYPE, 'number'),
    },
  },
  {
    label: '仓库地址',
    field: 'address',
    component: 'Input',
  },
  {
    label: '仓库负责人',
    field: 'userId',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: () => getListSimpleUsers(),
      labelField: 'nickname',
      valueField: 'id',
    },
  },
  {
    label: '库存上限',
    field: 'maxInventory',
    required: true,
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'RadioButtonGroup',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
    },
  },
]

export const updateFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '仓库名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '仓库类型',
    field: 'type',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.WAREHOUSE_TYPE, 'number'),
    },
  },
  {
    label: '仓库地址',
    field: 'address',
    component: 'Input',
  },
  {
    label: '仓库负责人',
    field: 'userId',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: () => getListSimpleUsers(),
      labelField: 'nickname',
      valueField: 'id',
    },
  },
  {
    label: '库存上限',
    field: 'maxInventory',
    required: true,
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'RadioButtonGroup',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
    },
  },
]
