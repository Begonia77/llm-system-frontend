<script lang="ts" setup>
import { ref } from 'vue'
import SellOrderModal from './SellOrderModal.vue'
import SellOrderDetail from './SellOrderDetail.vue'
import { columns, searchFormSchema } from './sellOrder.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import { deleteSellOrder, exportSellOrder, getSellOrderPage } from '@/api/system/sellOrder'

defineOptions({ name: 'SellOrder' })

const { t } = useI18n()
const { createConfirm, createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const isViewDetail = ref(false)
const orderInfo = ref<any>({})
const orderData = ref<any>({})

const [registerTable, { getForm, reload }] = useTable({
  title: '订单列表',
  api: getSellOrderPage,
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
    orderInfo.value = record
  isViewDetail.value = !isViewDetail.value
}

async function handleExport() {
  createConfirm({
    title: t('common.exportTitle'),
    iconType: 'warning',
    content: t('common.exportMessage'),
    async onOk() {
      await exportSellOrder(getForm().getFieldsValue())
      createMessage.success(t('common.exportSuccessText'))
    },
  })
}

async function handleDelete(record: Recordable) {
  await deleteSellOrder(record.id)
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
    <SellOrderModal @register="registerModal" @success="reload()" />
    <SellOrderDetail :order-data="orderData" :order-id="orderInfo.id" :order-info="orderInfo" :is-view-detail="isViewDetail" @close="handleView" />
  </div>
</template>
