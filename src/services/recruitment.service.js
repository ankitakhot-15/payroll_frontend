import api from './api'

const base = '/recruitment'
export const service = {
  list: params => api.get(base, { params }),
  createJob: payload => api.post(base + ('/jobs'), payload),
  candidates: params => api.get('/candidates', { params }),
  scheduleInterview: payload => api.post('/interviews', payload),
}
export default service
