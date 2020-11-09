<template>
<van-form @submit="onSubmit">
  <div v-for="(module) in fields" :key="module.moduleCode">
    <div class="module-title">
      {{module.moduleName}}
    </div>
    <component v-for="item in module.children" :key="item.field" :is="item.type" v-bind="item.props" :label="item.title" :name="item.field" v-model:value="formData[`${item.field}`]" />
  </div>

  <oa-im-stick-bottom>
    <van-button block type="primary" native-type="submit">提 交</van-button>
  </oa-im-stick-bottom>
</van-form>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import Input from '../../components/Form/Input/index.vue'
import Date from '../../components/Form/Date/index.vue'
import Select from '../../components/Form/Select/index.vue'
import request from '@/utils/request'
import validate from '@/utils/validate'
import dayjs from 'dayjs'
import {
  Notify
} from 'vant'
import OaImStickBottom from '@/components/StickBottom/index.vue'

const typeMap: any = {
  'input': 'oa-im-input',
  'date': 'oa-im-date',
  'select': 'oa-im-select',
}

const typeTextMap: any = {
  'input': '填写',
  'date': '选择',
  'select': '选择',
}

const dateMap: any = {
  date: 'YYYY-MM-DD',
}

export default defineComponent({
  components: {
    OaImInput: Input,
    OaImDate: Date,
    OaImSelect: Select,
    OaImStickBottom
  },
  data() {
    return {
      formData: {},
      defaultFormData: [] as any[],
      fields: [] as any[]
    }
  },
  mounted() {
    this.getContractInfo()
  },
  methods: {
    async onSubmit() {
      const resp = await request(
        `/web/contract/saveContractInfo`, {
          entryId: this.$route.params.id,
          contractTemplateFieldList: this.transformField(this.formData)
        }
      )
      if (resp) {
        Notify({
          type: 'success',
          message: '提交成功'
        });
        history.back()
      }
    },
    transformField(formData: any) {
      return this.defaultFormData?.map((item: any) => {
        if (item.dataType === 'date') {
          item.value = dayjs(formData[item.name]).valueOf()
        } else {
          item.value = formData[item.name]
        }

        return item;
      })
    },
    async getContractInfo() {
      const resp = await request(
        `/web/contract/getContractInfo`, {
          entryId: this.$route.params.id
        }, {
          method: 'get'
        }
      )

      if (resp) {
        const data: any[] = [];
        const objModule: any = {}
        this.defaultFormData = [...resp.data.contractTemplateFieldList]
        resp.data.contractTemplateFieldList?.forEach((field: any) => {
          const item: any = {
            ...field
          }
          let moduleIndex: number = objModule[item.moduleCode]
          if (!moduleIndex && moduleIndex !== 0) {
            objModule[item.moduleCode] = data.length;
            moduleIndex = objModule[item.moduleCode]
            data[moduleIndex] = {
              moduleCode: item.moduleCode,
              moduleName: item.moduleName,
              children: []
            }
          }

          const obj: any = {
            rules: []
          }
          obj.placeholder = `请${typeTextMap[item.dataType]}${item.alias}`
          if (item.isRequired === 1) {
            obj.rules.push({
              required: true,
              // message: `请${typeTextMap[item.dataType]}${item.alias}`
            })
            obj.required = true;
          }
          if (item.dataType === 'select') {
            obj.optionType = item.extraType;
          } else if (item.extraType) {
            const arrExtraType = item.extraType?.split('/');
            obj.type = arrExtraType[0];
            if (arrExtraType[1]) {
              const arrValidate: any[] = arrExtraType[1].split(';')
              arrValidate.forEach((item: string) => {
                const funcName = item.split(';')[0]
                const arrParams: string[] = item.split(';')[1]?.split(',') || []
                if (funcName === 'maxlength' && arrParams[0]) {
                  obj.maxlength = arrParams[0]
                }

                if (validate[funcName]) {
                  obj.rules.push(validate[funcName](...arrParams))
                }
              })
            }
          }

          if (item.dataType === 'date' && item.value) {
            item.value = dayjs(item.value).format(dateMap[item.extraType] || 'YYYY-MM-DD HH:mm')
          }

          if (item.value) {
            (this.formData as any)[item.name] = item.value
          }

          const curField = {
            type: typeMap[item.dataType] || item.dataType,
            field: item.name,
            title: item.alias,
            props: {
              ...obj
            }
          }

          data[moduleIndex].children[data[moduleIndex].children?.length || 0] = curField;
        })

        this.fields = data?.map((item => {
          return {
            ...item,
            children: item?.children?.sort((child1: any, child2: any) => {
              console.info(child1, child2)

              return child1.showIndex - child2.showIndex
            })
          }
        }))
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.module-title {
  margin: 0;
  padding: 16px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  background-color: #f7f8fa;
}
</style>
