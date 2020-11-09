<template>
    <van-form @submit="onSubmit">
        <component 
            v-for="item in fields" 
            :key="item.field" 
            :is="item.type" 
            v-bind="item.props"
            :label="item.title"
            :name="item.field"
            v-model:value="formData[`${item.field}`]"
            :disabled="item.props.isEditable === 0"
        />

        <van-button block type="primary" native-type="submit">提 交</van-button>
    </van-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from '../../components/Form/Input/index.vue'
import Date from '../../components/Form/Date/index.vue'
import Select from '../../components/Form/Select/index.vue'
import Uploader from '../../components/Form/Uploader/index.vue'

export default defineComponent({
    components:{
        OaImInput:Input,
        OaImDate: Date,
        OaImSelect: Select,
        OaImUploader: Uploader
    },
    data(){
        return {
            formData:{
                date:''
            },
            fields: [{
                type:'oa-im-input',
                field:'name',
                title:'用户名',
                props:{
                    placeholder:'用户名',
                    validate:'max:20',
                    isRequired:1,
                    isEditable:1
                }
            },{
                type:'oa-im-input',
                field:'amount',
                title:'金额',
                props:{
                    placeholder:'金额',
                    type:'number',
                    validate:'amount'
                }
            },{
                type:'oa-im-input',
                field:'phone',
                title:'手机号码',
                props:{
                    placeholder:'手机号码',
                    type:'tel'
                }
            },{
                type:'oa-im-date',
                field:'date', 
                title:'日期',
                props:{
                    placeholder:'请选择日期'
                }
            },
            // {
            //     type:'oa-im-select',
            //     field:'idCard',
            //     title:'身份证',
            //     props:{
            //         optionType:'PersonalIdTypeEnum',
            //         placeholder:'请选择'
            //     }
            // },
            {
                type:'oa-im-uploader',
                field:'idCardFile',
                title:'身份证',
                props:{
                    placeholder:'请选择'
                }
            }]
        }
    },
    mounted(){
        
    },
    methods:{
        onSubmit(){
            console.info(this.formData)
        }
    }
})
</script>