import { defHttp } from '@/utils/http/axios'

// 查询客户列表
export function getClientPage(params) {
  return defHttp.get({ url: '/system/client/page', params })
}

// 查询客户详情
export function getClient(id: number) {
  return defHttp.get({ url: `/system/client/get?id=${id}` })
}

// 新增客户
export function createClient(data) {
  return defHttp.post({ url: '/system/client/create', data })
}

// 修改客户
export function updateClient(data) {
  return defHttp.put({ url: '/system/client/update', data })
}

// 删除客户
export function deleteClient(id: number) {
  return defHttp.delete({ url: `/system/client/delete?id=${id}` })
}

// 导出客户 Excel
export function exportClient(params) {
  return defHttp.download({ url: '/system/client/export-excel', params }, '客户.xls')
}

// 获得客户精简列表
export function getSimpleClient() {
  return defHttp.get({ url: '/system/client/list-all-simple' })
}
