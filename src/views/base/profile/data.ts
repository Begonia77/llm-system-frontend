/* eslint-disable prefer-promise-reject-errors */
import type { FormSchema } from '@/components/Form'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export interface ListItem {
  key: string
  title: string
  description: string
  extra?: string
  avatar?: string
  color?: string
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
  {
    key: '4',
    name: '新消息通知',
    component: 'MsgNotify',
  },
]

// 基础设置 form
export const baseSetschemas: FormSchema[] = [
  {
    field: 'nickname',
    component: 'Input',
    label: t('profile.user.nickname'),
    colProps: { span: 18 },
  },
  {
    field: 'mobile',
    component: 'Input',
    label: t('profile.user.mobile'),
    colProps: { span: 18 },
  },
  {
    field: 'email',
    component: 'Input',
    label: t('profile.user.email'),
    colProps: { span: 18 },
  },
  {
    field: 'sex',
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    label: t('profile.user.sex'),
    colProps: { span: 18 },
  },
]

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '已绑定手机：：134****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：：man***ger.com',
    extra: '修改',
  },
]

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
]

export const passwordSchema: FormSchema[] = [
  {
    field: 'oldPassword',
    label: '当前密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'newPassword',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value)
              return Promise.reject('密码不能为空')

            if (value !== values.newPassword)
              return Promise.reject('两次输入的密码不一致!')

            return Promise.resolve()
          },
        },
      ]
    },
  },
]
