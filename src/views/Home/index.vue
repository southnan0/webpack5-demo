<template>
  <div>
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="item in tabList" :key="item.title" :icon="item.icon" :to="item.link" :name="item.link">
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  components: { 'van-tabbar': Tabbar, 'van-tabbar-item': TabbarItem },
  data() {
    return {
      tabList: [{
        link: '/list',
        title: '待签约',
        icon: 'todo-list-o'
      }, {
        link: '/history',
        title: '签约历史',
        icon: 'clock-o'
      }, {
        link: '/user',
        title: '我的',
        icon: 'user-o'
      }]
    }
  },
  computed: {
    active() {
      return this.$route.path
    }
  }
}
</script>
