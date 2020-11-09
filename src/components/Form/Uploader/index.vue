<template>
    <van-field class="upload-field" :name="name">
        <template #input>
            <van-uploader :after-read="(file)=>afterRead(file,'2','licenceFile')" 
                v-model="fileList" 
                :multiple="multiple"  
                v-bind="$attrs"
                :max-size="maxSize"
                @oversize="onOversize"
                >
            </van-uploader>
        </template>
    </van-field>
</template>

<script lang="ts">
import request from '@/utils/request';
import { Notify } from 'vant';
import {defineComponent} from 'vue'
import { v4 as uuid } from 'uuid';

export default defineComponent({
    name:'OaImUploader',
    props:({
        params:{
            type:Object,
            default(){
                return {
                    type:'1'
                }
            }
        },
        action: {
            type:String,
            default: `/web/bodyfile/upload`
        },
        name: {
            type:String,
            default: ''
        },
        multiple:{
            type:Boolean,
            default: true
        },
        value:{
            type:Array,
            default(){
                return []
            }
        },
        maxSize:{
            type:[Number,String],
            default: 1 * 1024 * 1024
        }
    } as any),
    data(){
        return {
            fileList: (this.value || []) as any[]
        }
    },
    methods:{
        onOversize() {
            Notify({type:'danger',message:`文件大小不能超过 ${this.maxSize/1024/1024}MB`});
        },
        afterRead(file:any){
            const form:any = new FormData();
            
            Object.keys(this.params)?.map(key=>{
                form.append(key,this.params[key])
            })
            if(Array.isArray(file)){
                file?.map((item:any)=>{
                    item.status = 'uploading'
                    item._uuid = uuid()
                    form.append('file',item.file)
                })
            }else{
                file.status = 'uploading'
                file._uuid = uuid()
                form.append('file',file.file)
            }

            request(
                this.action,
                form,
                { method: "post",'Content-Type':'multipart/form-data',hideLoading:true}
            ).then((resp)=>{
                if(resp){
                    Notify({ type: 'success', message: '上传成功' });                    
                    this.changeStatus('done',file, resp?.data)
                }else{
                    this.changeStatus('failed',file)
                }
                
                this.$emit('update:value',this.getUploadIdList(this.fileList))
            })
        },
        changeStatus(status:String,file:any,resp?:any[]){
            if(Array.isArray(file)){
                file?.forEach((f:any,fileIndex:number)=>{
                    const index = this.fileList.findIndex((item)=>{
                        return item._uuid === f._uuid;
                    })
                    this.fileList[index].status = status;
                    if(resp){
                        this.fileList[index].file_id = resp?.[fileIndex]?.file_id 
                        this.fileList[index].file_name = resp?.[fileIndex]?.file_name 
                    }
                })
            }else{
                const index = this.fileList.findIndex((item)=>{
                        return item._uuid === file._uuid;
                    })

                this.fileList[index].status = status;
                if(resp){
                    this.fileList[index].file_id = resp?.[0]?.file_id 
                    this.fileList[index].file_name = resp?.[0]?.file_name 
                }
            }
        },
        getUploadIdList(fileList:any[]){
            return fileList?.filter((item:any)=>item.status === 'done')
        }
    }
})
</script>