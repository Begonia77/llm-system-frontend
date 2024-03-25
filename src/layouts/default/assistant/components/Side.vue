<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import headerImg from '@/assets/images/header.jpg'

const chatList = ref<any>(localStorage.getItem('chatRecord') ? JSON.parse(localStorage.getItem('chatRecord') || '') : [])

const userStore = useUserStore()
const getUserInfo = computed(() => {
  const { nickname = '', avatar } = userStore.getUserInfo.user || {}
  return { nickname, avatar: avatar || headerImg }
})

const inputText = ref<string>('')

function send() {
  console.log('send', inputText.value)
  chatList.value.push({
    id: chatList.value.length + 1,
    user: 'user',
    content: inputText.value,
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
        与AI助手对话
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
  </div>
</template>

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
  }

  &-bubble {
    display: inline-block;
    padding: 6px 8px 6px 10px;
    margin-right: 40px;
    color: #fff;
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
    margin-left: 40px;
    color: #51606D;
    background-color: #EAEFF4;
    border-radius: 5px;
  }
}

.assistant-container {
  /* color: red; */
  width: 100%;
  height: 90vh;
  // padding-top: 10px;
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
