<script lang="ts" setup>
import { ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { createItemFormSchema, updateItemFormSchema } from './purchaseOrderItem.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import { createPurchaseOrder, getPurchaseOrder } from '@/api/system/purchaseOrder'
import { getCommodityPage } from '@/api/system/commodity'

defineOptions({ name: 'PurchaseOrderModal' })

const emit = defineEmits(['success', 'register'])

const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)
const n = ref(1)
const num = ref(1)

const commodityList = ref<any[]>([])
async function getchannelList() {
  const res = await getCommodityPage({ pageSize: 100, pageNo: 1 })
  commodityList.value = res.list
  commodityList.value = commodityList.value.map((item: any) => {
    return {
      ...item,
      label: `${item.brandName}/${item.name} - ${item.specification}`,
      value: item.id,
    }
  })
}

getchannelList()

const [registerItemForm, { resetFields, resetSchema, setFieldsValue, validate: itemValidate, appendSchemaByField, removeSchemaByField }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: createItemFormSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  resetFields()
  setModalProps({ confirmLoading: false })
  isUpdate.value = !!data?.isUpdate
  if (unref(isUpdate)) {
    resetSchema(updateItemFormSchema)
    const res = await getPurchaseOrder(data.record.id)
    setFieldsValue({ ...res })
  }
})

async function handleSubmit() {
  try {
    const itemValues = await itemValidate()

    for (let i = 0; i < n.value; i++) {
      for (let j = i + 1; j < n.value; j++) {
        if (itemValues[`commodityId${i}`] && itemValues[`commodityId${j}`] && itemValues[`commodityId${i}`] === itemValues[`commodityId${j}`]) {
          createMessage.error('购买商品重复，请进行修改')
          return
        }
      }
    }

    const itemOrder: any = []
    for (let i = 0; i < n.value; i++) {
      if (itemValues[`commodityId${i}`]) {
        itemOrder.push({
          commodityId: itemValues[`commodityId${i}`],
          quantity: itemValues[`quantity${i}`],
          price: itemValues[`price${i}`],
        })
        delete itemValues[`commodityId${i}`]
        delete itemValues[`quantity${i}`]
        delete itemValues[`price${i}`]
        delete itemValues[`${i}`]
      }
    }

    setModalProps({ confirmLoading: true })
    itemValues.purchaseOrderItems = itemOrder
    await createPurchaseOrder(itemValues)

    closeModal()
    emit('success')
    createMessage.success(t('common.saveSuccessText'))
  }
  finally {
    setModalProps({ confirmLoading: false })
  }
}

function appendField() {
  appendSchemaByField(
    [
      {
        field: `commodityId${n.value}`,
        component: 'Select',
        componentProps: (data) => {
          console.log(commodityList.value)
          return {
            options: commodityList.value,
            placeholder: '请选择商品',
            onChange: (e: any) => {
              const { formActionType, formModel, schema } = data

              const { getFieldsValue } = formActionType
              const resultValue = getFieldsValue()
              const commodity = commodityList.value.find((item: any) => item.id === e)
              if (resultValue.type === 1)
                formModel[`price${schema.field.replace('commodityId', '')}`] = commodity.purchasePrice
              else
                formModel[`price${schema.field.replace('commodityId', '')}`] = commodity.salePrice
            },
            showSearch: true,
            optionFilterProp: 'label',
          }
        },
        required: true,
        colProps: { span: 10 },
      },
      {
        field: `quantity${n.value}`,
        component: 'InputNumber',
        required: true,
        colProps: { span: 3, offset: 1 },
        defaultValue: 1,
        componentProps: {
          min: 1,
        },
      },
      {
        field: `price${n.value}`,
        component: 'InputNumber',
        required: true,
        colProps: { span: 4, offset: 1 },
        defaultValue: 0,
        componentProps: {
          min: 0,
          precision: 2,
          step: 0.5,
        },
      },
      {
        field: `${n.value}`,
        component: 'Input',
        label: ' ',
        slot: 'add',
        colProps: { span: 2 },
      },
    ],
    '',
  )
  n.value++
  num.value++
}

function del(field: number) {
  removeSchemaByField([`commodityId${field}`, `quantity${field}`, `price${field}`, `${field}`])
  num.value--
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerItemForm">
      <template #title>
        <div class="order-item-title">
          <div class="order-item-title-name">
            商品及规格
          </div>
          <div class="order-item-title-number">
            数量
          </div>
          <div class="order-item-title-price">
            单价
          </div>
          <div class="order-item-title-button">
            <Button type="primary" @click="appendField">
              增加
            </Button>
          </div>
        </div>
      </template>
      <template #add="{ field }">
        <Button v-if="num > 1" style="margin-left: -0.5rem;" danger @click="() => del(field)">
          -
        </Button>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style lang="less" scoped>
  .order-item-title {
    display: flex;

    &-name {
      width: 41%;
      margin-right: 4%;
      text-align: center;
    }

    &-number {
      width: 13%;
      margin-right: 4%;
      text-align: center;
    }

    &-price {
      width: 17%;
      margin-right: 5%;
      text-align: center;
    }

    &-button {
      width: 16%;
    }
  }

  .dynamic-delete-button {
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    transition: all 0.3s;
  }

  .dynamic-delete-button:hover {
    color: #777;
  }

  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
