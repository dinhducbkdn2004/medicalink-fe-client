import { useQuery } from '@tanstack/react-query';
import { doctorService } from '@/api/services/doctorService';

export const DOCTOR_KEYS = {
  all: ['doctors'],
  lists: () => [...DOCTOR_KEYS.all, 'list'],
  list: (filters) => [...DOCTOR_KEYS.lists(), { filters }],
  details: () => [...DOCTOR_KEYS.all, 'detail'],
  detail: (id) => [...DOCTOR_KEYS.details(), id],
};

export const useDoctorsQuery = (filters = {}) => {
  return useQuery({
    queryKey: DOCTOR_KEYS.list(filters),
    queryFn: () => doctorService.getDoctors(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};


export const useDoctorDetailQuery = (id) => {
  return useQuery({
    queryKey: DOCTOR_KEYS.detail(id),
    queryFn: () => doctorService.getDoctorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
