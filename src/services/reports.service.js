import api from './api'

const base = '/reports'
export const service = {
  dashboard: params => api.get(`${base}/dashboard`, { params }),
  export: (type, params) => api.get(`${base}/export/${type}`, { params, responseType: 'blob' }),
}
export default service
