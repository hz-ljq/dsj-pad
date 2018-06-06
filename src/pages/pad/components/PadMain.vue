<template>
<div id='shell-main'>
  <div class='btn1' :class="{activeBtn: activeBtn === 'btn1'}" @click="goTo(1)">
    <!-- btn1 -->
  </div>
  <div class='btn2' :class="{activeBtn: activeBtn === 'btn2'}" @click="goTo(2)">
    <!-- btn2 -->
  </div>
  <div class='btn3' :class="{activeBtn: activeBtn === 'btn3'}" @click="goTo(3)">
    <!-- btn3 -->
  </div>
  <div class='btn4' :class="{activeBtn: activeBtn === 'btn4'}" @click="goTo(4)">
    <!-- btn4 -->
  </div>
  <div class='btn5' :class="{activeBtn: activeBtn === 'btn5'}" @click="goTo(5)">
    <!-- btn1 -->
  </div>
  <div class='btn6' :class="{activeBtn: activeBtn === 'btn6'}" @click="goTo(6)">
    <!-- btn2 -->
  </div>
  <div class='btn7' :class="{activeBtn: activeBtn === 'btn7'}" @click="goTo(7)">
    <!-- btn3 -->
  </div>
  <div class='btn8' :class="{activeBtn: activeBtn === 'btn8'}" @click="goTo(8)">
    <!-- btn4 -->
  </div>
  <div class='btn9' :class="{activeBtn: activeBtn === 'btn9'}" @click="goTo(9)">
    <!-- btn4 -->
  </div>

  <div id='main-view'>
    <transition name='switch' appear>
      <component :is='activeView' mode='pad'></component>
    </transition>
    <div class="border-images"></div>
  </div>

  <div id='sub-view'>
    <!-- <div class="title">
      副视图区
    </div> -->
  </div>

  <div id="edit-btn" @click="enterEditStatus">
    <div v-if="!editStatus">
      进入编辑状态
    </div>
    <div v-else>
      退出编辑状态
    </div>
  </div>

  <div id="drag-in-btn" @click="dragInHandler">
    <!-- 移入副视图 -->
  </div>

  <div id="drag-out-btn" @click="dragOutHandler">
    <!-- 移出副视图 -->
  </div>

</div>
</template>

<script>
import './PadMain.scss'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import page1 from '../../../components/dapinPages/page1.vue'
import page2 from '../../../components/dapinPages/page2.vue'
import page3 from '../../../components/dapinPages/page3.vue'
import page4 from '../../../components/dapinPages/page4.vue'

export default {
  name: 'shell',
  data() {
    return {
      activeView: 'page1',
      stompClient: null,
      editStatus: false,

      activeBtn: 'btn1'
    }
  },
  methods: {
    enterEditStatus() {
      this.editStatus = !this.editStatus;
      window._bus.$emit('editStatusSwitch', this.editStatus);
    },
    dragInHandler() {
      window._bus.$emit('dragIn', '');
    },
    dragOutHandler() {
      window._bus.$emit('dragOut', '');
    },
    goTo(pageIndex) {
      this.activeBtn = 'btn' + pageIndex;
      let view = 'page' + pageIndex;
      if (this.activeView === view) return;

      this.activeView = view;
      let json = {
        userId: 'admin1', // 发给用户id为admin1的用户
        // content: pageIndex
        content: JSON.stringify({
          eventType: 'switchPage',
          payload: pageIndex
        })
      };
      this.stompClient.send('/app/message', {}, JSON.stringify(json));
      this.editStatus = false;
    },
    initWebsocket() {
      // 建立连接对象（还未发起连接）
      let socket = new SockJS('http://47.98.129.186:8093/ws');
      // 获取 STOMP 子协议的客户端对象
      this.stompClient = Stomp.over(socket);
      // 向服务器发起websocket连接并发送CONNECT帧
      this.stompClient.connect(
        {
          'userName': 'admin2', // TODO:以【用户admin2】的身份连接websocket；
          'password': '123456'
        },
        (frame) => {
          // // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
          // this.stompClient.subscribe('/user/admin1/message', (msg) => { // TODO:订阅发送给【用户admin1】的消息；
          //   let content = JSON.parse(JSON.parse(msg.body).responseMessage);
          //   console.log(content);
          // });
        },
        (error) => {
          // 连接失败时（服务器响应 ERROR 帧）的回调方法
          alert(error)
        }
      );
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initWebsocket();

      window._bus.$on('whoDragIn', (activeModuleId) => {
        let json = {
          userId: 'admin1', // 发给用户id为admin1的用户
          content: JSON.stringify({
            eventType: 'dragIn',
            payload: JSON.stringify({
              id: activeModuleId
            })
          })
        };
        this.stompClient.send('/app/message', {}, JSON.stringify(json));
      });

      window._bus.$on('whoDragOut', () => {
        let json = {
          userId: 'admin1', // 发给用户id为admin1的用户
          content: JSON.stringify({
            eventType: 'dragOut'
          })
        };
        this.stompClient.send('/app/message', {}, JSON.stringify(json));
      });
    });
  },
  components: {
    page1,
    page2,
    page3,
    page4
  },
  beforeDestroy() {}
}
</script>
