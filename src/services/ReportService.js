import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://178.63.13.157:8090/mock-api/api`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// in real world project we would have users, projects, gateways and report services separately
export default {
  getUsers() {
    return apiClient.get('/users')
  },
  getProjects() {
    return apiClient.get('/projects')
  },
  getGateways() {
    return apiClient.get('/gateways')
  },
  postReport(reportOptions) {
    return apiClient.post('/report', reportOptions)
  }
}
