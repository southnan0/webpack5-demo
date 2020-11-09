<template>
  <div>
    <contract-list />
  </div>
</template>

<script lang="ts">
import ContractList from '@/components/ContractList'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ContractList
  }
})
</script>
