import ReportService from "@/services/ReportService"

import {createReportChart, createReportList} from '@/helpers/reportHelperFunctions'

export const namespaced = true

export const state = {
  projects: [],
  gateways: [],
  reportFilters: {},
  reportResults: [],
  loadingReport: false
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

  getReportData: (state, getters) => {
    const {projectId, gatewayId} = state.reportFilters
    // check what is the state of filters
    let reportState;
    if (projectId === 'all' && gatewayId === 'all') reportState = 'ALL_SELECTED'
    if (projectId !== 'all' && projectId && gatewayId !== 'all' && gatewayId) reportState = 'BOTH_SELECTED'
    if (projectId !== 'all' && projectId && gatewayId === 'all') reportState = 'PROJECT_SELECTED'
    if (projectId === 'all' && gatewayId !== 'all' && gatewayId) reportState = 'GATEWAY_SELECTED'

    // if project of gateway is selected do preparation for displaying filter's selection
    let selectedProject
    let selectedGateway
    if (projectId || gatewayId) {
      selectedProject = getters.getProjectById(projectId)
      selectedGateway = getters.getGatewayById(gatewayId)
    }
    switch (reportState) {
      case 'ALL_SELECTED':
        return {
          reportFilter: {gateways: 'All gateways', projects: 'All projects'},
          reportList: createReportList(state, getters, {case: 'ALL_SELECTED'}),
          reportChart: null,
        }
      case 'PROJECT_SELECTED':
        return {
          reportFilter: {gateways: 'All gateways', projects: selectedProject.name},
          reportList: createReportList(state, getters, {case: 'PROJECT_SELECTED', projectId: selectedProject.id}),
          reportChart: createReportChart(state, getters, {case: 'PROJECT_SELECTED', projectId: selectedProject.id}),
        }
      case 'GATEWAY_SELECTED':
        return {
          reportFilter: {gateways: selectedGateway.name, projects: 'All projects'},
          reportList: createReportList(state, getters, {case: 'GATEWAY_SELECTED', gatewayId: selectedGateway.id}),
          reportChart: createReportChart(state, getters, {case: 'GATEWAY_SELECTED', gatewayId: selectedGateway.id}),
        }
      case 'BOTH_SELECTED':
        return {
          reportFilter: {gateways: selectedGateway.name, projects: selectedProject.name},
          reportList: createReportList(state, getters, {
            case: 'BOTH_SELECTED',
            gatewayId: selectedGateway.id,
            projectId: selectedProject.id
          }),
          reportChart: null,
        }
      default:
        throw Error('check report store!')
    }
  }
}