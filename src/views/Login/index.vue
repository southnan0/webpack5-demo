<template>
<div>
  <div class="wrapper">
    <img src="./main.png" alt="手机签约">

    <van-form ref="form" @submit="smsLogin">
      <van-field v-model="phone" name="phone" label="手机号" placeholder="手机号" :rules="[{ required: true }]" />
      <van-field class="password" v-model="smscode" name="smscode" label="短信验证码" placeholder="短信验证码" :rules="[{ required: true }]">
        <template #button>
          <van-button v-if="countdown<=0" size="small" @click="sendSmsInfo">发 送</van-button>
          <van-button v-else size="small" disabled> {{ countdown }}s </van-button>
        </template>
      </van-field>

      <div style="padding:50px 10px 0 10px;">
        <van-button block type="primary" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import request from '../../utils/request'
import {
  setToken
} from '../../utils/cache'
import {
  Notify
} from 'vant'
let timer: any = null

const defaultCountdown = 60

export default defineComponent({
  data() {
    return {
      phone: '',
      smscode: '',
      countdown: 0
    }
  },
  methods: {
    async sendSmsInfo() {
      try {
        await (this.$refs.form as any & {
          validate: Function
        }).validate('phone')
      } catch (e) {
        return
      }

      const resp = await request(
        `/web/user/sendSmsInfo`, {
          phone: this.phone
        }
      )

      if (resp) {
        Notify({
          type: 'success',
          message: '短信验证码发送成功'
        });
        this.countdown = defaultCountdown
        clearInterval(timer)
        timer = setInterval(() => {
          if (this.countdown <= 0) {
            clearInterval(timer)
          } else {
            this.countdown = this.countdown - 1
          }
        }, 1000)
      }
    },
    async smsLogin() {
      const resp: any = await request(
        `/web/user/smslogin`, {
          account: this.phone,
          smscode: this.smscode
        }
      )

      if (resp) {
        // Notify({ type: 'success', message: '登录成功' });
        setToken(resp.data.token)
        this.$router.push(resp.data.welcomePage)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 90%;
  max-width: 450px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -40px;

  >img {
    width: 35%;
    margin-bottom: 40px;
  }
}

.button-wrapper {
  padding: 20px;
  height: 44px;

  button {
    position: fixed;
    bottom: 20px;
    width: calc(100% - 40px);
  }
}

.password {
  ::v-deep .van-field__label {
    align-self: center;
  }
}
</style>
