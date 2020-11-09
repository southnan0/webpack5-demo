<template>
<div class="header">
  <van-nav-bar :title="title" fixed z-index="99" />
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'OaImHeader',
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    this.title = this.$route.meta.title || '手机签约'
  },
  watch: {
    $route(newValue) {
      this.title = newValue?.meta?.title || '手机签约'
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 48px;
  background-color: #f5f5f5;

  >div {
    background-color: #14c6f2;

    >::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
}
</style>
