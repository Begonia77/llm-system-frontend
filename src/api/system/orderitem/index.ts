import { defHttp } from '@/utils/http/axios'

// 查询订单项列表
export function getOrderItemPage(params) {
  return defHttp.get({ url: '/system/order-item/page', params })
}

// 查询订单项详情
export function getOrderItem(id: number) {
  return defHttp.get({ url: `/system/order-item/get?id=${id}` })
}

// 新增订单项
export function createOrderItem(data) {
  return defHttp.post({ url: '/system/order-item/create', data })
}

// 修改订单项
export function updateOrderItem(data) {
  return defHttp.put({ url: '/system/order-item/update', data })
}

// 删除订单项
export function deleteOrderItem(id: number) {
  return defHttp.delete({ url: `/system/order-item/delete?id=${id}` })
}

// 导出订单项 Excel
export function exportOrderItem(params) {
  return defHttp.download({ url: '/system/order-item/export-excel', params }, '订单项.xls')
}