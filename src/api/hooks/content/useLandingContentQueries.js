import { useQuery } from '@tanstack/react-query';
import { faqService } from '@/api/services/faqService';
import { testimonialService } from '@/api/services/testimonialService';

export const LANDING_CONTENT_KEYS = {
  faqs: ['landing', 'faqs'],
  testimonials: ['landing', 'testimonials'],
};

/** Axios returns full API envelope `{ success, data: T[] }` — normalize to array. */
function selectApiList(res) {
  if (res == null) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  return [];
}

export const usePublicFaqsQuery = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [...LANDING_CONTENT_KEYS.faqs, params],
    queryFn: () => faqService.getPublicFaqs(params),
    select: selectApiList,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const usePublicTestimonialsQuery = (params = {}, options = {}) => {
  return useQuery({
    queryKey: [...LANDING_CONTENT_KEYS.testimonials, params],
    queryFn: () => testimonialService.getPublicTestimonials(params),
    select: selectApiList,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
