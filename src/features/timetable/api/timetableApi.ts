import { apiPost } from '@/shared/lib/apiClient';
import type { RecommendConditionRequest, RecommendResultData } from '../type';

export const recommendTimetable = (body: RecommendConditionRequest) =>
  apiPost<RecommendResultData>('/timetables/recommend', body);
