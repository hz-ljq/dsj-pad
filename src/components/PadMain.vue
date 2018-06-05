<template>
<div id='shell-main'>
  <div class='btn1' @click="goTo(1)">
    btn1
  </div>
  <div class='btn2' @click="goTo(2)">
    btn2
  </div>
  <div class='btn3' @click="goTo(3)">
    btn3
  </div>
  <div class='btn4' @click="goTo(4)">
    btn4
  </div>

  <div class='views'>
    <transition name='switch' appear>
      <component :is='view'></component>
    </transition>
  </div>
</div>
</template>

<script>
import './PadMain.scss'
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

import page1 from './pages/page1.vue'
import page2 from './pages/page2.vue'
import page3 from './pages/page3.vue'
import page4 from './pages/page4.vue'

export default {
  name: 'shell',
  data() {
    return {
      view: 'page1',
      stompClient: null
    }
  },
  methods: {
    goTo(pageIndex) {
      this.view = 'page' + pageIndex;
      let json = {
        userId: 'admin1', // 发给用户id为admin1的用户
        content: pageIndex
      };
      this.stompClient.send('/app/message', {}, JSON.stringify(json));
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
          // 连接成功时（服务器响应 CONNECTED 帧）的回调方法
          this.stompClient.subscribe('/user/admin1/message', (msg) => { // TODO:订阅发送给【用户admin1】的消息；
            let content = JSON.parse(JSON.parse(msg.body).responseMessage);
            console.log(content);
          });
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
