export const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

// 시간표 그리드는 평일만 표시한다. DayOfWeek의 부분집합임을 타입으로 보장한다.
export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'] as const satisfies readonly DayOfWeek[];
export type Weekday = (typeof WEEKDAYS)[number];

export type LectureClassification =
  'MAJOR_REQUIREMENT' | 'MAJOR_ELECTIVE' | 'LIBERAL_REQUIREMENT' | 'LIBERAL_ELECTIVE';

export type CourseCategory =
  '교양필수' | '교양선택' | '전공필수' | '전공선택' | '전공기초' | '일반선택';

export interface LectureTime {
  startTime: string;
  endTime: string;
  dayOfWeek: DayOfWeek;
}

export interface Lecture {
  lectureId: number;
  lectureName: string;
  credit: number;
  lectureClassification: LectureClassification;
  lectureTime: LectureTime[];
}

export interface Course {
  lectureId: number;
  lectureName: string;
  section: string;
  professor: string;
  credit: number;
  lectureClassification: CourseCategory;
  classroom: string;
  lectureTime: LectureTime[];
}

export interface Timetable {
  id: string;
  title: string;
  totalCredit: number;
  courses: Course[];
}

export interface RecommendConditionRequest {
  departmentId: number;
  grade: number;
  semester: number;
  preferredFreeDays?: DayOfWeek[];
  targetCredits: number;
  selectedLectureIds?: number[];
  priority?: 'FREE_PERIOD' | 'LECTURE_CRITERIA';
}

export interface RecommendResultData {
  totalCredits: number;
  preferredFreeDays: DayOfWeek[];
  timetables: Lecture[];
}
