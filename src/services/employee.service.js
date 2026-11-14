import api from './api'

const base = '/employees'
export const service = {
  list: params => api.get(base, { params }),
  get: id => api.get(`${base}/${id}`),
  create: payload => api.post(base + (''), payload),
  update: (id, payload) => api.put(`${base}/${id}`, payload),
  remove: id => api.delete(`${base}/${id}`),
}
export default service
