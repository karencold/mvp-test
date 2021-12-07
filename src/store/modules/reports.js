import ReportService from "../../services/ReportService"

export const namespaced = true

export const state = {
  projects: [],
  gateways: [],
  reportFilters: {},
  reportResults: {}
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
    state.reportResults = {...data}
  }
}

export const actions = {
  fetchProjects({commit}) {
    ReportService.getProjects()
      .then((res) => {
        commit('SET_PROJECT', res.data)
      })
      .catch(err => {
        throw Error(err.message)
      })
  },
  fetchGateways({commit}) {
    ReportService.getProjects()
      .then((res) => {
        commit('SET_GATEWAYS', res.data)
      })
      .catch(err => {
        throw Error(err.message)
      })
  },
  fetchReport({commit}, filters) {
    commit('SET_REPORT_FILTER', filters)
    ReportService.postReport(filters)
      .then(res => {
        commit('SET_REPORT_RESULTS', res.data)
      })
      .catch(err => {
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
  getReportResults: state => {
    return state.reportResults
  }
}