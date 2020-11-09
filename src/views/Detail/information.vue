<template>
<van-form class="information" @submit="onSubmit">
  <div v-if="type === 1">
    <div class="card-tips">
      <h3>身份证正反面</h3>
      <p>请上传清晰的身份证原件，系统将自动识别证件信息。</p>
      <p>照片仅限jpeg、jpg、png格式且大小不超过1M</p>

      <div style="margin-top:10px;">
        <van-field class="upload-field" label="" label-width="0" name="idCardFace" :rules="rules.idCardFace">
          <template #input>
            <van-uploader :after-read="(file)=>beforeRead(file,'1','idCardFace')" v-model="formData.idCardFace">
              <div class="upload face" v-if="formData.idCardFace.length === 0"></div>
            </van-uploader>
          </template>
        </van-field>
        <van-field class="upload-field" label="" label-width="0" name="idCardEmblem" :rules="rules.idCardEmblem">
          <template #input>
            <van-uploader :after-read="(file)=>beforeRead(file,'1','idCardEmblem')" v-model="formData.idCardEmblem">
              <div class="upload national-emblem" v-if="formData.idCardEmblem.length === 0"></div>
            </van-uploader>
          </template>
        </van-field>
      </div>
    </div>
    <van-field v-model="formData.name" name="name" label="姓名" placeholder="姓名" readonly />
    <van-field name="idNo" v-model="formData.idNo" label="身份证" placeholder="个人身份证" />
    <van-field name="idAddr" v-model="formData.idAddr" label="身份证地址" placeholder="个人身份证地址" />
    <div class="button-wrapper">
      <van-button block type="primary" native-type="submit" :loading="loading">提 交</van-button>
    </div>
  </div>

  <div v-else>
    <van-field name="enterpriseName" v-model="formData.enterpriseName" label="企业名称" placeholder="企业名称" readonly />
    <div class="card-tips">
      <h3>营业执照</h3>
      <div style="margin-top:10px;">
        <van-field class="upload-field" label="" label-width="0" name="licenceFile" :rules="rules.licenceFile">
          <template #input>
            <van-uploader :after-read="(file)=>beforeRead(file,'2','licenceFile')" v-model="formData.licenceFile" :max-size="maxSize" @oversize="onOversize">
              <div class="upload upload-licence" v-if="formData.licenceFile.length === 0">
                <van-icon name="photograph" />
              </div>
            </van-uploader>
          </template>
        </van-field>
      </div>
    </div>

    <div class="card-tips">
      <h3>企业法人身份证正反面</h3>
      <p>请上传清晰的身份证原件，系统将自动识别证件信息。</p>
      <p>照片仅限jpeg、jpg、png格式且大小不超过1M</p>
      <div style="margin-top:10px;">
        <van-field class="upload-field" label="" label-width="0" name="idCardFace" :rules="rules.idCardFace">
          <template #input>
            <van-uploader :after-read="(file)=>beforeRead(file,'1','idCardFace')" v-model="formData.idCardFace" :max-size="maxSize" @oversize="onOversize">
              <div class="upload face" v-if="formData.idCardFace.length === 0"></div>
            </van-uploader>
          </template>
        </van-field>
        <van-field class="upload-field" label="" label-width="0" name="idCardEmblem" :rules="rules.idCardEmblem">
          <template #input>
            <van-uploader :after-read="(file)=>beforeRead(file,'1','idCardEmblem')" v-model="formData.idCardEmblem" :max-size="maxSize" @oversize="onOversize">
              <div class="upload national-emblem" v-if="formData.idCardEmblem.length === 0"></div>
            </van-uploader>
          </template>
        </van-field>
      </div>
    </div>
    <van-field name="businessLicenceNumber" v-model="formData.businessLicenceNumber" label="营业执照编码" placeholder="营业执照编码" />
    <van-field v-model="formData.legalPerson" name="legalPerson" label="法人姓名" placeholder="法人姓名" />
    <van-field name="legalPersonIdNo" v-model="formData.legalPersonIdNo" label="法人身份证" placeholder="法人身份证" />
    <div class="button-wrapper">
      <van-button block type="primary" native-type="submit" :loading="loading">提 交</van-button>
    </div>
  </div>
</van-form>
</template>

<script lang="ts">
import request from '@/utils/request';
import {
  defineComponent
} from 'vue'
import {
  Notify
} from 'vant';
import {
  getToken
} from '@/utils/cache';

