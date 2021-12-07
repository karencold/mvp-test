<template>
  <div class="text-center nodata-wrapper">
    <div class="nodata-inner">
      <div class="font-weight-bold text-h5 primary--text">
        No reports
      </div>
      <div class="body--text">
        Currently you have no data for the reports to be generated.
        Once you start generating traffic through the Balance application
        the reports will be shown.
      </div>
      <v-img class="mt-13" :src="require('@/assets/nodata.svg')"/>
    </div>
  </div>
</template>

<style scoped>
.nodata-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;

}
.nodata-inner {
  max-width: 470px;
}
</style>