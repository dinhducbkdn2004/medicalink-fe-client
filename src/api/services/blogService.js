import axiosClient from '../core/axiosClient';

export const blogService = {
  getBlogs: async (filters = {}) => {
    return axiosClient.get('/blogs', { params: filters });
  },

  getBlogBySlug: async (slug) => {
    return axiosClient.get(`/blogs/${slug}`);
  },
};
