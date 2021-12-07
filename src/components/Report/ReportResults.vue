<template>
<div class="report-wrapper pt-7">
  <div class="d-flex w-full justify-center" v-if="this.loadingReport">
    <v-progress-circular
        :width="7"
        :size="150"
        indeterminate
        color="primary"
    />
  </div>
  <div v-else>
    <ReportNoData v-if="this.reportResults.length === 0" />
    <div v-else>
      <ReportData />
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";
import ReportNoData from "./ReportNoData";
import ReportData from "./ReportData";

export default {
  name: 'ReportResults',
  components: {ReportData, ReportNoData},
  computed: mapState('reports', ['reportResults', 'loadingReport'])
}
</script>
