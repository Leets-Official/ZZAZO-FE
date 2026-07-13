export type CourseType =
  '전공기초' | '교양필수' | '교양선택' | '전공필수' | '전공선택' | '일반선택';

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

export interface LectureTime {
  dayOfWeek: DayOfWeek;
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

export interface TimetableCandidate {
  id: number;
  title: string;
  label: string;
  totalCredit: number;
  courses: Course[];
}
