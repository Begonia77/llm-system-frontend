import { defHttp } from '@/utils/http/axios'

// 查询订单列表
export function getSellOrderPage(params) {
  return defHttp.get({ url: '/system/sell-order/page', params })
}

// 查询订单详情
export function getSellOrder(id: number) {
  return defHttp.get({ url: `/system/sell-order/get?id=${id}` })
}

// 新增订单
export function createSellOrder(data) {
  return defHttp.post({ url: '/system/sell-order/create', data })
}

// 修改订单
export function updateSellOrder(data) {
  return defHttp.put({ url: '/system/sell-order/update', data })
}

// 删除订单
export function deleteSellOrder(id: number) {
  return defHttp.delete({ url: `/system/sell-order/delete?id=${id}` })
}

// 导出订单 Excel
export function exportSellOrder(params) {
  return defHttp.download({ url: '/system/sell-order/export-excel', params }, '订单.xls')
}