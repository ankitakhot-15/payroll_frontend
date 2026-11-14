import api from './api'

const base = '/overtime'
export const service = {
  list: params => api.get(base, { params }),
  create: payload => api.post(base + (''), payload),
  approve: id => api.put(`${base}/${id}/approve`),
  reject: id => api.put(`${base}/${id}/reject`),
}
export default service
