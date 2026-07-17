import { http, HttpResponse } from 'msw';
import { savedTimetables } from '../data/timetables';
import { savedTimetableDetails } from '../data/savedTimetableDetail';

const BASE = 'http://localhost:9090/api/v1';

export const timetableHandlers = [
  http.post('/api/v1/timetables/recommend', () => {
    return HttpResponse.json({
      isSuccess: true,
      code: 'COMMON_200_1',
      message: '요청 응답 성공',
      data: {
        totalCredits: 18,
        preferredFreeDays: ['FRI'],
        timetables: [
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
        ],
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
];
