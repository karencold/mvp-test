<template>
  <div>
      <v-avatar tile color="#F6CA65" class="rounded" width="43" height="43" min-width="43">
        <span class="white--text font-weight-bold text-h5">{{ initialsFromName }}</span>
      </v-avatar>
      <span class="pl-3 font-weight-bold primary--text">
          {{ name }}
        </span>

  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: 'No Name',
    }
  },
  computed: {
    initialsFromName: function () {
      return this.name.split(' ').map(n => n.slice(0, 1)).join('')
    }
  }
}
</script>