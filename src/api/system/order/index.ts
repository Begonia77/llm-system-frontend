import { defHttp } from '@/utils/http/axios'

// 查询订单列表
export function getOrderPage(params) {
  return defHttp.get({ url: '/system/order/page', params })
}

// 查询订单详情
export function getOrder(id: number) {
  return defHttp.get({ url: `/system/order/get?id=${id}` })
}

// 新增订单
export function createOrder(data) {
  return defHttp.post({ url: '/system/order/create', data })
}

// 修改订单
export function updateOrder(data) {
  return defHttp.put({ url: '/system/order/update', data })
}

// 删除订单
export function deleteOrder(id: number) {
  return defHttp.delete({ url: `/system/order/delete?id=${id}` })
}

// 导出订单 Excel
export function exportOrder(params) {
  return defHttp.download({ url: '/system/order/export-excel', params }, '订单.xls')
}