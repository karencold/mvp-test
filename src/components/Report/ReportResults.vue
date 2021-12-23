<template>
<div class="report-wrapper pt-7">
  <div v-if="this.loadingReport" class="d-flex w-full justify-center">
    <v-progress-circular
        :width="7"
        :size="150"
        indeterminate
        color="primary"
    />
  </div>
  <div v-else>
    <ReportNoData v-if="this.reportResults.length === 0" />
    <ReportData v-else :reportData="this.getReportData" />
  </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import ReportNoData from "./ReportNoData";
import ReportData from "./ReportData";

export default {
  name: 'ReportResults',
  components: {ReportData, ReportNoData},
  computed: {...mapState('reports', ['reportResults', 'loadingReport']),
  ...mapGetters('reports', ['getReportData'])
  }
}
</script>
