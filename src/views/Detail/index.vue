<template>
<div class="header">
  <h3>{{detailData.name}}</h3>
  <p>{{ detailData.contractName }}</p>
  <p>{{detailData.detailDescription}}</p>
  <p v-if="detailData.state === 1">合同签约期限： {{ formatTime(detailData.limitTime) }}</p>
</div>
<div class="detail">
  <van-steps direction="vertical" :active="detailData.currentStep-1">
    <van-step v-for="(step) in detailData.steps" :key="step.step">
      <div class="step-content">
        <div class="flex-1">
          <h3>
            {{ step.stepName }}
          </h3>
          <p>{{ step.remark }}</p>
        </div>
        <div class="step-btn" v-if="[0,1,5,6].indexOf !==-1">
          <van-button @click="ssqBindRelieve" v-if="show(step)" type="danger" plain>解除绑定</van-button>
          <van-button @click="goToEdit(step)" v-if="detailData.currentStep === step.step && [1,2,3,4].indexOf(step.type) !==-1" plain type="primary">
            前往
            <van-icon name="arrow" />
          </van-button>
        </div>
      </div>
    </van-step>
  </van-steps>
</div>
</template>

<script lang="ts">
import request from '../../utils/request'
import {
  defineComponent
} from 'vue'
import {
  Notify
} from 'vant'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'Detail',
  data: () => {
    return {
      detailData: {},
      ssqBindLink: '',
      signLink: ''
    }
  },
  mounted() {
    this.detail()
  },
  methods: {
    formatTime(time: number) {
      if (time) {
        return dayjs(time).format('YYYY-MM-DD')
      }
      return ''
    },
    show(step: any) {
      return step.type === 2 && process.env.NODE_ENV === 'development'
    },
    async detail() {
      const resp = await request(
        `/web/contract/detail`, {
          entryId: this.$route.params.id
        }, {
          method: "get"
        }
      );

      if (resp) {
        let steps: any[] = [];
        try {
          steps = JSON.parse(resp?.data?.flowDefJson)
        } catch (e) {
          console.info(e)
        }
        const {
          currentStep
        } = resp?.data
        const currentType = steps?.find((item: any) => {
          return item.step === currentStep
        })?.type
        if (currentType === 2) {
          this.getSsqBlindLink()
        } else if (currentType === 4) {
          this.getSignLink(currentStep)
        }
        // {{ detailData.bizName }}&nbsp;&nbsp;{{ formatTime(detailData.limitTime) }} | {{ detailData.companyName }}
        const arrDescription = [resp.data?.bizName, resp.data?.companyName];
        this.detailData = {
          detailDescription: arrDescription?.filter(item => item)?.join(' | '),
          ...resp.data,
          steps
        };
      }
    },
    goToEdit({
      type
    }: any) {
      const {
        path
      } = this.$route;

      switch (type) {
        case 1:
          this.$router.push(`${path}/information`)
          break;
        case 2:
          if (!this.ssqBindLink) return;
          return location.href = this.ssqBindLink;
        case 3:
          this.$router.push(`${path}/contract`)
          break;
        case 4:
          return location.href = this.signLink;
      }
    },
    async getSsqBlindLink() {
      const resp = await request(
        `/web/contract/ssqBindLink`, {
          entryId: this.$route.params.id
        }, {
          method: "get"
        }
      );

      if (resp) {
        this.ssqBindLink = resp.data
      }
    },
    async getSignLink(step: Number) {
      const resp = await request(
        `/web/contract/sendContract`, {
          entryId: this.$route.params.id,
          step
        }
      );

      if (resp) {
        this.signLink = resp.data
      }
    },
    async ssqBindRelieve() {
      const resp = await request(
        `/web/contract/ssqBindRelieve`, {
          entryId: this.$route.params.id
        }, {
          method: 'get'
        }
      )

      if (resp) {
        Notify({
          type: 'success',
          message: '解绑成功'
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  padding-bottom: 0;

  >h3 {
    font-size: 16px;
    line-height: 30px;
  }

  >p {
    font-size: 12px;
    margin-bottom: 5px;
    color: #a1a7ae;
  }
}

.detail {
  margin-top: 10px;

  h3 {
    font-size: 14px;
    min-height: 30px;
  }

  ::v-deep .van-step__icon {
    font-size: 18px;
  }

  .step-content {
    display: flex;
    color: #222;
    padding: 0 0 10px 0;

    p {
      color: #A1A7AE;
      margin-bottom: 5px;
      line-height: 20px;
    }
  }

  .flex-1 {
    flex: 1;
    padding-right: 10px;
  }

  .step-btn {
    button {
      height: 30px;
      margin-top: -5px;
      border: none;
      padding-right: 0;

      &::v-deep {
        .van-icon {
          vertical-align: middle;
        }
      }
    }

  }
}
</style>
