<template>
<van-cell size="large" v-if="userData.type === 1">
  <template #label>
    <p>{{userData.idNo}}</p>
    <p>{{userData.idAddr}}</p>
  </template>
  <template #title>
    <p class="title">
      <span>{{userData.name}}</span>
      <van-tag v-if="stateItem.type" :type="stateItem.type">{{stateItem.label}}</van-tag>
    </p>
  </template>
</van-cell>
<van-cell v-else size="large">
  <template #label>
    <p>营业执照编码：{{userData.businessLicenceNumber}}</p>
    <p>法人：{{userData.legalPerson}}</p>
    <p>法人身份证：{{userData.legalPersonIdNo}}</p>
    <p>{{userData.idAddr}}</p>
  </template>
  <template #title>
    <p class="title">
      <span>{{userData.enterpriseName}}</span>
      <van-tag v-if="stateItem.type" :type="stateItem.type">{{stateItem.label}}</van-tag>
    </p>
  </template>
</van-cell>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
const stateMap = [{
  value: 0,
  label: '新建',
  type: ''
}, {
  value: 1,
  label: '已提交资料',
  type: 'primary'
}, {
  value: 2,
  label: '已绑定',
  type: 'primary'
}, {
  value: 3,
  label: '已实名',
  type: 'success'
}, {
  value: -1,
  label: '认证失败',
  type: 'danger'
}]
export default defineComponent({
  name: 'OaImUserCard',
  props: {
    userData: {
      type: Object as any,
      default () {
        return {}
      }
    }
  },
  computed: {
    stateItem() {
      const {
        userData
      } = this as any;
      return stateMap?.find((item: any) => {
        return item.value === userData.state
      }) || {}
    }
  }
})
</script>

<style lang="scss" scoped>
.title {
  >span {
    vertical-align: middle;

    &:first-child {
      margin-right: 10px;
    }
  }
}

p {
  line-height: 20px;
}
</style>
