<template>
<van-field v-model="currentValue" v-bind="$attrs" />
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'OaImInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit('update:value', newValue)
      }
    }
  }
})
</script>
