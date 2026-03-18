import api from './api';

export const getAllProgress = () => api.get('/progress');
export const toggleProgress = (problemId) => api.patch(`/progress/${problemId}`);
export const getProgressStats = () => api.get('/progress/stats');
