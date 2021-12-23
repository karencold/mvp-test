<template>
  <v-row class="d-flex">
    <v-col>
      <div class="filter-state pb-8">
          <span class="headings--text font-weight-bold">
          {{ reportData.reportFilter.projects }}
          </span>
        <span class="headings--text font-weight-bold">
          |
          </span>
        <span class="headings--text font-weight-bold">
         {{ reportData.reportFilter.gateways }}
          </span>
      </div>
      <div v-if="reportData.reportList.single">
        <BaseTable :tableData="reportData.reportList.data"/>
      </div>
      <div v-else>
        <v-row justify="center">
          <v-expansion-panels flat accordion>
            <v-expansion-panel
                v-for="(item, i) in reportData.reportList.list"
                :key="i"
            >
              <v-expansion-panel-header
                  hide-actions
              >
                <div class="d-flex justify-space-between">
    <span class="font-weight-bold">
       {{ item.title }}
    </span>
                  <BasePriceTotal :currency="reportData.reportList.currency" :total="item.total" totalTitle="TOTAL"/>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <BaseTable :tableData="item.data"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </div>
    </v-col>
    <v-col class="report-chart" v-if="reportData.reportChart">
      <BaseDoughnutChart :styles="{maxWidth: '270px', maxHeight: '50vh', minHeight: '270px', height: '100%', margin: 'auto'}" :chartData="reportData.reportChart.data" :options="reportData.reportChart.options" />
      <BasePriceTotal class="pt-100" splitter :currency="reportData.reportChart.currency" :total="reportData.reportChart.total" :totalTitle="reportData.reportChart.totalTitle"/>
    </v-col>
    <v-col v-if="!reportData.reportChart" cols="12" class="pt-12">
      <BasePriceTotal :splitter="reportData.reportList.single" :currency="reportData.reportList.currency" :total="reportData.reportList.total" totalTitle="TOTAL"/>
    </v-col>
  </v-row>
</template>
<script>
import BaseTable from "../shared/BaseTable";
import BasePriceTotal from "../shared/BasePriceTotal";
import BaseDoughnutChart from "../shared/BaseDoughnutChart";



export default {
  components: {BaseDoughnutChart, BasePriceTotal, BaseTable },
  props: {
    reportData: {
      type: Object
    }
  },
}
</script>