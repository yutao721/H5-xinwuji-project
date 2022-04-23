<template>
  <div class="app-container">
    <!--页面主题-->
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <!--页面tabbar-->
    <div class="layout-footer" v-if="settings.isShowTabbar">
      <TabBar :data="tabbars" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'
  import settings from '@/settings'

  export default {
    name: 'AppLayout',
    data() {
      return {
        tabbars: [
          {
            title: '首页',
            to: {
              name: 'Home'
            },
            icon: 'home-o'
          },
          {
            title: '关于我',
            to: {
              name: 'About'
            },
            icon: 'user-o'
          }
        ],
        settings
      }
    },
    components: { TabBar },
    methods: {
      handleChange(v) {
        console.log('tab value:', v)
      }
    }
  }
</script>




