<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useUserStore } from '@/store/modules/user'
import headerImg from '@/assets/images/header.jpg'
import { postLlmFeature } from '@/api/llm'

const tableDataSource = ref<any[]>([])
const tableDataColumns = ref<any[]>([])

const openDataModal = ref<boolean>(false)

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
  openDataModal.value = false
}

// const tableDataColumns = [
//   {
//     title: '仓库名称',
//     dataIndex: '仓库名称',
//     key: 'name',
//   },
//   {
//     title: '仓库类型',
//     dataIndex: '仓库类型',
//     key: '仓库类型',
//   },
//   {
//     title: '仓库地址',
//     dataIndex: '仓库地址',
//     key: '仓库地址',
//   },
//   {
//     title: '库存上限',
//     dataIndex: '库存上限',
//     key: '库存上限',
//   },
// ]

// import { postLlmFeature } from '@/api/llm'

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
  // 接口postLlmFeature
  // console.log('inputText.value', inputText.value)
  const res = await postLlmFeature({ question: inputText.value })
  console.log('res', res)
  // 模拟请求
  // const res = {
  //   code: 0,
  //   data: {
  //     type: 2,
  //     tableData: [],
  //     text: '采购订单是企业在采购过程中的重要文件，通过记录和跟踪供应商的交易历史和价格等信息，帮助企业评估供应商的可靠性和性价比，优化供应链管理。在进销存系统中，采购订单扮演着至关重要的角色，帮助企业实现高效的采购流程，降低成本，提高生产效率。',
  //   },
  // }

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
        <a-button class="first-button" type="primary" @click="send">
          发送
        </a-button>

        <a-popconfirm title="确定清空聊天记录吗？" ok-text="Yes" cancel-text="No" @confirm="clearRecord">
          <a-button size="small" type="primary" danger>
            清空记录
          </a-button>
        </a-popconfirm>
      </div>
    </div>

    <div>
      <a-modal v-model:open="openDataModal" width="1300px" title="数据展示" ok-text="确认" style="height: 600px;" @ok="hideDataModal">
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
