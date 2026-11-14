import api from './api'

const base = '/payslips'
export const service = {
  list: params => api.get(base, { params }),
  get: id => api.get(`${base}/${id}`),
  download: id => api.get(`${base}/${id}/download`, { responseType: 'blob' }),
  generate: payload => api.post(`${base}/generate`, payload),
}
export default service
