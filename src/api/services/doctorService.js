import axiosClient from '../core/axiosClient';

export const doctorService = {
  getDoctors: async (filters = {}) => {
    return axiosClient.get('/doctors', { params: filters });
  },

  getDoctorById: async (id) => {
    return axiosClient.get(`/doctors/${id}`);
  },
};
