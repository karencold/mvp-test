import ReportService from "../../services/ReportService"

export const namespaced = true

export const state = {
  projects: [],
  gateways: [],
  reportFilters: {},
  reportResults: [],
  loadingReport: false,
  reportList: {show: false, single: false, data: []},
  reportChart: {show: false, data: {}}
}

export const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = [...projects]
  },
  SET_GATEWAYS(state, gateways) {
    state.gateways = [...gateways]
  },
  SET_REPORT_FILTER(state, filters) {
    state.reportFilters = {...filters}
  },
  SET_REPORT_RESULTS(state, data) {
    state.reportResults = [...data]
  },
  SET_LOADING_STATE(state, data) {
    state.loadingReport = data
  }
}

export const actions = {
  fetchProjects({commit}) {
    ReportService.getProjects()
      .then((res) => {
        const projects = res.data.data.map(p => {
          return {name: p.name, id: p.projectId}
        })
        commit('SET_PROJECTS', projects)
      })
      .catch(err => {
        throw Error(err.message)
      })
  },
  fetchGateways({commit}) {
    ReportService.getGateways()
      .then((res) => {
        const gateways = res.data.data.map(g => {
          return {name: g.name, id: g.gatewayId}
        })
        commit('SET_GATEWAYS', gateways)
      })
      .catch(err => {
        throw Error(err.message)
      })
  },
  fetchReport({commit}, filters) {
    commit('SET_LOADING_STATE', true)
    commit('SET_REPORT_FILTER', filters)
    if (filters.projectId === 'all') filters.projectId = null
    if (filters.gatewayId === 'all') filters.gatewayId = null
    ReportService.postReport(filters)
      .then(res => {
        commit('SET_REPORT_RESULTS', res.data.data)
        commit('SET_LOADING_STATE', false)
      })
      .catch(err => {
        commit('SET_LOADING_STATE', false)
        throw Error(err.message)
      })
  }
}

export const getters = {
  getProjectById: state => id => {
    return state.projects.find(project => project.id === id)
  },
  getGatewayById: state => id => {
    return state.gateways.find(gateway => gateway.id === id)
  },
  getReportListData: state => {
    return state.reportList
  },
  getReportChartData: state => {
    return state.reportChart
  },
}