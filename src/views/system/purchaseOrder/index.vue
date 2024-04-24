<script lang="ts" setup>
import { ref } from 'vue'
import PurchaseOrderModal from './PurchaseOrderModal.vue'
import PurchaseOrderDetail from './PurchaseOrderDetail.vue'
import { columns, searchFormSchema } from './purchaseOrder.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { deletePurchaseOrder, exportPurchaseOrder, getPurchaseOrderPage } from '@/api/system/purchaseOrder'

defineOptions({ name: 'PurchaseOrder' })

const { t } = useI18n()
const { createConfirm, createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const isViewDetail = ref(false)
const purchaseOrderInfo = ref<any>({})
const purchaseOrderData = ref<any>({})

const [registerTable, { getForm, reload }] = useTable({
  title: '订单列表',
  api: getPurchaseOrderPage,
  columns,
  formConfig: { labelWidth: 120, schemas: searchFormSchema },
  useSearchForm: true,
  showTableSetting: true,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

function handleCreate() {
  openModal(true, { isUpdate: false })
}

async function handleView(record: Recordable) {
  console.log('执行了', record)
  if (!isViewDetail.value)
    purchaseOrderInfo.value = record
  isViewDetail.value = !isViewDetail.value
}

async function handleExport() {
  createConfirm({
    title: t('common.exportTitle'),
    iconType: 'warning',
    content: t('common.exportMessage'),
    async onOk() {
      await exportPurchaseOrder(getForm().getFieldsValue())
      createMessage.success(t('common.exportSuccessText'))
    },
  })
}

async function handleDelete(record: Recordable) {
  await deletePurchaseOrder(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}
</script>

<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
        <a-button :pre-icon="IconEnum.EXPORT" @click="handleExport">
          {{ t('action.export') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.VIEW, label: t('action.view'), onClick: handleView.bind(null, record) },
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <PurchaseOrderModal @register="registerModal" @success="reload()" />
    <PurchaseOrderDetail :order-data="purchaseOrderData" :order-id="purchaseOrderInfo.id" :order-info="purchaseOrderInfo" :is-view-detail="isViewDetail" @close="handleView" />
  </div>
</template>