export default defineComponent({
  name: 'Information',
  data() {
    return {
      maxSize: 1 * 1024 * 1024,
      fields: [{
        // field:'van-'
      }],
      loading: false,
      formData: {
        type: '',
        name: '',
        idNo: '',
        idCardFace: [] as any,
        idCardEmblem: [] as any,
        licenceFile: [] as any,
        idAddr: '',
        enterpriseName: '',
        legalPerson: '',
        legalPersonIdNo: '',
        businessLicenceNumber: '',
        validity: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请填写姓名'
        }],
        idCardFace: [{
          required: true,
          message: '请上传身份证头像面'
        }],
        idCardEmblem: [{
          required: true,
          message: '请上传身份证国徽面'
        }],
        idNo: [{
          required: true,
          message: '请填写身份证号码'
        }],
        legalPersonIdNo: [{
          required: true,
          message: '请填写身份证号码'
        }],
        idAddr: [{
          required: true,
          message: '请填写身份证地址'
        }],
        legalPerson: [{
          required: true,
          message: '请填写法人姓名'
        }],
        enterpriseName: [{
          required: true,
          message: '请填写企业名称'
        }],
        licenceFile: [{
          required: true,
          message: '请上传营业执照'
        }],
        businessLicenceNumber: [{
          required: true,
          message: '请填写营业执照编码'
        }]
      }
    }
  },
  mounted() {
    this.getUserBody();
  },
  computed: ({
    type() {
      return this.formData.type
    }
  }) as any,
  methods: {
    onOversize() {
      Notify({
        type: 'danger',
        message: `文件大小不能超过 1MB`
      });
    },
    beforeRead(file: any, type: String, key: 'idCardFace' | 'idCardEmblem' | 'licenceFile') {
      file.status = 'uploading'
      const form: any = new FormData();
      form.append('type', type);
      form.append('file', file.file)

      request(
        `/web/bodyfile/upload`,
        form, {
          method: "post",
          'Content-Type': 'multipart/form-data',
          hideLoading: true
        }
      ).then((resp) => {
        if (resp) {
          const ocrMapData = resp.data?. [0]?.ocrMap?.data
          const isFace = ocrMapData.type === '第二代身份证';
          const isEmblem = ocrMapData.type === '第二代身份证背面';
          if ((key === 'idCardFace' && !isFace)) {
            Notify({
              type: 'danger',
              message: '请上传身份证【头像面】照片'
            })
            this.formData[key][0].status = 'failed'
            return
          }
          if (key === 'idCardEmblem' && !isEmblem) {
            Notify({
              type: 'danger',
              message: '请上传身份证【国徽面】照片'
            })
            this.formData[key][0].status = 'failed'
            return
          }
          Notify({
            type: 'success',
            message: '上传成功'
          });
          if (key === 'idCardFace') {
            if (this.type === '1') {
              this.formData.idNo = ocrMapData?.id_number || '';
              this.formData.idAddr = ocrMapData?.address || '';
              this.formData.name = ocrMapData?.name || '';
            } else {
              this.formData.legalPerson = ocrMapData?.name || '';
              this.formData.legalPersonIdNo = ocrMapData?.id_number || '';
            }
          } else if (key === 'licenceFile') {
            // this.formData.enterpriseName = ocrMapData.biz_license_company_name
            this.formData.businessLicenceNumber = ocrMapData.biz_license_credit_code
          } else if (key === 'idCardEmblem') {
            this.formData.validity = ocrMapData.validity
          }
          this.formData[key][0].status = 'done'
          this.formData[key][0].file_id = resp.data?. [0]?.file_id
        } else {
          this.formData[key][0].status = 'failed'
        }
      })
    },
    async getUserBody() {
      const resp = await request(
        `/web/contract/getUserBody`, {
          entryId: this.$route.params.id
        }, {
          method: "get"
        }
      )

      if (resp) {
        const {
          contractUserBody
        } = resp?.data || {}

        this.formData = {
          ...contractUserBody,
          idCardFace: contractUserBody.faceFile ? [this.initFile(contractUserBody.faceFile)] : [],
          idCardEmblem: contractUserBody.backFile ? [this.initFile(contractUserBody.backFile)] : [],
          licenceFile: contractUserBody.businessLicenceFile ? [this.initFile(contractUserBody.businessLicenceFile)] : [],
          validity: !!contractUserBody.backFile
        }
      }
    },
    initFile(id: String) {
      return {
        url: `${location.origin}/web/bodyfile/download/${id}?accessToken=${getToken()}`,
        file_id: id,
        isImage: true
      }
    },
    async onSubmit() {
      const {
        idCardFace,
        idCardEmblem,
        licenceFile,
        validity,
        ...params
      } = this.formData

      if (!validity) {
        return Notify({
          type: 'danger',
          message: '请上传身份证【国徽面】照片'
        })
      }

      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000)
      const resp = await request(
        `/web/contract/saveUserBody`, {
          entryId: this.$route.params.id,
          contractUserBody: {
            ...params,
            faceFile: idCardFace[0].file_id,
            backFile: idCardEmblem[0].file_id,
            businessLicenceFile: licenceFile?. [0]?.file_id,
          }
        }
      )
      this.loading = false;

      if (resp) {
        Notify({
          type: 'success',
          message: '提交成功'
        });
        setTimeout(() => {
          history.back()
        }, 500)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.button-wrapper {
  padding: 20px;
  height: 44px;
  background-color: #fff;

  button {
    position: fixed;
    bottom: 20px;
    width: calc(100% - 40px);
  }
}

.information {
  background: #fff;

  .upload {
    width: 42.8vw;
    height: 27vw;
    background-color: transparent;
  }

  ::v-deep .van-uploader__preview-image {
    width: 42.8vw;
    height: 27vw;
    background-color: transparent;
  }

  .upload-licence {
    border: 1px dotted #dcdee0;
    color: #dcdee0;
    font-size: 26px;
    box-sizing: border-box;

    >i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  // ::v-deep .van-uploader__upload-icon{
  //   display: none;
  // }

  .card-tips {
    padding: 10px 16px;

    >h3 {
      font-size: 14px;
      color: #222;
    }

    >p {
      font-size: 12px;
      color: #A1A7AE;
      margin-top: 5px;
    }
  }

  .face {
    background-image: url('./card-face.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .national-emblem {
    background-image: url('./card.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  ::v-deep .upload-field.van-cell {
    padding: 0;
    display: inline-block;
    width: 42.8vw;
    vertical-align: top;
    margin-right: 10px;

    .van-field__label {
      margin-right: 0;
    }
  }
}
</style>
