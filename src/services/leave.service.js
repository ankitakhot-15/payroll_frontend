import api from './api'

const base = '/leaves'
export const service = {
  list: params => api.get(base, { params }),
  get: id => api.get(`${base}/${id}`),
  apply: payload => api.post(base + (''), payload),
  approve: id => api.put(`${base}/${id}/approve`),
  reject: id => api.put(`${base}/${id}/reject`),
  balance: employeeId => api.get(`${base}/balance/${employeeId}`),
}
export default service
