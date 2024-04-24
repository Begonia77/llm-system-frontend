import { defHttp } from '@/utils/http/axios'

// 查询订单列表
export function getPurchaseOrderPage(params) {
  return defHttp.get({ url: '/system/purchase-order/page', params })
}

// 查询订单详情
export function getPurchaseOrder(id: number) {
  return defHttp.get({ url: `/system/purchase-order/get?id=${id}` })
}

// 新增订单
export function createPurchaseOrder(data) {
  return defHttp.post({ url: '/system/purchase-order/create', data })
}

// 修改订单
export function updatePurchaseOrder(data) {
  return defHttp.put({ url: '/system/purchase-order/update', data })
}

// 删除订单
export function deletePurchaseOrder(id: number) {
  return defHttp.delete({ url: `/system/purchase-order/delete?id=${id}` })
}

// 导出订单 Excel
export function exportPurchaseOrder(params) {
  return defHttp.download({ url: '/system/purchase-order/export-excel', params }, '订单.xls')
}