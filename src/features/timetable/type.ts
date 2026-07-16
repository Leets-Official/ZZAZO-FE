export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export type DayOfWeek = Weekday;

export type CourseType =
  '전공기초' | '교양필수' | '교양선택' | '전공필수' | '전공선택' | '일반선택';

export type CourseCategory = CourseType;

export interface LectureTime {
  dayOfWeek: Weekday;
  startTime: string;
  endTime: string;
}

export interface Course {
  lectureId: number;
  lectureName: string;
  section: string;
  professor: string;
  credit: number;
  lectureClassification: CourseType;
  classroom: string;
  lectureTime: LectureTime[];
}

export interface Timetable {
  id: string;
  title: string;
  totalCredit: number;
  courses: Course[];
}

export interface TimetableCandidate {
  id: number;
  title: string;
  label: string;
  totalCredit: number;
  courses: Course[];
}
