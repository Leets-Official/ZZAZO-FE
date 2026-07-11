export const WEEKDAYS = ['월', '화', '수', '목', '금'] as const;
export const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

export type Weekday = (typeof WEEKDAYS)[number];
export type Period = (typeof PERIODS)[number];

export type CourseCategory = '교양필수' | '교양선택' | '전공필수' | '전공선택' | '전공기초';

export interface TimeSlot {
  day: Weekday;
  startPeriod: Period;
  endPeriod: Period;
}

export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  credit: number;
  timeSlots: TimeSlot[];
}

export interface Timetable {
  id: string;
  title: string;
  totalCredit: number;
  courses: Course[];
}
