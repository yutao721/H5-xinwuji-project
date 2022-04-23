<template>

  <div class="index-container">
    <van-nav-bar class="nav"
                 :class="backTopShow ? 'backTopShow' : ''"
                 :title="title"
                 left-text=""
                 right-text="按钮"
                 left-arrow
                 fixed
                 border
                 @click-left="onClickLeft"
                 @click-right="onClickRight">
      <template #right>
        <van-icon name="share-o" size="18"/>
      </template>
    </van-nav-bar>

    <div class="content">
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;" id="app">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;" id="app1">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;" id="app2">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;">asd</p>
      <p style="height: 100px;background:red;margin-bottom: 10px;" id="app3">asd</p>
    </div>

    <div class="footer" @click="handleToDetail()">立即支持</div>

    <!--置顶功能-->
    <BackToTop>
      <button>我要飞</button>
    </BackToTop>
  </div>

</template>

<script>
  import BackToTop from '@/components/BackToTop'
  import Driver from 'driver.js'
  import { shepherd } from '@wytxer/shepherd-vue'

  const driver = new Driver({allowClose: false,})
  // let driver;
  export default {
    data() {
      return {
        backTopShow: false
      }
    },
    components: { BackToTop },
    computed: {
      title() {
        return this.backTopShow ? '我是标题我是标题我是标题' : ''
      }
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll)
      this.driverShow()
      // driver = this.$shepherd()
      // this.shepherd()
      driver.start()
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    },

    methods: {

      shepherd() {

        driver.addSteps([
          {
            attachTo: {
              element: document.querySelector('#app'),
              on: 'auto'
            },
            title: '顶部导航',
            text: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容。',
            buttons: [{
              action() {
                return this.next()
              },
              text: '下一步'
            }]
          },
          {
            attachTo: {
              element: document.querySelector('#app1'),
              on: 'auto'
            },
            title: '新手引导',
            text: '点击打开新手引导的操作按钮。'
          },
          {
            attachTo: {
              element: document.querySelector('#app3'),
              on: 'auto'
            },
            title: '操作按钮',
            text: '操作按钮操作按钮操作按钮操作按钮。',
            buttons: [{
              action() {
                return this.cancel()
              },
              text: '完成'
            }]
          }
        ])

        // driver.start()
      },

      driverShow() {
        driver.defineSteps([
          {
            element: '#app',
            popover: {
              title: 'i am a people',
              description: 'asds'
            }
          },
          {
            element: '#app1',
            popover: {
              title: 'i am a people',
              description: 'asds1'
            }
          },
          {
            element: '#app2',
            popover: {
              title: 'i am a people',
              description: 'asds1'
            }
          },
          {
            element: '#app3',
            popover: {
              title: 'i am a people',
              description: 'asds1'
            }
          }
        ])
      },

      onClickLeft() {
        console.log(1)
      },

      onClickRight() {
        console.log(2)
      },

      handleToDetail() {

      },

      handleScroll() {
        if (( document.body.scrollTop || document.documentElement.scrollTop ) > 200) {
          this.backTopShow = true
        } else {
          this.backTopShow = false
        }
      }
    }
  }
</script>

<style lang="scss">

  .index-container {
    background: cadetblue;
    padding-bottom: 50px;
  }

  .nav.van-nav-bar {
    background-color: transparent;
  }

  .nav.backTopShow.van-nav-bar {
    /*background-color: black;*/
  }

  .nav.van-nav-bar {
    background-color: transparent;
  }

  .nav.van-hairline--bottom::after {
    border-bottom-width: 0
  }

  .footer {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #FFF;
    background-color: blue;
    position: fixed;
    bottom: 0;
  }
</style>
