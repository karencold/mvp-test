<template>
<div>
  <ReportNoData v-if="this.reportResults === null" />
  <div v-else>
    Result: {{this.reportResults}}
  </div>
</div>
</template>

<script>
import {mapState} from "vuex";
import ReportNoData from "./ReportNoData";

export default {
  name: 'ReportResults',
  components: {ReportNoData},
  computed: mapState('reports', ['reportResults'])
}
</script>