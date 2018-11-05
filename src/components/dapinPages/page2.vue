<template>
<div id="page2">
  <div id="video1" data-id="video1" :class="{edit: editFlag && !moduleInSubview.video1, active: activeModuleId.includes('video1')}" @click="setActiveModule">
    <!-- video1 -->
    Comp-1
  </div>

  <div id="video2" data-id="video2" :class="{edit: editFlag && !moduleInSubview.video2, active: activeModuleId.includes('video2')}" @click="setActiveModule">
    <!-- video2 -->
    Comp-13
  </div>

  <div id="pies" data-id="pies" :class="{edit: editFlag && !moduleInSubview.pies, active: activeModuleId.includes('pies')}" @click="setActiveModule">
    Comp-2
    <!-- <div id="pie1">
      pie1
    </div>
    <div id="pie2">
      pie2
    </div> -->
  </div>

  <div id="bar1" data-id="bar1" :class="{edit: editFlag && !moduleInSubview.bar1, active: activeModuleId.includes('bar1')}" @click="setActiveModule">
    <!-- bar1 -->
    Comp-4
  </div>

  <div id="bar2" data-id="bar2" :class="{edit: editFlag && !moduleInSubview.bar2, active: activeModuleId.includes('bar2')}" @click="setActiveModule">
    <!-- bar2 -->
    Comp-5
  </div>

  <div id="pyramid" data-id="pyramid" :class="{edit: editFlag && !moduleInSubview.pyramid, active: activeModuleId.includes('pyramid')}" @click="setActiveModule">
    <!-- pyramid -->
    Comp-3
  </div>

  <div id="map" data-id="map" :class="{edit: editFlag && !moduleInSubview.map, active: activeModuleId.includes('map')}" @click="setActiveModule">
    <!-- map -->
    Comp-6
  </div>

  <div id="mini-map" data-id="mini-map" :class="{edit: editFlag && !moduleInSubview['mini-map'], active: activeModuleId.includes('mini-map')}" @click="setActiveModule">
    <!-- ini-map -->
    Comp-8
  </div>

  <div id="announcement" data-id="announcement" :class="{edit: editFlag && !moduleInSubview.announcement, active: activeModuleId.includes('announcement')}" @click="setActiveModule">
    <!-- announcement -->
    Comp-7
  </div>

  <div id="pictorial-bar" data-id="pictorial-bar" :class="{edit: editFlag && !moduleInSubview['pictorial-bar'], active: activeModuleId.includes('pictorial-bar')}" @click="setActiveModule">
    <!-- pictorial-bar -->
    Comp-9
  </div>

  <div id="radar" data-id="radar" :class="{edit: editFlag && !moduleInSubview.radar, active: activeModuleId.includes('radar')}" @click="setActiveModule">
    <!-- radar -->
    Comp-10
  </div>

  <div id="lines" data-id="lines" :class="{edit: editFlag && !moduleInSubview.lines, active: activeModuleId.includes('lines')}" @click="setActiveModule">
    <!-- <div id="line1">
      line1
    </div>
    <div id="line2">
      line2
    </div> -->
    Comp-12
  </div>

  <div id="picture" data-id="picture" :class="{edit: editFlag && !moduleInSubview.picture, active: activeModuleId.includes('picture')}" @click="setActiveModule">
    <!-- picture -->
    Comp-11
  </div>

</div>
</template>

<script>
import './page2.scss';
import echarts from 'echarts';
import options from './options';
window.jQuery = window.$ = require('jquery');
require('velocity-animate');

