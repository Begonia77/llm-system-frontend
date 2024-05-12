<script lang="ts" setup>
import { Layout } from 'ant-design-vue'
import { computed, ref, unref } from 'vue'

import LayoutContent from './content/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutSider from './assistant/components/Side.vue'
import LayoutMultipleHeader from './header/MultipleHeader.vue'
import LayoutSideBar from './sider/index.vue'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useAppInject } from '@/hooks/web/useAppInject'
import { useLockPage } from '@/hooks/web/useLockPage'
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent'

defineOptions({ name: 'DefaultLayout' })

const LayoutFeatures = createAsyncComponent(() => import('@/layouts/default/feature/index.vue'))
const LayoutFooter = createAsyncComponent(() => import('@/layouts/default/footer/index.vue'))

const { getIsMobile } = useAppInject()
const { getShowFullHeaderRef } = useHeaderSetting()
const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting()
const isShowAssistant = ref(true)

// Create a lock screen monitor
const lockEvents = useLockPage()

const layoutClass = computed(() => {
  const cls: string[] = ['ant-layout']
  if (unref(getIsMixSidebar) || unref(getShowMenu))
    cls.push('ant-layout-has-sider')

  return cls
})
</script>

<template>
  <div class="test" @click="isShowAssistant = !isShowAssistant"/>
  <Layout class="min-h-full w-full flex flex-col" v-bind="lockEvents">
    <LayoutHeader v-if="getShowFullHeaderRef" fixed />
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout class="ml-0.25 w-full">
        <LayoutMultipleHeader />
        <Layout>
          <!-- <LayoutContent style="width: calc(100% - 350px);" /> -->
          <!-- 动态style，根据isShowAssistant决定要不要设置宽度 -->
          <LayoutContent :style="{ width: isShowAssistant ? 'calc(100% - 350px)' : '' }" />
          <a-layout-sider v-if="isShowAssistant" class="assistant" width="350" style="background-color: #f5f5f5;">
            <LayoutSider />
          </a-layout-sider>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
</template>

<style>
.test {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: 35px;
  height: 40px;
}
</style>
