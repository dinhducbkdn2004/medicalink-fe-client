import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/api/services/reviewService';

export const REVIEW_KEYS = {
  all: ['reviews'],
  byDoctor: (doctorId) => [...REVIEW_KEYS.all, 'doctor', doctorId],
  byClinic: (clinicId) => [...REVIEW_KEYS.all, 'clinic', clinicId],
};

export const useDoctorReviewsQuery = (doctorId) => {
  return useQuery({
    queryKey: REVIEW_KEYS.byDoctor(doctorId),
    queryFn: () => reviewService.getDoctorReviews(doctorId),
    enabled: !!doctorId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useClinicReviewsQuery = (clinicId) => {
  return useQuery({
    queryKey: REVIEW_KEYS.byClinic(clinicId),
    queryFn: () => reviewService.getClinicReviews(clinicId),
    enabled: !!clinicId,
    staleTime: 5 * 60 * 1000,
  });
};
