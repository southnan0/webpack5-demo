<template>
    <div>
        <van-field
            readonly
            clickable
            v-model="currentValue"
            @click="handleClick"
            v-bind="$attrs"
        />
        <van-popup v-model:show="showPicker" :position="position">
        <van-picker
            :columns="options"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
        </van-popup>
    </div>
</template>

<script lang="ts">

import request from '@/utils/request';
import { defineComponent } from 'vue'
export default defineComponent({
    name:'OaImSelect',
    props:{
        value:{
            type:String,
            default:''
        },
        position:{
            type:String,
            default:'bottom'
        },
        optionType:{
            type:String,
            required:true
        }
    },
    data(){
        return {
            currentValue:this.value,
            showPicker:false,
            options: [] as any[]
        }
    },
    computed:({
        selectData(){
            return {
                value:this.value,
                options:this.options
            }
        }
    } as any),
    watch:{
        selectData({value,options}){
            this.currentValue = options?.find((item:any)=>{
                return item.value === value
            })?.text || value
        }
    },
    mounted(){
        this.getOptions()
    },
    methods:{
        handleClick(){
            if(!this.$attrs.disabled){
                this.showPicker = true
            }
        },
        async getOptions(){
            const resp = await request(
                `/web/constant/${this.optionType}/list`,
                {},
                { method: "get" }
            );

            if(resp){
                this.options = resp?.data?.map((item:any)=>{
                    return {
                        text:item.desc,
                        value:item.code
                    }
                });
            }
        },
        onConfirm(item:any){
            this.currentValue = item.text
            this.$emit('update:value',item.value)
            this.showPicker = false
        }
    }
})
</script>