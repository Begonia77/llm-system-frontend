<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { Layout } from 'ant-design-vue'

import { useRouter } from 'vue-router'
import { useLayoutHeight } from '../content/useContentViewHeight'

import { useRootSetting } from '@/hooks/setting/useRootSetting'

defineOptions({ name: 'LayoutFooter' })

const Footer = Layout.Footer

const { getShowFooter } = useRootSetting()
const { currentRoute } = useRouter()

const footerRef = ref<ComponentRef>(null)
const { setFooterHeight } = useLayoutHeight()

const getShowLayoutFooter = computed(() => {
  if (unref(getShowFooter)) {
    const footerEl = unref(footerRef)?.$el
    setFooterHeight(footerEl?.offsetHeight || 0)
  }
  else {
    setFooterHeight(0)
  }
  return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
})
</script>

<template>
  <Footer v-if="getShowLayoutFooter" ref="footerRef" class="text-center text-[var(--normal-text)]">
    <div>Copyright &copy;2024</div>
  </Footer>
</template>
