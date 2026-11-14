import api from './api'

const base = '/notifications'
export const service = {
  list: params => api.get(base, { params }),
  markRead: id => api.patch(`${base}/${id}/read`),
  registerDevice: token => api.post(`${base}/device-token`, { token }),
}
export default service
