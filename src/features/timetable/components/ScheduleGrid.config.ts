import { type CourseCategory, type Weekday } from '../type';

export const CATEGORY_STYLE: Record<CourseCategory, { cell: string; bar: string }> = {
  교양필수: { cell: 'bg-p100 text-p800', bar: 'bg-p600' },
  교양선택: { cell: 'bg-p100 text-p800', bar: 'bg-p600' },
  전공필수: { cell: 'bg-g100 text-g800', bar: 'bg-g500' },
  전공선택: { cell: 'bg-g100 text-g800', bar: 'bg-g500' },
  전공기초: { cell: 'bg-w100 text-w800', bar: 'bg-w500' },
  일반선택: { cell: 'bg-s100 text-s800', bar: 'bg-s500' },
};

export const LEGENDS = [
  { label: '교양필수 · 교양선택', bar: CATEGORY_STYLE.교양필수.bar },
  { label: '전공필수 · 전공선택', bar: CATEGORY_STYLE.전공필수.bar },
  { label: '전공기초', bar: CATEGORY_STYLE.전공기초.bar },
  { label: '일반선택', bar: CATEGORY_STYLE.일반선택.bar },
];

export const DAY_LABELS: Record<Weekday, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
};

export const BASE_START_MINUTES = 9 * 60;
export const TIME_STEP_MINUTES = 5;
export const TIME_ROW_HEIGHT = 4;
export const TIME_LABEL_INTERVAL_MINUTES = 30;
