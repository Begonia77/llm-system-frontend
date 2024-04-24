import { defHttp } from '@/utils/http/axios'

// 查询订单项列表
export function getSellOrderItemPage(params) {
  return defHttp.get({ url: '/system/sell-order-item/page', params })
}

// 查询订单项详情
export function getSellOrderItem(id: number) {
  return defHttp.get({ url: `/system/sell-order-item/get?id=${id}` })
}

// 新增订单项
export function createSellOrderItem(data) {
  return defHttp.post({ url: '/system/sell-order-item/create', data })
}

// 修改订单项
export function updateSellOrderItem(data) {
  return defHttp.put({ url: '/system/sell-order-item/update', data })
}

// 删除订单项
export function deleteSellOrderItem(id: number) {
  return defHttp.delete({ url: `/system/sell-order-item/delete?id=${id}` })
}

// 导出订单项 Excel
export function exportSellOrderItem(params) {
  return defHttp.download({ url: '/system/sell-order-item/export-excel', params }, '订单项.xls')
}