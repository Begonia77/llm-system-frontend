import { defHttp } from '@/utils/http/axios'

// 查询产品列表
export function getProductsPage(params) {
  return defHttp.get({ url: '/system/products/page', params })
}

// 查询产品详情
export function getProducts(id: number) {
  return defHttp.get({ url: `/system/products/get?id=${id}` })
}

// 新增产品
export function createProducts(data) {
  return defHttp.post({ url: '/system/products/create', data })
}

// 修改产品
export function updateProducts(data) {
  return defHttp.put({ url: '/system/products/update', data })
}

// 删除产品
export function deleteProducts(id: number) {
  return defHttp.delete({ url: `/system/products/delete?id=${id}` })
}

// 导出产品 Excel
export function exportProducts(params) {
  return defHttp.download({ url: '/system/products/export-excel', params }, '产品.xls')
}

// 获得产品精简列表
export function getSimpleProducts() {
  return defHttp.get({ url: '/system/products/list-all-simple' })
}
