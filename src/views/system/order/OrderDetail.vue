<script setup lang="ts">
import { Modal, Table } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { getOrderItemPage } from '@/api/system/orderitem'

interface Props {
  isViewDetail: boolean
  orderInfo: any
}

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['close'])

const orderData = ref<any>({})
const columns = [
  {
    title: '产品名称',
    dataIndex: 'productName',
    width: '26%',
  },
  {
    title: '购买数量',
    dataIndex: 'quantity',
    sorter: true,
    width: '17%',
  },
  {
    title: '单价',
    dataIndex: 'price',
    sorter: true,
    width: '17%',
  },
  {
    title: '单项总价',
    dataIndex: 'totalAmount',
    sorter: true,
    width: '17%',
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    width: '23%',
  },
]

function handleOk(e: MouseEvent) {
  console.log(e)
  emit('close')
}

async function getOrderItemPageData() {
  const res = await getOrderItemPage({
    page: 1,
    pageSize: 10,
  })
  console.log('111111', res.list)
  orderData.value = res.list
}

onMounted(() => {
  getOrderItemPageData()
})
</script>

<template>
  <div class="order-item-container">
    <Modal :open="props.isViewDetail" width="900px" title="订单详情" @ok="handleOk" @cancel="handleOk">
      <div class="order-item-container-text">
        客户/供应商姓名: {{ orderInfo?.clientName }}
      </div>
      <div class="order-item-container-text">
        创建时间: {{ dayjs(orderInfo?.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
      <div class="order-item-container-text">
        购买数量: {{ orderInfo?.itemQuantity }}
      </div>
      <div class="order-item-container-text">
        订单单号: {{ orderInfo?.orderNumber }}
      </div>
      <div class="order-item-container-text">
        备注: {{ orderInfo?.remarks || '无' }}
      </div>
      <div class="order-item-container-text">
        总金额: {{ orderInfo?.totalAmount || 0 }}
      </div>
      <div class="order-item-container-text">
        订单类型: {{ orderInfo?.type }}
      </div>
      <div class="order-item-container-text">
        仓库名称: {{ orderInfo?.warehouseName }}
      </div>
      <Table
        :columns="columns"
        :data-source="orderData"
      />
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
