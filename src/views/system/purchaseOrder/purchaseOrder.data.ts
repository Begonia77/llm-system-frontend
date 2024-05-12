import { getSimpleSupplier } from '@/api/system/supplier'
import { getListSimpleUsers } from '@/api/system/user'
import { getSimpleWarehouse } from '@/api/system/warehouse'
import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '订单单号',
    dataIndex: 'orderNumber',
    width: 160,
  },
  {
    title: '供应商',
    dataIndex: 'supplierName',
    width: 160,
  },
  {
    title: '仓库',
    dataIndex: 'warehouseName',
    width: 160,
  },
  {
    title: '业务员',
    dataIndex: 'userNickname',
    width: 160,
  },
  {
    title: '总金额',
    dataIndex: 'totalAmount',
    width: 160,
  },
  {
    title: '采购种类',
    dataIndex: 'totalQuantity',
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
    label: '供应商',
    field: 'supplierId',
    component: 'ApiSelect',
    componentProps: {
      api: () => getSimpleSupplier(),
      labelField: 'name',
      valueField: 'id',
    },
    colProps: { span: 8 },
  },
  // {
  //   label: '业务员',
  //   field: 'userId',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     api: () => getListSimpleUsers(),
  //     labelField: 'nickname',
  //     valueField: 'id',
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
  {
    label: '订单单号',
    field: 'orderNumber',
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
    label: '供应商',
    field: 'supplierId',
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
]
