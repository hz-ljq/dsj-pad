<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <router-view/> -->

    <transition name='switch' appear>
      <!-- <component :is='view'></component> -->
      <router-view/>
    </transition>
  </div>
</template>

<script>
// import '../../assets/App.scss';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
  name: 'App',
  data() {
    return {
      stompClient: null
    }
  },
  // watch: {
  //   '$route'(to, from) {
  //     // 对路由变化作出响应...
  //     this.$router.push({path: to.params.pageName});
  //   }
  // },
  methods: {
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
            this.$router.push({path: 'page' + content});
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

  },
  beforeDestroy() {}
}
</script>

<style>
.switch-enter-active {
  animation: switch-in 1s;
}

.switch-leave-active {
  animation: switch-out 0.6s;
}
@keyframes switch-in {
  0% {
    transform: translateX(150px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
@keyframes switch-out {
  0% {
    transform: translateX(0px);
    opacity: 0.5;
  }

  100% {
    transform: translateX(-150px);
    opacity: 0;
  }
}

body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 2000px;
  height: 450px;
  position: absolute;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  /* background-color: black; */
  border: 1px solid red;
}
</style>
