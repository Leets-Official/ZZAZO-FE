import { apiPost, apiPostApi } from '@/shared/lib/apiClient';
import type {
  RecommendConditionRequest,
  RecommendResultData,
  SaveTimetableRequest,
  SaveTimetableResponse,
} from '../type';

export const recommendTimetable = (body: RecommendConditionRequest) =>
  apiPost<RecommendResultData>('/timetables/recommend', body);

export const saveTimetable = (body: SaveTimetableRequest) =>
  apiPostApi<SaveTimetableResponse>('/timetables', body);
