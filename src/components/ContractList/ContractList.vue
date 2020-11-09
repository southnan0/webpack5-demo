<template>
<div class="fixed-btn-cnt">
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model:loading="loading" v-model:error="error" error-text="请求失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.id" :title="item.name" @click="goToDetail(item)" value-class="ContractList-tag">
        <span>{{ item.stateName }} </span>
        <template #label>
          <p>{{ item.contractName }}</p>
          <p>{{item.bizName}}&nbsp;|&nbsp;{{ item.companyName }}</p>
          <p v-if="item.state === 1">合同签约期限： {{ formatTime(item.limitTime) }}</p>
        </template>
      </van-cell>
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import {
  defineComponent
} from 'vue'
import request from '../../utils/request';
const stateMap = [{
  value: 0,
  label: '新建',
  type: ''
}, {
  value: 1,
  label: '签约中',
  type: 'primary'
}, {
  value: -1,
  label: '已过期',
  type: 'danger'
}, {
  value: -2,
  label: '已撤销',
  type: 'warning'
}, {
  value: 5,
  label: '待审核',
  type: 'primary'
}, {
  value: 6,
  label: '审核通过',
  type: 'primary'
}, {
  value: 10,
  label: '已完成',
  type: 'success'
}, {
  value: -10,
  label: '拒签',
  type: 'warning'
}]

export default defineComponent({
  name: 'ContractList',
  props: {
    state: {
      type: Array,
      default: () => {
        return [1, 5]
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      list: []
    }
  },
  methods: {
    async onLoad() {
      const _start = this.list.length
      const resp = await request(
        `/web/contract/queryList`, {
          _searching: JSON.stringify({
            states: this.state
          }),
          _start,
          _length: 10
        }, {
          method: "get",
          hideLoading: true
        }
      );

      if (resp) {
        const {
          totalCount,
          dataList
        } = resp.data;
        this.list = this.list.concat(dataList)

        if (this.refreshing) {
          this.refreshing = false
        }
        if (this.error) {
          this.error = false;
        }
        if (totalCount <= this.list.length) {
          this.finished = true
        }
      } else {
        this.error = true;
      }
      this.loading = false;
    },
    goToDetail(item: any) {
      this.$router.push({
        path: `/list/${item.id}`
      })
    },
    onRefresh() {
      this.finished = false;
      this.list = [];
      this.loading = true;
      this.onLoad();
    },
    formatTime(time: number) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      }
      return ''
    },
    getStateType(state: number) {
      return stateMap?.find((item: any) => {
        return item.value === state
      })?.type
    }
  }
})
</script>

<style lang="scss" scoped>
p {
  margin: 5px 0;
}

.fixed-btn-cnt {
  padding-bottom: 50px;
}
</style><style lang="scss">
.ContractList-tag {
  max-width: 60px;
}
</style>
