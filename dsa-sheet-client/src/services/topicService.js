import api from './api';

export const getTopics = () => api.get('/topics');
export const getTopicBySlug = (slug) => api.get(`/topics/${slug}`);
export const getProblemsByTopic = (slug) => api.get(`/topics/${slug}/problems`);
export const getProblemById = (id) => api.get(`/problems/${id}`);
