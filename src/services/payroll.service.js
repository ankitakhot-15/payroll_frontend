import api from './api'

const base = '/payroll'
export const service = {
  list: params => api.get(base, { params }),
  get: id => api.get(`${base}/${id}`),
  generate: payload => api.post(`${base}/generate`, payload),
  approve: id => api.put(`${base}/${id}/approve`),
  process: id => api.put(`${base}/${id}/process`),
  salaryStructures: params => api.get(`${base}/salary-structure`, { params }),
}
export default service
