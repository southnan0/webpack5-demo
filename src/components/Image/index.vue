<template>
    <img />
</template>

<script lang="ts">
import request from '@/utils/request'
import Vue, { defineComponent } from 'vue'
export default defineComponent({
    name:'OaImImage',
    props:{
        id:{type:String,required:true}
    },
    data(){
        return {
            url:''
        }
    },
    mounted(){
        console.info(this.id)
        if(this.id){
            this.downloadImage(this.id)
        }
    },
    watch:{
        id(newId){
            this.downloadImage(newId)
        }
    },
    methods:{
        async downloadImage(id:String){
            const resp = await request(
                `/web/bodyfile/download/${id}`,
                {
                
                },{
                    method:"get"
                }
            )

            if(resp){
                console.info(resp)
            }
        }
    }
})
</script>