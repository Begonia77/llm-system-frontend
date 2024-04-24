import { defHttp } from '@/utils/http/axios'

// 查询订单项列表
export function getPurchaseOrderItemPage(params) {
  return defHttp.get({ url: '/system/purchase-order-item/page', params })
}

// 查询订单项详情
export function getPurchaseOrderItem(id: number) {
  return defHttp.get({ url: `/system/purchase-order-item/get?id=${id}` })
}

// 新增订单项
export function createPurchaseOrderItem(data) {
  return defHttp.post({ url: '/system/purchase-order-item/create', data })
}

// 修改订单项
export function updatePurchaseOrderItem(data) {
  return defHttp.put({ url: '/system/purchase-order-item/update', data })
}

// 删除订单项
export function deletePurchaseOrderItem(id: number) {
  return defHttp.delete({ url: `/system/purchase-order-item/delete?id=${id}` })
}

// 导出订单项 Excel
export function exportPurchaseOrderItem(params) {
  return defHttp.download({ url: '/system/purchase-order-item/export-excel', params }, '订单项.xls')
}