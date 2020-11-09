<template>
    <div>
        {{counter}}
        <br/>
        {{sum}}
        <br />
        <van-button @click="setCounter">点击</van-button>
    </div>
</template>

<script lang="ts">
import {ref,onMounted, computed} from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    setup(){
        const counter = ref(0)

        const setCounter = ()=>{
            counter.value = counter.value + 1
        }

        onMounted(()=>{
            counter.value = 4
        })

        const sum = computed(()=>counter.value + 2)

        return {
            counter,
            setCounter,
            sum
        }
    }
})
</script>