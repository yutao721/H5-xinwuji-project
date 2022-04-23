<template>
  <div>
    <div class="back-top" :style="customStyle" @click="backTop()" v-show="backTopShow">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {

      // 是否一直显示
      isShowAny: {
        type: Boolean,
        default: false
      },

      // 距离顶部多少距离才出现
      // 需要isShowAny为false才起作用
      offsetTop: {
        type: Number,
        default: 200
      },

      // 每秒往上滚动的距离，最好控制在50-150之间，数值越大到顶花费的时间越短，反之数值越小到顶花费时间越长
      scrollDistance: {
        type: Number,
        default: 50
      },

      customStyle: {
        type: Object,
        default: () => {
          return {
            right: '10px',
            bottom: '100px'
          }
        }
      }
    },
    data() {
      return {
        backTopShow: false
      }
    },
    components: {},
    mounted() {
      if (!this.isShowAny) {
        window.addEventListener('scroll', this.handleScroll)
      } else {
        this.backTopShow = true
      }
    },
    methods: {
      backTop() {
        let { scrollDistance } = this
        let back = setInterval(() => {
          if (document.body.scrollTop || document.documentElement.scrollTop) {
            document.body.scrollTop -= scrollDistance
            document.documentElement.scrollTop -= scrollDistance
          } else {
            clearInterval(back)
          }
        })
      },
      handleScroll() {
        let { offsetTop } = this
        if (document.documentElement.scrollTop + document.body.scrollTop > offsetTop) {
          this.backTopShow = true
        } else {
          this.backTopShow = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 200px;
  }
</style>
