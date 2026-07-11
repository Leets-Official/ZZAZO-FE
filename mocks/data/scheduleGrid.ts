import type { Course } from '@/features/timetable/type';

export const scheduleGridCourses: Course[] = [
  {
    id: 'computer-science',
    name: '컴퓨터\n과학개론',
    category: '전공기초',
    credit: 3,
    timeSlots: [
      { day: '월', startPeriod: 1, endPeriod: 2 },
      { day: '수', startPeriod: 1, endPeriod: 2 },
    ],
  },
  {
    id: 'basic-programming',
    name: '기초\n프로그래밍',
    category: '전공기초',
    credit: 3,
    timeSlots: [
      { day: '화', startPeriod: 1, endPeriod: 2 },
      { day: '목', startPeriod: 1, endPeriod: 2 },
    ],
  },
  {
    id: 'writing',
    name: '글쓰기\n표현',
    category: '교양필수',
    credit: 2,
    timeSlots: [{ day: '월', startPeriod: 3, endPeriod: 3 }],
  },
  {
    id: 'calculus',
    name: '미적분학',
    category: '교양선택',
    credit: 3,
    timeSlots: [
      { day: '화', startPeriod: 4, endPeriod: 4 },
      { day: '목', startPeriod: 4, endPeriod: 4 },
    ],
  },
  {
    id: 'data-structure',
    name: '자료\n구조',
    category: '전공필수',
    credit: 3,
    timeSlots: [{ day: '금', startPeriod: 3, endPeriod: 3 }],
  },
  {
    id: 'web-programming',
    name: '웹\n프로그래밍',
    category: '전공선택',
    credit: 3,
    timeSlots: [{ day: '목', startPeriod: 5, endPeriod: 5 }],
  },
  {
    id: 'creative-thinking',
    name: '창의적\n사고',
    category: '교양선택',
    credit: 2,
    timeSlots: [{ day: '수', startPeriod: 5, endPeriod: 6 }],
  },
  {
    id: 'english-conversation',
    name: '영어\n회화',
    category: '교양필수',
    credit: 2,
    timeSlots: [{ day: '금', startPeriod: 1, endPeriod: 2 }],
  },
];
