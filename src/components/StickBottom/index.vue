<template>
    <div class="button-wrapper">
            <div>
                <slot ></slot>
            </div>
        </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name:'OaImStickBottom'
})
</script>
<style lang="scss" scoped>
.button-wrapper {
    >div{
        width: 100%;
        padding: 20px;
        position: fixed;
        height: 44px;
        background-color: #fff;
        bottom:0;
    }

    ::v-deep .van-button{
        width: calc(100% - 40px);
    }
}
</style>