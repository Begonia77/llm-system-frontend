<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import * as XLSX from 'xlsx'
import { useUserStore } from '@/store/modules/user'
import headerImg from '@/assets/images/header.jpg'
import { postLlmFeature } from '@/api/llm'

const tableDataSource = ref<any[]>([])
const tableDataColumns = ref<any[]>([])

const openDataModal = ref<boolean>(false)

const isLoading = ref<boolean>(false)

function showDataModal(tableData: any[]) {
  tableDataSource.value = tableData
  tableDataColumns.value = Object.keys(tableData[0]).map((item) => {
    return {
      title: item,
      dataIndex: item,
      key: item,
      minWidth: 100,
      maxWidth: 200,
      ellipsis: true,
      resizable: true,
    }
  })
  openDataModal.value = true
}

function hideDataModal() {
  // openDataModal.value = false
  console.log('tableDataSource', tableDataSource.value)

  // 创建一个新的Workbook
  const wb = XLSX.utils.book_new()

  // 将数据转换为工作表
  const ws = XLSX.utils.json_to_sheet(tableDataSource.value)

  // 将工作表添加到Workbook中
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // 生成Excel文件
  XLSX.writeFile(wb, 'table_data.xlsx')
}

const chatList = ref<any>(localStorage.getItem('chatRecord') ? JSON.parse(localStorage.getItem('chatRecord') || '') : [])

const userStore = useUserStore()
const getUserInfo = computed(() => {
  const { nickname = '', avatar } = userStore.getUserInfo.user || {}
  return { nickname, avatar: avatar || headerImg }
})

const inputText = ref<string>('')

function processTableData(tableData: any[]) {
  const data = tableData.map((item) => {
    const keys = Object.keys(item)
    keys.forEach((key) => {
      if (key.match(/时间|time/i))
        item[key] = item[key] ? dayjs(item[key]).format('YYYY-MM-DD HH:mm:ss') : ''
    })
    return item
  })
  return data
}

async function send() {
  if (!inputText.value) {
    message.info('请输入操作')
    return
  }

  // 进行发送操作
  // const res = await postLlmFeature({ question: inputText.value })
  // console.log('res', res)
  // 发送的过程中，显示加载中
  isLoading.value = true
  // 写try catch，保证发送完之后，isLoading会变成false
  const res = await postLlmFeature({ question: inputText.value })
  isLoading.value = false

  console.log(res.data.data)

  chatList.value.push({
    id: chatList.value.length + 1,
    user: 'user',
    content: inputText.value,
  })

  chatList.value.push({
    id: chatList.value.length + 1,
    user: 'assistant',
    content: res.data.data.text,
    tableData: processTableData(res.data.data.tableData),
    type: res.data.data.type,
  })

  localStorage.setItem('chatRecord', JSON.stringify(chatList.value))
  inputText.value = ''

  // 操作完之后，让滚动条滚动到底部
  const dialogBox = document.querySelector('.dialog-box')
  dialogBox?.scrollTo(0, dialogBox.scrollHeight)
  setTimeout(() => {
    dialogBox?.scrollTo(0, dialogBox.scrollHeight)
  }, 0)
}

function clearRecord() {
  chatList.value = []
  localStorage.removeItem('chatRecord')
}

onMounted(() => {
  const dialogBox = document.querySelector('.dialog-box')
  dialogBox?.scrollTo(0, dialogBox.scrollHeight)
  setTimeout(() => {
    dialogBox?.scrollTo(0, dialogBox.scrollHeight)
  }, 0)
})
</script>

<template>
  <div class="assistant-container">
    <div class="dialog-box">
      <div class="title">
        AI助手
      </div>
      <div v-for="chat in chatList" :key="chat.id">
        <div v-if="chat.user === 'assistant'" class="assistant">
          <div class="assistant-info">
            <div class="assistant-info-avatar">
              <img src="@/assets/images/assistant.webp">
            </div>
            <div class="assistant-info-name">
              {{ chat.user }}
            </div>
            <div v-if="chat.type === 1" class="assistant-info-data" @click="showDataModal(chat.tableData)">
              查看数据
            </div>
          </div>
          <div class="assistant-bubble">
            {{ chat.content }}
          </div>
        </div>
        <div v-else class="user">
          <div class="user-info">
            <div class="user-info-name">
              {{ getUserInfo.nickname }}
            </div>
            <div class="user-info-avatar">
              <img :src="getUserInfo.avatar">
            </div>
          </div>
          <div class="user-bubble">
            {{ chat.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="input-box">
      <a-textarea v-model:value="inputText" class="input-box-textarea" :show-count="true" placeholder="请输入操作" :maxlength="50" />
      <div class="input-box-buttons">
        <a-button class="first-button" type="primary" @click="send" :disabled="isLoading">
          发送
          <LoadingOutlined v-if="isLoading" spin />
        </a-button>

        <a-popconfirm title="确定清空聊天记录吗？" ok-text="Yes" cancel-text="No" @confirm="clearRecord">
          <a-button size="small" type="primary" danger>
            清空记录
          </a-button>
        </a-popconfirm>
      </div>
    </div>

    <div>
      <a-modal v-model:open="openDataModal" width="1300px" title="数据展示" ok-text="导出" style="height: 600px;" @ok="hideDataModal">
        <a-table :data-source="tableDataSource" :columns="tableDataColumns" />
      </a-modal>
    </div>
  </div>
</template>

<style>
.ant-modal .ant-modal-body {
  padding: 20px 30px;
}
</style>

<style scoped lang="less">
.assistant {
  padding: 10px 10px 0;
  text-align: left;

  &-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &-avatar {
      width: 30px;
      height: 30px;
      margin-right: 5px;
      border-radius: 100%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }

    &-data {
      width: 60px;
      margin-left: 10px;
      font-size: 10px;
      line-height: 20px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      background-color: #5965DB;
      border-radius: 25px;
    }
  }

  &-bubble {
    display: inline-block;
    padding: 6px 8px 6px 10px;
    margin-right: 35px;
    margin-left: 10px;
    color: #fff;
    word-break: break-all;
    background-color: #5965DB;
    border-radius: 5px;
  }
}

.user {
  padding: 10px 10px 0;
  text-align: right;

  &-info {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;

    &-avatar {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      border-radius: 100%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
  }

  &-bubble {
    display: inline-block;
    padding: 6px 10px 6px 8px;
    margin-right: 10px;
    margin-left: 35px;
    color: #51606D;
    text-align: left;
    word-break: break-all;
    background-color: #EAEFF4;
    border-radius: 5px;
  }
}

.assistant-container {
  width: 100%;
  height: 90vh;
  margin-top: 10px;
  margin-left: 7px;
  overflow: auto scroll;
  background-color: #F8FAFD;
  border-radius: 10px;
}

.dialog-box {
  width: 100%;
  height: calc(100% - 100px);
  padding-bottom: 20px;
  overflow-y: auto;

  .title {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 12px 0;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    background-color: #fff;
    border-radius: 10px 10px 0 0;

  }
}

.input-box {
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 0 0 10px 10px;

  &-textarea {
    width: calc(100% - 100px);
    height: 50px;
    margin-top: 13px;
    margin-left: 10px;
  }

  &-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    height: 50px;
    margin-top: 13px;

    .first-button {
      margin-bottom: 10px;
    }

  }
}
</style>
