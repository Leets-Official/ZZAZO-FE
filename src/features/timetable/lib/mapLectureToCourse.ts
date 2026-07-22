import type { CourseCategory } from '@/shared/types';
import type { Course, Lecture, LectureClassification } from '../type';

const LECTURE_CLASSIFICATION_LABEL: Record<LectureClassification, CourseCategory> = {
  MAJOR_REQUIREMENT: '전공필수',
  MAJOR_ELECTIVE: '전공선택',
  LIBERAL_REQUIREMENT: '교양필수',
  LIBERAL_ELECTIVE: '교양선택',
};

// recommend 응답(Lecture)에는 section/professor/classroom이 없다.
// CourseTable/ScheduleGrid 어디에서도 이 필드들을 실제로 렌더링하지 않아 빈 문자열로 채운다.
export function mapLectureToCourse(lecture: Lecture): Course {
  return {
    lectureId: lecture.lectureId,
    lectureName: lecture.lectureName,
    section: '',
    professor: '',
    credit: lecture.credit,
    lectureClassification: LECTURE_CLASSIFICATION_LABEL[lecture.lectureClassification],
    classroom: '',
    lectureTime: lecture.lectureTime,
  };
}
