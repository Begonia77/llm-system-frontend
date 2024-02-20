<script lang="ts" setup>
import { reactive, ref, unref } from 'vue'
import { Button, Form, FormItem, Input, InputNumber } from 'ant-design-vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { FormInstance } from 'ant-design-vue'
import { createFormSchema, updateFormSchema } from './order.data'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { BasicForm, useForm } from '@/components/Form'
import { BasicModal, useModalInner } from '@/components/Modal'
import { createOrder, getOrder, updateOrder } from '@/api/system/order'

defineOptions({ name: 'OrderModal' })

const emit = defineEmits(['success', 'register'])

const { t } = useI18n()
const { createMessage } = useMessage()
const isUpdate = ref(true)

const [registerForm, { setFieldsValue, resetFields, resetSchema, validate }] = useForm({
  labelWidth: 120,
  baseColProps: { span: 24 },
  schemas: createFormSchema,
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
interface Domain {
  productId: number | undefined
  quantity: number
  price: number
  key?: number
  orderId?: number | string
}
const formRef = ref<FormInstance>()
// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 4 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 20 },
//   },
// }
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 5 },
  },
}
const dynamicValidateForm = reactive<{ domains: Domain[] }>({
  domains: [
    {
      productId: undefined,
      quantity: 1,
      price: 0,
      key: Date.now(),
    },
  ],
})
// function submitForm() {
//   formRef.value
//     .validate()
//     .then(() => {
//       console.log('values', dynamicValidateForm.domains)
//     })
//     .catch((error) => {
//       console.log('error', error)
//     })
// }
// function resetForm() {
//   formRef.value.resetFields()
// }
function removeDomain(item: Domain) {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1)
    dynamicValidateForm.domains.splice(index, 1)
}
function addDomain() {
  dynamicValidateForm.domains.push({
    productId: undefined,
    quantity: 1,
    price: 0,
    key: Date.now(),
  })
}

async function handleSubmit() {
  try {
    const values = await validate()
    setModalProps({ confirmLoading: true })
    if (unref(isUpdate)) {
      values.orderItems = dynamicValidateForm.domains
      await updateOrder(values)
    }
    else {
      values.orderItems = dynamicValidateForm.domains
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
    </div>
    <Form
      ref="formRef"
      name="dynamic_form_item"
      :model="dynamicValidateForm"
    >
      <FormItem
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :name="['domains', index, 'value']"
        style="display: flex;"
      >
        <Input
          v-model:value="domain.productId"
          placeholder="请选择产品"
          style="width: 38%; margin-right: 8px"
        />
        <InputNumber
          v-model:value="domain.quantity"
          placeholder="购买数量"
          style="width: 25%; margin-right: 8px"
          :min="1"
        />
        <InputNumber
          v-model:value="domain.price"
          placeholder="单价"
          style="width: 25%; margin-right: 8px"
          :min="0"
          :step="0.05"
        />
        <MinusCircleOutlined
          v-if="dynamicValidateForm.domains.length > 1"
          class="dynamic-delete-button"
          @click="removeDomain(domain)"
        />
      </FormItem>
      <FormItem v-bind="formItemLayoutWithOutLabel">
        <Button type="dashed" style="width: 60%" @click="addDomain">
          <PlusOutlined />
          添加
        </Button>
      </FormItem>
      <!-- <FormItem v-bind="formItemLayoutWithOutLabel">
        <Button type="primary" html-type="submit" @click="submitForm">
          Submit
        </Button>
        <Button style="margin-left: 10px" @click="resetForm">
          Reset
        </Button>
      </FormItem> -->
    </Form>
  </BasicModal>
</template>

<style lang="less" scoped>
  .order-item-title {
    display: flex;
    justify-content: space-between;
    width: 88%;
    margin-bottom: 10px;

    &-name {
      width: 38%;
      text-align: center;
    }

    &-number {
      width: 25%;
      text-align: center;
    }

    &-price {
      width: 25%;
      text-align: center;
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
