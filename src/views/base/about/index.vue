<script lang="ts" setup>
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { PageWrapper } from '@/components/Page'
import type { DescItem } from '@/components/Description'
import { Description, useDescription } from '@/components/Description'
import { DOC_URL, GITHUB_URL, SITE_URL } from '@/settings/siteSetting'

const { pkg, lastBuildTime } = __APP_INFO__

const { dependencies, devDependencies, version } = pkg

const schema: DescItem[] = []
const devSchema: DescItem[] = []

const commonTagRender = (color: string) => curVal => h(Tag, { color }, () => curVal)
const commonLinkRender = (text: string) => href => h('a', { href, target: '_blank' }, text)

const infoSchema: DescItem[] = [
  {
    label: '版本',
    field: 'version',
    render: commonTagRender('blue'),
  },
  {
    label: 'Github',
    field: 'github',
    render: commonLinkRender('Github'),
  },
]

const infoData = {
  version,
  lastBuildTime,
  doc: DOC_URL,
  preview: SITE_URL,
  github: GITHUB_URL,
  outsourcing: SITE_URL,
}

Object.keys(dependencies).forEach((key) => {
  schema.push({ field: key, label: key })
})

Object.keys(devDependencies).forEach((key) => {
  devSchema.push({ field: key, label: key })
})

const [register] = useDescription({
  title: '生产环境依赖',
  data: dependencies,
  schema,
  column: 3,
})

const [registerDev] = useDescription({
  title: '开发环境依赖',
  data: devDependencies,
  schema: devSchema,
  column: 3,
})

const [infoRegister] = useDescription({
  title: '项目信息',
  data: infoData,
  schema: infoSchema,
  column: 2,
})
</script>

<template>
  <PageWrapper>
    <Description class="enter-y" @register="infoRegister" />
    <Description class="enter-y my-4" @register="register" />
    <Description class="enter-y" @register="registerDev" />
  </PageWrapper>
</template>
