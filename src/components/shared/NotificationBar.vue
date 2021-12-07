<template>
  <v-alert
      border="left"
      :color="notificationTypeColor"
      dark
      persistent :retain-focus="false"
  >
    {{ notification.message }}
  </v-alert>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  computed: {
    notificationTypeColor() {
      // switch statement for real world application would be used
      if (this.notification.type === 'warning') return 'red'
      if (this.notification.type === 'success') return 'green'
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>
