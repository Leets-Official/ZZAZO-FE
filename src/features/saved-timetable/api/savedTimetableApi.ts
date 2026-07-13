import { apiGet } from '@/shared/lib/apiClient';
import type { SavedTimetableListData } from '../type';

export const getSavedTimetables = () => apiGet<SavedTimetableListData>('/timetables');
