import { defHttp } from '@/utils/http/axios'

// 查询仓库列表
export function getCategoryPage(params) {
  return defHttp.get({ url: '/system/category/page', params })
}

// 查询仓库详情
export function getCategory(id: number) {
  return defHttp.get({ url: `/system/category/get?id=${id}` })
}

// 新增仓库
export function createCategory(data) {
  return defHttp.post({ url: '/system/category/create', data })
}

// 修改仓库
export function updateCategory(data) {
  return defHttp.put({ url: '/system/category/update', data })
}

// 删除仓库
export function deleteCategory(id: number) {
  return defHttp.delete({ url: `/system/category/delete?id=${id}` })
}

// 导出仓库 Excel
export function exportCategory(params) {
  return defHttp.download({ url: '/system/category/export-excel', params }, '仓库.xls')
}

// 获得仓库精简列表
export function getSimpleCategory() {
  return defHttp.get({ url: '/system/category/list-all-simple' })
}