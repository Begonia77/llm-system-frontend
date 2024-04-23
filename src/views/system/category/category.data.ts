import type {BasicColumn, FormSchema} from '@/components/Table'
import {useRender} from '@/components/Table'
import {DICT_TYPE, getDictOptions} from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '分类名称',
    dataIndex: 'name',
    width: 160
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 160
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
    customRender: ({ text }) => {
      return useRender.renderDate(text)
    }
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    label: '分类名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    label: '状态',
    field: 'status',
    component: 'Radio',
    componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS),
    },
    colProps: { span: 8 }
  },
  {
    label: '创建时间',
    field: 'createTime',
    component: 'RangePicker',
    colProps: { span: 8 }
  },
]

export const createFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input'
  },
  {
    label: '分类名称',
    field: 'name',
    required: true,
    component: 'Input'
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input'
  },
  {
    label: '状态',
    field: 'status',
    component: 'RadioButtonGroup',
    componentProps: {
        options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
    }
  },
]

export const updateFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input'
  },
  {
    label: '分类名称',
    field: 'name',
    required: true,
    component: 'Input'
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input'
  },
  {
    label: '状态',
    field: 'status',
    component: 'RadioButtonGroup',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
    }
  },
]