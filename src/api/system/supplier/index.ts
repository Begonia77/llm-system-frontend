import { defHttp } from '@/utils/http/axios'

// 查询供应商列表
export function getSupplierPage(params) {
  return defHttp.get({ url: '/system/supplier/page', params })
}

// 查询供应商详情
export function getSupplier(id: number) {
  return defHttp.get({ url: `/system/supplier/get?id=${id}` })
}

// 新增供应商
export function createSupplier(data) {
  return defHttp.post({ url: '/system/supplier/create', data })
}

// 修改供应商
export function updateSupplier(data) {
  return defHttp.put({ url: '/system/supplier/update', data })
}

// 删除供应商
export function deleteSupplier(id: number) {
  return defHttp.delete({ url: `/system/supplier/delete?id=${id}` })
}

// 导出供应商 Excel
export function exportSupplier(params) {
  return defHttp.download({ url: '/system/supplier/export-excel', params }, '供应商.xls')
}

// 获得供应商精简列表
export function getSimpleSupplier() {
  return defHttp.get({ url: '/system/supplier/list-all-simple' })
}
