<template>
<div id="app">
  <!-- <img src="./assets/logo.png">
    <router-view/> -->

  <transition name='switch' appear>
    <!-- <component :is='view'></component> -->
    <router-view mode='dapin'/>
  </transition>

  <transition name='switch'>
    <div class="mask" v-if="maskFlag"></div>
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
      stompClient: null,
      maskFlag: false,
      moduleInSubview: {
        'module1': false,
        'module2': false,
        'module3': false,
        'module4': false
      }
    }
  },
  // watch: {
  //   '$route'(to, from) {
  //     // 对路由变化作出响应...
  //     this.$router.push({path: to.params.pageName});
  //   }
  // },
  methods: {
    messageHandlerFromWebsocket(msg) {
      let content = JSON.parse(JSON.parse(msg.body).responseMessage);
      console.log(content);
      if (content.eventType === 'switchPage') {
        this.$router.push({
          path: 'page' + content.payload
        });
      } else if (content.eventType === 'dragIn') {
        let id = JSON.parse(content.payload).id;
        this.moduleInSubview[id] = true;

        let module = document.getElementById(id);
        this.maskFlag = true;
        module.style.zIndex = 1;

        let posOfModule = {
          left: module.getBoundingClientRect().left,
          top: module.getBoundingClientRect().top
        };

        let status = {
          left: module.offsetLeft - posOfModule.left + document.getElementById('app').offsetWidth / 2 - module.offsetWidth / 2,
          top: module.offsetTop - posOfModule.top + document.getElementById('app').offsetHeight / 2 - module.offsetHeight / 2,
          // rotateZ: 360,
          scale: 1
        };
        window.$('#' + id).velocity('stop').velocity(status, { // 动画最终状态
          duration: 5000,
          easing: 'easeOutCubic',
          complete: () => {
          }
        });
      } else if (content.eventType === 'dragOut') {
        for (let key in this.moduleInSubview) {
          if (this.moduleInSubview[key]) {
            this.moduleInSubview[key] = false
            window.$('#' + key).velocity('stop').velocity('reverse', {
              duration: 5000,
              easing: 'easeOutCubic',
              complete: () => {
                this.maskFlag = false;
                document.getElementById(key).style.zIndex = null;
              }
            });
          }
        }
      }
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
            this.messageHandlerFromWebsocket(msg);
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

<style lang="scss">
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
    & * {
      box-sizing: border-box;
    }
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 2000px;
    height: 450px;
    position: absolute;
    overflow: hidden;
    /* background-color: black; */
    border: 1px solid red;

    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
    }
}
</style>
