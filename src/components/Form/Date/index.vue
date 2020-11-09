<template>
<div>
    <van-field
        readonly
        clickable
        label="时间选择"
        @click="handleClick"
        v-bind="$attrs"
        v-model="currentValue"
    />
    <van-popup v-model:show="showPicker" position="bottom">
        <van-datetime-picker
            v-model="datetimeValue"
            :type="type"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
    </van-popup>
</div>
    
</template>

/** type: date time year-month month-day datehour */
<script lang="ts">
import dayjs from 'dayjs';
import { defineComponent } from 'vue'
export default defineComponent({
    name:'OaImDate',
    data(){
        return {
            showPicker:false,
            currentValue:this.value,
            datetimeValue: this.value ?new Date(this.value):''
        }
    },
    props:{
        type:{
            type:String,
            default:'datetime'
        },
        value:{
            type:String,
            default:''
        }
    },
    watch:{
        value(newValue){
            this.currentValue = newValue
        },
        showPicker(newValue){
            if(newValue){
                this.datetimeValue =  this.currentValue ? new Date(this.currentValue) :''
            }
        }
    },
    methods:{
        handleClick(){
            if(!this.$attrs.disabled){
                this.showPicker = true
            }
        },
        onConfirm(value:Date){
            this.currentValue = dayjs(value).format('YYYY-MM-DD HH:mm')
            this.$emit('update:value',this.currentValue)
            this.showPicker = false
        }
    }
})
</script>