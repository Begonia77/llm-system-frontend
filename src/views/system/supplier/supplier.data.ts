import type {BasicColumn, FormSchema} from '@/components/Table'
import {useRender} from '@/components/Table'
import {DICT_TYPE, getDictOptions} from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '联系人',
    dataIndex: 'name',
    width: 160
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
    width: 160
  },
  {
    title: '公司名称',
    dataIndex: 'companyName',
    width: 160
  },
  {
    title: '电子邮箱',
    dataIndex: 'email',
    width: 160
  },
  {
    title: '备注',
    dataIndex: 'remarks',
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
    label: '联系人',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    label: '联系电话',
    field: 'mobile',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    label: '公司名称',
    field: 'companyName',
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
    label: '联系人',
    field: 'name',
    required: true,
    component: 'Input'
  },
  {
    label: '联系电话',
    field: 'mobile',
    required: true,
    component: 'Input'
  },
  {
    label: '公司名称',
    field: 'companyName',
    component: 'Input'
  },
  {
    label: '电子邮箱',
    field: 'email',
    component: 'Input'
  },
  {
    label: '备注',
    field: 'remarks',
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
    label: '联系人',
    field: 'name',
    required: true,
    component: 'Input'
  },
  {
    label: '联系电话',
    field: 'mobile',
    required: true,
    component: 'Input'
  },
  {
    label: '公司名称',
    field: 'companyName',
    component: 'Input'
  },
  {
    label: '电子邮箱',
    field: 'email',
    component: 'Input'
  },
  {
    label: '备注',
    field: 'remarks',
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