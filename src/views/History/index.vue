<template>
<div>
  <contract-list :state="[10,6,-1,-10]" />
</div>
</template>

<script lang="ts">
import ContractList from '@/components/ContractList'
import {
  defineComponent
} from 'vue'

export default defineComponent({
  components: {
    ContractList
  }
})
</script>
