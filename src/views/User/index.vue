<template>
<div class="user">
  <div class="userInfo">
    <h3>{{userInfo.account}}</h3>

    <p v-if="userInfo.email">邮箱： {{userInfo.email}}</p>
  </div>

  <template v-if="userBodyList.length>0">
    <div class="title">关联主体</div>
    <oa-im-user-card v-for="user in userBodyList" :key="user.id" :userData="user || {}"></oa-im-user-card>
  </template>

  <oa-im-stick-bottom class="stick-bottom">
    <van-button block @click="logout">退出登录</van-button>
  </oa-im-stick-bottom>
</div>
</template>

<script lang="ts">
import {
  removeToken
} from '@/utils/cache'
import {
  Notify
} from 'vant'
import {
  defineComponent
} from 'vue'
import request from '../../utils/request'

import OaImStickBottom from '@/components/StickBottom/index.vue'
import OaImUserCard from './Card.vue'

export default defineComponent({
  components: {
    OaImStickBottom,
    OaImUserCard
  },
  data() {
    return {
      userInfo: {},
      phone: '',
      userBodyList: [] as any[]
    }
  },
  mounted() {
    this.getInfo()
    this.getUserBodyList()
  },
  methods: {
    async getInfo() {
      const resp = await request(
        `/web/user/getInfo`, {}, {
          method: 'get'
        }
      )

      if (resp) {
        this.userInfo = resp?.data
      }
    },
    async getUserBodyList() {
      const resp = await request(
        `/web/user/getUserBodyList`, {}, {
          method: 'get'
        }
      )

      if (resp) {
        this.userBodyList = resp?.data
      }
    },
    async logout() {
      const resp = await request(
        `/web/user/logout`, {}
      )

      if (resp) {
        Notify({
          type: 'success',
          message: '退出成功'
        })
        removeToken()
        this.$router.push('/login')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.stick-bottom {
  ::v-deep>div {
    bottom: 40px;
  }
}

.userInfo {
  background-color: #fff;
  padding: 20px;

  >h3 {
    line-height: 32px;
  }
}

.user {
  min-height: calc(100vh - 50px - 46px);
  background-color: #fff;
  overflow: hidden;

  p {
    color: #A1A7AE;
    font-size: 14px;
  }

  .title {
    background-color: #f5f5f5;
    line-height: 40px;
    padding: 0 20px;
    font-size: 14px;
  }
}
</style>
