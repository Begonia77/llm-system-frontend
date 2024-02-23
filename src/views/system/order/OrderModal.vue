<script lang="ts" setup>
import { ref, unref } from 'vue'
import { Button } from 'ant-design-vue'
import { createFormSchema, updateFormSchema } from './order.data'
import { createItemFormSchema } from './orderItem.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import { createOrder, getOrder, updateOrder } from '@/api/system/order'
import { getSimpleProducts } from '@/api/system/products'

defineOptions({ name: 'OrderModal' })

const emit = defineEmits(['success', 'register'])

const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)
const n = ref(1)
const num = ref(1)

const [registerForm, { setFieldsValue, resetFields, resetSchema, validate }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: createFormSchema,
  showActionButtonGroup: false,
  actionColOptions: { span: 23 },
})

const [registerItemForm, { validate: itemValidate, appendSchemaByField, removeSchemaByField }] = useForm({
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
    resetSchema(updateFormSchema)
    const res = await getOrder(data.record.id)
    setFieldsValue({ ...res })
  }
})

async function handleSubmit() {
  try {
    const values = await validate()
    const itemValues = await itemValidate()

    for (let i = 0; i < n.value; i++) {
      for (let j = i + 1; j < n.value; j++) {
        if (itemValues[`productId${i}`] && itemValues[`productId${j}`] && itemValues[`productId${i}`] === itemValues[`productId${j}`]) {
          createMessage.error('购买商品重复，请进行修改')
          return
        }
      }
    }

    const itemOrder: any = []
    for (let i = 0; i < n.value; i++) {
      if (itemValues[`productId${i}`]) {
        itemOrder.push({
          productId: itemValues[`productId${i}`],
          quantity: itemValues[`quantity${i}`],
          price: itemValues[`price${i}`],
        })
      }
    }

    console.log('itemValues', itemValues)
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate)) {
      values.orderItems = itemOrder
      await updateOrder(values)
    }
    else {
      console.log('itemOrder', itemOrder)
      values.orderItems = itemOrder
      console.log('values', values)
      await createOrder(values)
    }

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
        field: `productId${n.value}`,
        component: 'ApiSelect',
        componentProps: {
          api: () => getSimpleProducts(),
          labelField: 'name',
          valueField: 'id',
        },
        required: true,
        colProps: { span: 7 },
      },
      {
        field: `quantity${n.value}`,
        component: 'InputNumber',
        required: true,
        colProps: { span: 5, offset: 1 },
        defaultValue: 1,
        componentProps: {
          min: 1,
        },
      },
      {
        field: `price${n.value}`,
        component: 'InputNumber',
        required: true,
        colProps: { span: 5, offset: 1 },
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
  removeSchemaByField([`productId${field}`, `quantity${field}`, `price${field}`, `${field}`])
  num.value--
}
</script>

<template>
  <BasicModal v-bind="$attrs" :title="isUpdate ? t('action.edit') : t('action.create')" @register="registerModal" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <div class="order-item-title">
      <div class="order-item-title-name">
        订单项名称
      </div>
      <div class="order-item-title-number">
        数量
      </div>
      <div class="order-item-title-price">
        单价
      </div>
      <div class="order-item-title-button">
        <Button @click="appendField">
          增加
        </Button>
      </div>
    </div>
    <BasicForm @register="registerItemForm">
      <template #add="{ field }">
        <Button v-if="num > 1" class="ml-2" @click="() => del(field)">
          -
        </Button>
      </template>
    </BasicForm>
  </BasicModal>
</template>

<style lang="less" scoped>
  .order-item-title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &-name {
      width: 29%;
      text-align: center;
    }

    &-number {
      width: 28%;
      text-align: center;
    }

    &-price {
      width: 21%;
      text-align: center;
    }

    &-button {
      width: 19%;
      padding-left: 5%;
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
