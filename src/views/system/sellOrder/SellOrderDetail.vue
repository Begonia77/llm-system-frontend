<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import dayjs from 'dayjs'
import { watch } from 'vue'
import { columns } from './sellOrderItem.data'
import { getSellOrderItemPage } from '@/api/system/sellOrderItem'
import { BasicTable, useTable } from '@/components/Table'

interface Props {
  isViewDetail: boolean
  orderInfo: any
  orderData: any
  orderId: number | string
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['close'])

const [registerTable, { reload }] = useTable({
  api: () => getSellOrderItemPage({
    pageSize: 100,
    pageNo: 1,
    sellOrderId: props.orderId,
  }),
  columns,
  pagination: false,
})

function handleOk(e: MouseEvent) {
  console.log(e)
  console.log('进来了', props.orderInfo, '   ', props.orderId)
  emit('close')
}

watch(() => props.orderId, (_, oldValue) => {
  if (oldValue)
    reload()
})
</script>

<template>
  <div class="order-item-container">
    <Modal :open="props.isViewDetail" width="900px" title="订单详情" @ok="handleOk" @cancel="handleOk">
      <div class="order-item-container-text">
        客户: {{ props.orderInfo?.clientName }}
      </div>
      <div class="order-item-container-text">
        业务员: {{ props.orderInfo?.userNickname }}
      </div>
      <div class="order-item-container-text">
        创建时间: {{ dayjs(props.orderInfo?.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
      <div class="order-item-container-text">
        销售种类: {{ props.orderInfo?.totalQuantity }}
      </div>
      <div class="order-item-container-text">
        订单单号: {{ props.orderInfo?.orderNumber }}
      </div>
      <div class="order-item-container-text">
        备注: {{ props.orderInfo?.remark || '无' }}
      </div>
      <div class="order-item-container-text">
        仓库: {{ props.orderInfo?.warehouseName }}
      </div>
      <BasicTable :max-height="600" @register="registerTable" />
    </Modal>
  </div>
</template>

<style lang="less">
.order-item-container {
  &-text {
    display: inline-block;
    margin-right: 25px;
  }
}
</style>
