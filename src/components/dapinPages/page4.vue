<template>
<div id="page4">
  <div class="title">
    主视图区：I'm page4
  </div>

  <!-- <div id="module1" @mousedown="mousedownFlag = true" @mousemove="mousemoveHandler"> -->
  <div id="module1" :class="{edit: editFlag && !moduleInSubview.module1, active: activeModuleId === 'module1'}" @click="setActiveModule">
    module1
  </div>
  <div id="module2" :class="{edit: editFlag && !moduleInSubview.module2, active: activeModuleId === 'module2'}" @click="setActiveModule">
    module2
  </div>
  <div id="module3" :class="{edit: editFlag && !moduleInSubview.module3, active: activeModuleId === 'module3'}" @click="setActiveModule">
    module3
  </div>
  <div id="module4" :class="{edit: editFlag && !moduleInSubview.module4, active: activeModuleId === 'module4'}" @click="setActiveModule">
    module4
  </div>

</div>
</template>

<script>
import './page4.scss'
window.jQuery = window.$ = require('jquery');
require('velocity-animate');

export default {
  name: 'page4',
  data() {
    return {
      // mousedownFlag: false
      activeModuleId: '',
      editFlag: false,
      moduleInSubview: {
        'module1': false,
        'module2': false,
        'module3': false,
        'module4': false
      }
    }
  },
  methods: {
    // mousemoveHandler(e) {
    //   console.log(e);
    // }
    setActiveModule(e) {
      if (!this.moduleInSubview[e.target.id]) {
        if (this.editFlag) {
          this.activeModuleId = e.target.id;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window._bus.$on('editStatusSwitch', (payload) => {
        this.editFlag = payload;
        if (!this.editFlag) {
          this.activeModuleId = '';
          for (let key in this.moduleInSubview) {
            if (this.moduleInSubview[key]) {
              window.$('#' + key).velocity('stop').velocity('reverse', {
                complete: () => {
                  this.moduleInSubview[key] = false;
                }
              });
            }
          }
        }
      });

      window._bus.$off('dragIn');
      window._bus.$on('dragIn', (payload) => {
        // let module1 = document.getElementById('module1');
        // let pos = {
        //   left: module1.getBoundingClientRect().left,
        //   top: module1.getBoundingClientRect().top
        // };

        if (!this.activeModuleId) return;
        let mainView = document.getElementById('main-view');
        let posOfMainView = {
          left: mainView.getBoundingClientRect().left,
          top: mainView.getBoundingClientRect().top
        };

        let subView = document.getElementById('sub-view');
        let posOfSubView = {
          left: subView.getBoundingClientRect().left,
          right: subView.getBoundingClientRect().right,
          top: subView.getBoundingClientRect().top,
          bottom: subView.getBoundingClientRect().bottom
        };
        let centerOfSubView = {
          left: (posOfSubView.left + posOfSubView.right) / 2,
          top: (posOfSubView.top + posOfSubView.bottom) / 2
        };
        let activeModule = document.getElementById(this.activeModuleId);
        // console.log(window.$('#main-view').css('transform'));
        let matrixArr = window.$('#main-view').css('transform').substring(7, window.$('#main-view').css('transform').length - 1).split(', ');
        let scaleX = matrixArr[0];
        let scaleY = matrixArr[3];

        let status = {
          left: (centerOfSubView.left - posOfMainView.left) / scaleX - activeModule.offsetWidth / 2,
          top: (centerOfSubView.top - posOfMainView.top) / scaleY - activeModule.offsetHeight / 2,
          rotateZ: 360,
          scale: 2
          // boxShadowBlur: '0px',
          // boxShadowSpread: '0px'
        };
        let activeModuleId = this.activeModuleId;
        this.activeModuleId = '';
        this.moduleInSubview[activeModuleId] = true;
        window.$('#' + activeModuleId).velocity('stop').velocity(status, { // 动画最终状态
          duration: 1000,
          easing: 'easeOutCubic',
          complete: () => {
          }
        });
      });

      window._bus.$off('dragOut');
      window._bus.$on('dragOut', (payload) => {
        for (let key in this.moduleInSubview) {
          if (this.moduleInSubview[key]) {
            window.$('#' + key).velocity('stop').velocity('reverse', {
              complete: () => {
                this.moduleInSubview[key] = false;
              }
            });
          }
        }
        // this.moduleInSubview = {};
      });
    });
  },
  components: {
    // ShellMain
  },
  beforeDestroy() {}
}
</script>
