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
        console.log(res)
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
    commit('SET_REPORT_FILTER', filters)
    ReportService.postReport(filters)
      .then(res => {
        commit('SET_REPORT_RESULTS', res.data.data)
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