<template>
    <span class="font-weight-bold">
       {{ totalTitle }}
      <span v-if="this.splitter">
        |
      </span>
      <span v-else>
        :
      </span>
      {{ total }} {{ currency }}
    </span>
</template>
<script>
export default {
  props: {
    totalTitle: {
      type: String,
      require: true
    },
    total: {
      type: String || Number,
      require: true
    },
    currency: {
      type: String,
      require: true
    },
    splitter: {
      type: Boolean,
      default: false
    }
  }
}
</script>