export default {
  name: 'page2',
  props: ['mode'],
  data() {
    return {
      // mousedownFlag: false
      // activeModuleId: '',
      activeModuleId: [],
      editFlag: false,
      moduleInSubview: {
        'video1': false,
        'video2': false,
        'pies': false,
        'bar1': false,
        'bar2': false,
        'pyramid': false,
        'map': false,
        'mini-map': false,
        'announcement': false,
        'pictorial-bar': false,
        'radar': false,
        'lines': false,
        'picture': false
      },

      layout: {},

      'pie1': null,
      'pie2': null,
      'bar1': null,
      'bar2': null,
      'pyramid': null,
      'pictorial-bar': null,
      'radar': null,
      'line1': null,
      'line2': null
    }
  },
  methods: {
    // mousemoveHandler(e) {
    //   console.log(e);
    // }
    // setActiveModule(e) {
    //   console.log(e);
    //   for (let x of e.path) {
    //     if (x.id && window.$('#' + x.id).attr('data-id')) {
    //       console.log(x.id);
    //       if (!this.moduleInSubview[x.id]) {
    //         if (this.editFlag) {
    //           this.activeModuleId = x.id;
    //         }
    //       }
    //       break;
    //     }
    //   }
    // },
    setActiveModule(e) {
      console.log(e);
      for (let x of e.path) {
        if (x.id && window.$('#' + x.id).attr('data-id')) {
          console.log(x.id);
          if (!this.moduleInSubview[x.id]) {
            if (this.editFlag) {
              if (this.activeModuleId.length < 2) {
                if (!this.activeModuleId.includes(x.id)) {
                  this.activeModuleId.push(x.id);
                }
              }
            }
          }
          break;
        }
      }
    },
    initEcharts() {
      this.pie1 = echarts.init(document.getElementById('pie1'));
      this.pie2 = echarts.init(document.getElementById('pie2'));
      this.bar1 = echarts.init(document.getElementById('bar1'));
      this.bar2 = echarts.init(document.getElementById('bar2'));
      // this.pyramid = echarts.init(document.getElementById('pyramid'));
      this['pictorial-bar'] = echarts.init(document.getElementById('pictorial-bar'));
      this.radar = echarts.init(document.getElementById('radar'));
      this.line1 = echarts.init(document.getElementById('line1'));
      this.line2 = echarts.init(document.getElementById('line2'));

      this.pie1.setOption(options.pie1);
      this.pie2.setOption(options.pie2);
      this.bar1.setOption(options.bar1);
      this.bar2.setOption(options.bar2);
      this.radar.setOption(options.radar);
      this['pictorial-bar'].setOption(options['pictorial-bar']);
      this.line1.setOption(options.line1);
      this.line2.setOption(options.line2);
    },
    backupLayout() {
      for (let key in this.moduleInSubview) {
        let dom = document.getElementById(key);
        this.layout[key] = {
          left: dom.offsetLeft,
          top: dom.offsetTop
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.backupLayout();
      // this.initEcharts();
      if (this.mode === 'pad') {
        window._bus.$off('editStatusSwitch').$on('editStatusSwitch', (payload) => {
          this.editFlag = payload;
          if (!this.editFlag) {
            this.activeModuleId = [];
            // for (let key in this.moduleInSubview) {
            //   if (this.moduleInSubview[key]) {
            //     window.$('#' + key).velocity('stop').velocity('reverse', {
            //       complete: () => {
            //         this.moduleInSubview[key] = false;
            //       }
            //     });
            //   }
            // }
            for (let key in this.moduleInSubview) {
              if (this.moduleInSubview[key]) {
                let status = {
                  left: this.layout[key].left,
                  top: this.layout[key].top,
                  rotateZ: -360,
                  scale: 1
                  // boxShadowBlur: '0px',
                  // boxShadowSpread: '0px'
                };
                window.$('#' + key).velocity('stop').velocity(status, {
                  duration: 1000,
                  easing: 'easeOutCubic',
                  complete: () => {
                    this.moduleInSubview[key] = false;
                  }
                });
              }
            }
          }
        });

        window._bus.$off('dragIn').$on('dragIn', (payload) => {
          // if (!this.activeModuleId) return;
          if (this.activeModuleId.length === 0) return;

          // window._bus.$emit('dragOut', '');

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

          let matrixArr = window.$('#main-view').css('transform').substring(7, window.$('#main-view').css('transform').length - 1).split(', ');
          let scaleX = matrixArr[0];
          let scaleY = matrixArr[3];

          this.activeModuleId.forEach((item, index) => {
            let activeModule = document.getElementById(item);
            // console.log(window.$('#main-view').css('transform'));

            let scaleBase = activeModule.offsetWidth * scaleX / (activeModule.offsetHeight * scaleY) >= (subView.offsetWidth / this.activeModuleId.length) / subView.offsetHeight
            let scaleVal = scaleBase ? subView.offsetWidth / this.activeModuleId.length / (activeModule.offsetWidth * scaleX) : subView.offsetHeight / (activeModule.offsetHeight * scaleY)
            // console.log(scaleBase);
            let status = {
              left: (centerOfSubView.left - posOfMainView.left) / this.activeModuleId.length / scaleX - activeModule.offsetWidth / 2 + subView.offsetWidth / 2 * (index % 2) / scaleX,
              top: (centerOfSubView.top - posOfMainView.top) / scaleY - activeModule.offsetHeight / 2,
              rotateZ: 360,
              scale: scaleVal * 0.85
              // boxShadowBlur: '0px',
              // boxShadowSpread: '0px'
            };
            // let status = {
            //   left: 900,
            //   top: 700,
            //   rotateZ: 360,
            //   scale: 1
            // };
            this.moduleInSubview[item] = true;
            window.$('#' + item).velocity('stop').velocity(status, { // 动画最终状态
              duration: 1000,
              easing: 'easeOutCubic',
              complete: () => {
                // this.activeModuleId = [];
              }
            });
            window._bus.$emit('whoDragIn', item);
          })
        });

        window._bus.$off('dragOut').$on('dragOut', (payload) => {
          this.activeModuleId = [];
          for (let key in this.moduleInSubview) {
            if (this.moduleInSubview[key]) {
              let status = {
                left: this.layout[key].left,
                top: this.layout[key].top,
                rotateZ: -360,
                scale: 1
                // boxShadowBlur: '0px',
                // boxShadowSpread: '0px'
              };
              window.$('#' + key).velocity('stop').velocity(status, {
                duration: 1000,
                easing: 'easeOutCubic',
                complete: () => {
                  this.moduleInSubview[key] = false;
                }
              });
            }
          }
          window._bus.$emit('whoDragOut', '');
        });
      }
    });
  },
  components: {
    // ShellMain
  },
  beforeDestroy() {

  }
}
</script>
