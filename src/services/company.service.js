import api from './api'

const base = '/companies'
export const service = {
  list: params => api.get(base, { params }),
  get: id => api.get(`${base}/${id}`),
  update: (id, payload) => api.put(`${base}/${id}`, payload),
}
export default service
