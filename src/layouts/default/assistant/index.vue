<script lang="ts" setup>
import { Icon } from '@/components/Icon'

defineOptions({ name: 'AssistantButton' })

// 打开助手对话框
function openAssistantDialog (visible: boolean) {
  console.log('openDrawer', visible)
}
</script>

<template>
  <div @click="openAssistantDialog(true)">
    <Icon class="h-4 w-4" icon="ion:layers-outline" />
  </div>
</template>
