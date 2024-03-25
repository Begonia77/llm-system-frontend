import type { App } from 'vue'
import { Input, Layout, Popconfirm } from 'ant-design-vue'
import { Button } from './Button'

export function registerGlobComp(app: App<Element>) {
  app.use(Input).use(Button).use(Layout).use(Popconfirm)
}
