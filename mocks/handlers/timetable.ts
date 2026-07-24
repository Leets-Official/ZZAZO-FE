import { http, HttpResponse } from 'msw';
import type { Course, Lecture, LectureClassification } from '@/features/timetable/type';
import type { CourseCategory } from '@/shared/types';
import { savedTimetables } from '../data/timetables';
import { savedTimetableDetails } from '../data/savedTimetableDetail';

const BASE = 'http://localhost:9090/api/v1';

const RECOMMENDED_LECTURES: Lecture[] = [
  {
    lectureId: 13,
    lectureName: '경영학원론',
    credit: 3,
    lectureClassification: 'MAJOR_REQUIREMENT',
    lectureTime: [
      { startTime: '10:30', endTime: '11:45', dayOfWeek: 'MON' },
      { startTime: '10:30', endTime: '11:45', dayOfWeek: 'WED' },
    ],
  },
  {
    lectureId: 21,
    lectureName: 'AI기초',
    credit: 3,
    lectureClassification: 'LIBERAL_ELECTIVE',
    lectureTime: [{ startTime: '09:00', endTime: '10:15', dayOfWeek: 'TUE' }],
  },
];

const LECTURE_CLASSIFICATION_LABEL: Record<LectureClassification, CourseCategory> = {
  MAJOR_REQUIREMENT: '전공필수',
  MAJOR_ELECTIVE: '전공선택',
  LIBERAL_REQUIREMENT: '교양필수',
  LIBERAL_ELECTIVE: '교양선택',
};

function mapRecommendedLectureToCourse(lecture: Lecture): Course {
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

export const timetableHandlers = [
  http.post('/api/v1/timetables/recommend', () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: {
        totalCredits: 18,
        preferredFreeDays: ['FRI'],
        timetables: RECOMMENDED_LECTURES,
      },
    });
  }),

  http.get(`${BASE}/timetables`, () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: { timetables: savedTimetables },
    });
  }),

  http.post(`${BASE}/timetables`, async ({ request }) => {
    const body = (await request.json()) as {
      candidateName: string;
      departmentId: number;
      semester: number;
      grade: number;
      preferredFreeDays: string[];
      targetCredits: number;
      selectedLectureIds: number[];
      totalCredits: number;
    };
    const timetableId = Math.max(...savedTimetables.map((t) => t.timetableId), 0) + 1;
    const selectedLectureIds = body.selectedLectureIds ?? [];
    const courses = RECOMMENDED_LECTURES.filter((lecture) =>
      selectedLectureIds.includes(lecture.lectureId)
    ).map(mapRecommendedLectureToCourse);

    savedTimetables.unshift({
      timetableId,
      candidateName: body.candidateName,
      departmentId: body.departmentId,
      totalCredits: body.totalCredits,
      preferredFreeDays: body.preferredFreeDays,
      createdAt: new Date().toISOString(),
    });

    savedTimetableDetails[timetableId] = {
      timetableId,
      candidateName: body.candidateName,
      departmentId: body.departmentId,
      semester: body.semester,
      grade: body.grade,
      preferredFreeDays: body.preferredFreeDays,
      targetCredits: body.targetCredits,
      selectedLectureIds,
      totalCredits: body.totalCredits,
      requirementCheck: {
        targetCreditSatisfied: body.totalCredits >= body.targetCredits,
        requiredCourseIncluded: true,
        foundationCourseIncluded: true,
        generalEducationIncluded: true,
      },
      courses,
    };

    return HttpResponse.json(
      {
        isSuccess: true,
        code: 'COMMON_201_1',
        message: '요청 리소스 생성 성공',
        data: {
          timetableId,
          message: '시간표가 저장되었습니다.',
        },
      },
      { status: 201 }
    );
  }),

  http.get(`${BASE}/timetables/:timetableId`, ({ params }) => {
    const id = Number(params.timetableId);
    const detail = savedTimetableDetails[id];

    if (!detail) {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'TIMETABLE_404_1',
          message: '시간표를 찾을 수 없습니다.',
          data: null,
        },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: detail,
    });
  }),

  http.delete(`${BASE}/timetables/:timetableId`, ({ params }) => {
    const id = Number(params.timetableId);

    if (!savedTimetableDetails[id]) {
      return HttpResponse.json(
        {
          isSuccess: false,
          code: 'TIMETABLE_404_1',
          message: '시간표를 찾을 수 없습니다.',
          data: null,
        },
        { status: 404 }
      );
    }

    // mock 저장소에서도 제거해 이후 조회/재삭제가 404가 되도록 한다
    delete savedTimetableDetails[id];
    const index = savedTimetables.findIndex((t) => t.timetableId === id);
    if (index !== -1) savedTimetables.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
