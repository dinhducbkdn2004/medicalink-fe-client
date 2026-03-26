import axiosClient from '../core/axiosClient';

export const aiService = {
  recommendDoctor: async (symptoms) => {
    return axiosClient.post('/ai/recommend-doctor', { symptoms });
  },

  chat: async (message) => {
    return axiosClient.post('/ai/chat', { message });
  },
};
