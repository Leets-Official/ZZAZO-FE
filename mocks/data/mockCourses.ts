import type { Course } from '../../src/features/timetable/type';

export const mockCourses: Course[] = [
  {
    lectureId: 1,
    lectureName: '컴퓨터과학개론',
    section: '001',
    professor: '김민준',
    credit: 3,
    lectureClassification: '전공기초',
    classroom: '미래관 201',
    lectureTime: [
      { dayOfWeek: 'MON', startTime: '09:00', endTime: '10:15' },
      { dayOfWeek: 'WED', startTime: '09:00', endTime: '10:15' },
    ],
  },
  {
    lectureId: 2,
    lectureName: '미적분학',
    section: '002',
    professor: '박지영',
    credit: 3,
    lectureClassification: '교양필수',
    classroom: '이공관 105',
    lectureTime: [
      { dayOfWeek: 'TUE', startTime: '10:30', endTime: '11:45' },
      { dayOfWeek: 'THU', startTime: '10:30', endTime: '11:45' },
    ],
  },
  {
    lectureId: 3,
    lectureName: '글쓰기와 표현',
    section: '003',
    professor: '이수연',
    credit: 2,
    lectureClassification: '교양필수',
    classroom: '인문관 301',
    lectureTime: [{ dayOfWeek: 'MON', startTime: '13:00', endTime: '13:50' }],
  },
];
