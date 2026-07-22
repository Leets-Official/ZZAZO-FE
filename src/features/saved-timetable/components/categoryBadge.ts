import type { CourseCategory } from '@/features/timetable/type';

export const CATEGORY_BADGE: Record<CourseCategory, string> = {
  교양필수: 'bg-p50 text-p700',
  교양선택: 'bg-p100 text-p800',
  전공필수: 'bg-g200 text-g800',
  전공선택: 'bg-g50 text-g700',
  전공기초: 'bg-w100 text-w800',
  일반선택: 'bg-s100 text-s800',
};
