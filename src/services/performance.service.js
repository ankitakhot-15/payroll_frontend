import api from './api'

const base = '/performance'
export const service = {
  list: params => api.get(base, { params }),
  createGoal: payload => api.post(base + ('/goals'), payload),
  createReview: payload => api.post(base + ('/reviews'), payload),
  updateReview: (id, payload) => api.put(`${base}/reviews/${id}`, payload),
}
export default service
