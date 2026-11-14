import api from './api'

const base = '/attendance'
export const service = {
  list: params => api.get(base, { params }),
  checkIn: payload => api.post(`${base}/check-in`, payload),
  checkOut: payload => api.post(`${base}/check-out`, payload),
  monthly: params => api.get(`${base}/monthly`, { params }),
  regularize: payload => api.post(`${base}/regularization`, payload),
}
export default service
