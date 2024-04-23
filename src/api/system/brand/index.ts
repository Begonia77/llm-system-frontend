import { defHttp } from '@/utils/http/axios'

// 查询仓库列表
export function getBrandPage(params) {
  return defHttp.get({ url: '/system/brand/page', params })
}

// 查询仓库详情
export function getBrand(id: number) {
  return defHttp.get({ url: `/system/brand/get?id=${id}` })
}

// 新增仓库
export function createBrand(data) {
  return defHttp.post({ url: '/system/brand/create', data })
}

// 修改仓库
export function updateBrand(data) {
  return defHttp.put({ url: '/system/brand/update', data })
}

// 删除仓库
export function deleteBrand(id: number) {
  return defHttp.delete({ url: `/system/brand/delete?id=${id}` })
}

// 导出仓库 Excel
export function exportBrand(params) {
  return defHttp.download({ url: '/system/brand/export-excel', params }, '仓库.xls')
}

// 获得仓库精简列表
export function getSimpleBrand() {
  return defHttp.get({ url: '/system/brand/list-all-simple' })
}