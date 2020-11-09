<template>
<div>
    <oa-im-header v-if="!isWechat() && $route.path !== '/login'"></oa-im-header>
    <router-view />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OaImHeader from '@/components/Header/index.vue'
import { isWechat } from '@/utils/wx'

export default defineComponent({
  components: {
    OaImHeader
  },
  methods:{
      isWechat
  }
})
</script>

<style lang="scss">
h3,
p {
    margin: 0;
    font-weight: normal;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #222;
    // background-color: #f5f5f5;
    min-height: 100vh;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #222;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>