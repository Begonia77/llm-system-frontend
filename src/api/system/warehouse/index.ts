import { defHttp } from '@/utils/http/axios'

// 查询仓库列表
export function getWarehousePage(params) {
  return defHttp.get({ url: '/system/warehouse/page', params })
}

// 查询仓库详情
export function getWarehouse(id: number) {
  return defHttp.get({ url: `/system/warehouse/get?id=${id}` })
}

// 新增仓库
export function createWarehouse(data) {
  return defHttp.post({ url: '/system/warehouse/create', data })
}

// 修改仓库
export function updateWarehouse(data) {
  return defHttp.put({ url: '/system/warehouse/update', data })
}

// 删除仓库
export function deleteWarehouse(id: number) {
  return defHttp.delete({ url: `/system/warehouse/delete?id=${id}` })
}

// 导出仓库 Excel
export function exportWarehouse(params) {
  return defHttp.download({ url: '/system/warehouse/export-excel', params }, '仓库.xls')
}