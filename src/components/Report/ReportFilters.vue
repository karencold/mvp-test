<template>
  <!--  <div class="flex-grow-1 d-flex justify-end">-->
  <v-row justify="end">
    <v-col cols="2">
      <v-select
          :items="projectsForSelect"
          item-text="name"
          item-value="id"
          label="Select project"
          outlined
          dense
          single-line
          dark
          v-model:item-value="selectedProject"
          :background-color="filterBG"
      >
      </v-select>
    </v-col>
    <v-col cols="2">
      <v-select
          :items="gatewaysForSelect"
          item-text="name"
          item-value="id"
          label="Select gateway"
          outlined
          dense
          single-line
          dark
          v-model:item-value="selectedGateway"
          :background-color="filterBG"
      ></v-select>
    </v-col>
    <v-col cols="2">
      <v-menu
          v-model="menuFrom"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateFrom"
              label="From date"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="dateFrom = null"
              clearable
              outlined
              single-line
              dense
              dark
              :background-color="filterBG"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="dateFrom"
            @input="menuFrom = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="2">
      <v-menu
          v-model="menuTo"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateTo"
              label="To date"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="dateTo = null"
              clearable
              outlined
              single-line
              dense
              dark
              :background-color="filterBG"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="dateTo"
            @input="menuTo = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="2">
      <v-btn
          color="primary"
          @click="handleReportGenerate"
      >Generate report
      </v-btn>
    </v-col>
  </v-row>
  <!--  </div>-->
</template>
<script>
import {mapState, mapActions} from 'vuex'
import {FILTERS_BG} from '@/globals/styles'

export default {
  name: 'ReportFilters',
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      menuFrom: false,
      menuTo: false,
      selectedProject: null,
      selectedGateway: null,
      filterBG: null,
      filterColor: null
    }
  },
  created() {
    this.fetchGateways()
    this.fetchProjects()
  },
  mounted() {
    this.filterBG = FILTERS_BG
  },
  computed: {
    ...mapState({
      projects: state => state.reports.projects,
      gateways: state => state.reports.gateways,
    }),
    projectsForSelect() {
      return [{name: 'All projects', id: 'all'}, ...this.projects]
    },
    gatewaysForSelect() {
      return [{name: 'All gateways', id: 'all'}, ...this.gateways]
    },
  },
  methods: {
    ...mapActions('reports', ['fetchProjects', 'fetchGateways', 'fetchReport']),
    handleReportGenerate() {
      // if not all dates are set
      if (!this.dateFrom || !this.dateTo) return this.$store.dispatch('notification/add',
          {type: 'warning', message: 'Please enter the dates'})
      // if date are after today
      if (new Date(this.dateFrom) > new Date() || new Date(this.dateTo) > new Date()) return this.$store.dispatch('notification/add',
          {type: 'warning', message: 'Dates cannot be in the future'})
      // if from date is later that to date
      if (new Date(this.dateFrom) > new Date(this.dateTo)) return this.$store.dispatch('notification/add',
          {type: 'warning', message: 'From date cannot be later that to date'})
      // if project or gateway is not selected we want all to be selected as shown on design  
      if (this.selectedGateway === null) this.selectedGateway = 'all'
      if (this.selectedProject === null) this.selectedProject = 'all'
      this.fetchReport({
        to: this.dateTo,
        from: this.dateFrom,
        projectId: this.selectedProject,
        gatewayId: this.selectedGateway
      })
    }
  }
}
</script>