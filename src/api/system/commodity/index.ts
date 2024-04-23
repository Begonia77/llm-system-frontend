import { defHttp } from '@/utils/http/axios'

// 查询产品列表
export function getCommodityPage(params) {
  return defHttp.get({ url: '/system/commodity/page', params })
}

// 查询产品详情
export function getCommodity(id: number) {
  return defHttp.get({ url: `/system/commodity/get?id=${id}` })
}

// 新增产品
export function createCommodity(data) {
  return defHttp.post({ url: '/system/commodity/create', data })
}

// 修改产品
export function updateCommodity(data) {
  return defHttp.put({ url: '/system/commodity/update', data })
}

// 删除产品
export function deleteCommodity(id: number) {
  return defHttp.delete({ url: `/system/commodity/delete?id=${id}` })
}

// 导出产品 Excel
export function exportCommodity(params) {
  return defHttp.download({ url: '/system/commodity/export-excel', params }, '产品.xls')
}

// 获得产品精简列表
export function getSimpleCommodity() {
  return defHttp.get({ url: '/system/commodity/list-all-simple' })
}
