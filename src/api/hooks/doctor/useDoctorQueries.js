import { useQuery } from '@tanstack/react-query';
import { doctorService } from '@/api/services/doctorService';

export const DOCTOR_KEYS = {
  all: ['doctors'],
  lists: () => [...DOCTOR_KEYS.all, 'list'],
  list: (filters) => [...DOCTOR_KEYS.lists(), { filters }],
  details: () => [...DOCTOR_KEYS.all, 'detail'],
  detail: (id) => [...DOCTOR_KEYS.details(), id],
  slots: (doctorId, serviceDate, locationId) =>
    [...DOCTOR_KEYS.all, 'slots', doctorId, serviceDate, locationId],
};

function selectDoctorListEnvelope(res) {
  if (!res) return [];
  const inner = res.data;
  if (inner && Array.isArray(inner.data)) return inner.data;
  if (Array.isArray(inner)) return inner;
  return [];
}

function selectSlotsEnvelope(res) {
  if (!res) return [];
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
}

export const useDoctorsQuery = (filters = {}) => {
  return useQuery({
    queryKey: DOCTOR_KEYS.list(filters),
    queryFn: () => doctorService.getDoctors(filters),
    select: selectDoctorListEnvelope,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDoctorSlotsQuery = (doctorId, serviceDate, locationId, options = {}) => {
  const { enabled = true, ...rest } = options;
  return useQuery({
    queryKey: DOCTOR_KEYS.slots(doctorId, serviceDate, locationId || 'none'),
    queryFn: () =>
      doctorService.getAvailableSlots(doctorId, {
        serviceDate,
        ...(locationId ? { locationId } : {}),
      }),
    select: selectSlotsEnvelope,
    enabled:
      !!enabled &&
      !!doctorId &&
      !!serviceDate &&
      !!locationId,
    staleTime: 60 * 1000,
    ...rest,
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
