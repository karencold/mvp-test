<template>
  <div>
    <div class="d-flex">
      <div>
        <div class="headings--text text-h5">
          Reports
        </div>
        <div class="body--text">
          Easily generate a report of your transactions
        </div>
      </div>
      <ReportFilters />
    </div>
    <div>
      <ReportResults />
    </div>
  </div>
</template>
<script>
import ReportFilters from '../components/Report/ReportFilters'
import ReportResults from '../components/Report/ReportResults'

export default {
  name: 'Report',
  components: {ReportFilters, ReportResults}
}
</script>