import type {BasicColumn, FormSchema} from '@/components/Table'
import {useRender} from '@/components/Table'
import {DICT_TYPE, getDictOptions} from '@/utils/dict'

export const columns: BasicColumn[] = [
  {
    title: '产品名称',
    dataIndex: 'name',
    width: 160
  },
  {
    title: '产品分类',
    dataIndex: 'category',
    width: 160
  },
  {
    title: '品牌',
    dataIndex: 'brand',
    width: 160
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
    title: '产品描述',
    dataIndex: 'description',
    width: 160
  },
  {
    title: '产品图片',
    dataIndex: 'imageUrl',
    width: 160
  },
  {
    title: '进货价',
    dataIndex: 'purchasePrice',
    width: 160
  },
  {
    title: '售出价',
    dataIndex: 'salePrice',
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
    label: '产品名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    label: '产品分类',
    field: 'category',
    component: 'Input',
    colProps: { span: 8 }
  },
  {
    label: '品牌',
    field: 'brand',
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
    label: '产品名称',
    field: 'name',
    required: true,
    component: 'Input'
  },
  {
    label: '产品分类',
    field: 'category',
    required: true,
    component: 'Input'
  },
  {
    label: '品牌',
    field: 'brand',
    required: true,
    component: 'Input'
  },
  {
    label: '产品描述',
    field: 'description',
    component: 'InputTextArea'
  },
  {
    label: '产品图片',
    field: 'imageUrl',
    component: 'FileUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
    }
  },
  {
    label: '进货价',
    field: 'purchasePrice',
    required: true,
    component: 'Input'
  },
  {
    label: '售出价',
    field: 'salePrice',
    required: true,
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
    required: true,
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
    label: '产品名称',
    field: 'name',
    required: true,
    component: 'Input'
  },
  {
    label: '产品分类',
    field: 'category',
    required: true,
    component: 'Input'
  },
  {
    label: '品牌',
    field: 'brand',
    required: true,
    component: 'Input'
  },
  {
    label: '产品描述',
    field: 'description',
    component: 'InputTextArea'
  },
  {
    label: '产品图片',
    field: 'imageUrl',
    component: 'FileUpload',
    componentProps: {
      fileType: 'image',
      maxCount: 1,
    }
  },
  {
    label: '进货价',
    field: 'purchasePrice',
    required: true,
    component: 'Input'
  },
  {
    label: '售出价',
    field: 'salePrice',
    required: true,
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
    required: true,
    component: 'RadioButtonGroup',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS, 'number'),
    }
  },
]