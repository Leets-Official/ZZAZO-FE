export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type LectureClassification =
  'MAJOR_REQUIREMENT' | 'MAJOR_ELECTIVE' | 'LIBERAL_REQUIREMENT' | 'LIBERAL_ELECTIVE';

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
  satisfiedFreeDays: DayOfWeek[];
  timetables: Lecture[];
}
